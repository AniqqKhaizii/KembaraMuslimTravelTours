"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Modal, Space, Spin, message } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AdminLayout from "../../../../layout/AdminLayout";
import { useRouter } from "next/navigation";
import Axios from "axios";
import dayjs from "dayjs";

const TetapanPakej = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingPackage, setEditingPackage] = useState(null);

	const [packages, setPackages] = useState([]);
	const [NewPackages, setNewPackages] = useState([]);
	const [hotelMakkah, setHotelMakkah] = useState(null);
	const [hotelMadinah, setHotelMadinah] = useState(null);
	const [trips, setTrips] = useState(null);

	useEffect(() => {
		const fetchHotelsAndTrips = async () => {
			try {
				const [makkahRes, madinahRes, tripsRes] = await Promise.all([
					Axios.get("/api/Tetapan/ManageHotel", {
						params: { Operation: "SEARCH", Location: "Makkah" },
					}),
					Axios.get("/api/Tetapan/ManageHotel", {
						params: { Operation: "SEARCH", Location: "Madinah" },
					}),
					Axios.get("/api/Tetapan/ManageTrip", {
						params: {
							Operation: "SEARCH",
							TripID: null,
							TripName: null,
							StartDate: null,
							EndDate: null,
							Duration: null,
						},
					}),
				]);

				setHotelMakkah(makkahRes.data);
				setHotelMadinah(madinahRes.data);
				setTrips(tripsRes.data);
			} catch (error) {
				console.error("Error fetching data:", error);
				message.error("Failed to load data. Please try again.");
			}
		};

		fetchHotelsAndTrips();
	}, []);

	useEffect(() => {
		const fetchPackages = async () => {
			setLoading(true);
			try {
				const response = await Axios.get("/api/Tetapan/ManagePackage", {
					params: {
						Operation: "SEARCH",
						TripUnique: "Y",
					},
				});
				const packagesData = response.data;

				// Fetch trip details for each package
				const updatedPackages = await Promise.all(
					packagesData.map(async (pkg) => {
						if (!pkg.TripID) return { ...pkg, tripDetails: [] };

						const tripIds = pkg.TripID.split(",").map((id) => id.trim());

						// Fetch all trip details for the current package
						const tripDetails = await Promise.all(
							tripIds.map(async (id) => {
								try {
									const tripResponse = await Axios.get(
										"/api/Tetapan/ManageTrip",
										{
											params: { Operation: "SEARCH", TripID: id },
										}
									);
									return tripResponse.data[0] || {}; // Assuming API returns an array
								} catch (error) {
									console.error(`Error fetching trip ${id}:`, error);
									return {};
								}
							})
						);

						return { ...pkg, tripDetails };
					})
				);

				setPackages(updatedPackages);
			} catch (error) {
				console.error("Error fetching packages:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchPackages();
	}, [NewPackages]);

	const handleAddPackage = async (values) => {
		const formattedValues = {
			...values,
			Adult_Double: parseFloat(values.Adult_Double),
			Adult_Triple: parseFloat(values.Adult_Triple),
			Adult_Quad: parseFloat(values.Adult_Quad),
			ChildWBed_Double: parseFloat(values.ChildWBed_Double),
			ChildWBed_Triple: parseFloat(values.ChildWBed_Triple),
			ChildWBed_Quad: parseFloat(values.ChildWBed_Quad),
			ChildNoBed_Double: parseFloat(values.ChildNoBed_Double),
			ChildNoBed_Triple: parseFloat(values.ChildNoBed_Triple),
			ChildNoBed_Quad: parseFloat(values.ChildNoBed_Quad),
			Infant_Double: parseFloat(values.Infant_Double),
			Infant_Triple: parseFloat(values.Infant_Triple),
			Infant_Quad: parseFloat(values.Infant_Quad),
			TripIDs: values.TripIDs.join(", "),
			Commision: parseFloat(values.Commission),
		};
		if (editingPackage) {
			const response = await Axios.get("/api/Tetapan/ManagePackage", {
				params: {
					Operation: "UPDATE",
					PakejID: editingPackage.PakejID,
					PakejName: formattedValues.PakejName,
					Adult_Double: formattedValues.Adult_Double,
					Adult_Triple: formattedValues.Adult_Triple,
					Adult_Quad: formattedValues.Adult_Quad,
					ChildWBed_Double: formattedValues.ChildWBed_Double,
					ChildWBed_Triple: formattedValues.ChildWBed_Triple,
					ChildWBed_Quad: formattedValues.ChildWBed_Quad,
					ChildNoBed_Double: formattedValues.ChildNoBed_Double,
					ChildNoBed_Triple: formattedValues.ChildNoBed_Triple,
					ChildNoBed_Quad: formattedValues.ChildNoBed_Quad,
					Infant_Double: formattedValues.Infant_Double,
					Infant_Triple: formattedValues.Infant_Triple,
					Infant_Quad: formattedValues.Infant_Quad,
					HotelMakkahID: formattedValues.HotelMakkahID,
					HotelMadinahID: formattedValues.HotelMadinahID,
					TripIDs: formattedValues.TripIDs,
					TripUnique: formattedValues.TripUnique,
					PakejPoster: formattedValues.PakejPoster,
					Commision: formattedValues.Commission,
				},
			});
			if (response.data.message) {
				message.error(response.data.message);
			} else {
				setNewPackages(formattedValues);
				setPackages((prev) =>
					prev.map((pkg) =>
						pkg.key === editingPackage.key
							? { ...formattedValues, key: editingPackage.key }
							: pkg
					)
				);
				message.success("Packages updated successfully");
			}
			setEditingPackage(null);
		} else {
			const response = await Axios.get("/api/Tetapan/ManagePackage", {
				params: {
					Operation: "ADD_NEW",
					PakejID: null,
					PakejName: formattedValues.PakejName,
					Adult_Double: formattedValues.Adult_Double,
					Adult_Triple: formattedValues.Adult_Triple,
					Adult_Quad: formattedValues.Adult_Quad,
					ChildWBed_Double: formattedValues.ChildWBed_Double,
					ChildWBed_Triple: formattedValues.ChildWBed_Triple,
					ChildWBed_Quad: formattedValues.ChildWBed_Quad,
					ChildNoBed_Double: formattedValues.ChildNoBed_Double,
					ChildNoBed_Triple: formattedValues.ChildNoBed_Triple,
					ChildNoBed_Quad: formattedValues.ChildNoBed_Quad,
					Infant_Double: formattedValues.Infant_Double,
					Infant_Triple: formattedValues.Infant_Triple,
					Infant_Quad: formattedValues.Infant_Quad,
					HotelMakkahID: formattedValues.HotelMakkahID,
					HotelMadinahID: formattedValues.HotelMadinahID,
					TripIDs: formattedValues.TripIDs,
					Commision: formattedValues.Commission,
				},
			});
			if (response.data.message) {
				message.error(response.data.message);
			} else {
				const response = await Axios.get("/api/Tetapan/ManagePackage", {
					params: {
						Operation: "SEARCH",
						PakejName: formattedValues.PakejName,
					},
				});
				if (response.data.message) {
					message.error(response.data.message);
				} else {
					const newPackage = response.data[0];
					setNewPackages(newPackage);
					setPackages((prev) => [...prev, newPackage]);
					message.success("Package added successfully");
				}
			}
		}

		form.resetFields();
		setIsModalVisible(false);
	};

	useEffect(() => {
		if (editingPackage) {
			form.setFieldsValue({
				PakejName: editingPackage.PakejName,
				Adult_Double: editingPackage.Adult_Double,
				Adult_Triple: editingPackage.Adult_Triple,
				Adult_Quad: editingPackage.Adult_Quad,
				ChildWBed_Double: editingPackage.ChildWBed_Double,
				ChildWBed_Triple: editingPackage.ChildWBed_Triple,
				ChildWBed_Quad: editingPackage.ChildWBed_Quad,
				ChildNoBed_Double: editingPackage.ChildNoBed_Double,
				ChildNoBed_Triple: editingPackage.ChildNoBed_Triple,
				ChildNoBed_Quad: editingPackage.ChildNoBed_Quad,
				Infant_Double: editingPackage.Infant_Double,
				Infant_Triple: editingPackage.Infant_Triple,
				Infant_Quad: editingPackage.Infant_Quad,
				Commission: editingPackage.Commission,
			});
		}
	}, [editingPackage, form]);

	const handleEdit = (record) => {
		setEditingPackage(record);
		form.setFieldsValue(record);
		setIsModalVisible(true);
	};

	const handleDelete = async (id) => {
		try {
			const response = await Axios.get("/api/Tetapan/ManagePackage", {
				params: { Operation: "DELETE", PakejID: id },
			});

			if (response.data.message) {
				message.error(response.data.message);
				return;
			} else {
				setPackages((prev) => prev.filter((pkg) => pkg.PakejID !== id));
				message.success("Package deleted successfully");
			}
		} catch (error) {
			console.error("Error deleting package:", error);
		}
	};

	const handleViewDetails = (record) => {
		const query = `id=${record.key}`;
		router.push(`/Admin/Tetapan/Pakej/Details?${query}`);
	};

	const columns = [
		{
			title: "Nama Pakej",
			dataIndex: "PakejName",
			key: "PakejID",
			className: "font-primary",
			onCell: () => ({
				style: { verticalAlign: "top" },
				className: "uppercase font-primary",
			}),

			render: (text) => `UMRAH ${text}`,
		},
		{
			title: "Harga Bilik",
			dataIndex: "hargaBilik",
			key: "hargaBilik",
			className: "font-primary",
			width: 400,
			onCell: () => ({
				style: { verticalAlign: "top" },
				className: "uppercase font-primary",
			}),
			render: (_, record) => (
				<table className="w-full text-left text-[11px]">
					<thead className="bg-gray-400 text-white">
						<tr>
							<th className="p-1 border-l border-t border-b border-gray-300 text-left">
								Kategori
							</th>
							<th className="p-1 border-l border-t border-b border-gray-300">
								Bilik 2
							</th>
							<th className="p-1 border-l border-t border-b border-gray-300">
								Bilik 3
							</th>
							<th className="p-1 border border-gray-300">Bilik 4</th>
						</tr>
					</thead>
					<tbody>
						{/* Adult */}
						<tr>
							<td className="p-1 border-l border-b border-gray-300 font-bold">
								ADULT
							</td>
							<td className="p-1 border-l border-b text-center border-gray-300">
								RM {parseFloat(record.Adult_Double)}
							</td>
							<td className="p-1 border-l border-b text-center border-gray-300">
								RM {parseFloat(record.Adult_Triple)}
							</td>
							<td className="p-1 border-l border-r border-b text-center border-gray-300">
								RM {parseFloat(record.Adult_Quad)}
							</td>
						</tr>

						{/* Child with Bed */}
						<tr>
							<td className="p-1 border-l border-b border-gray-300 font-bold">
								CHILD WITH BED
							</td>
							<td className="p-1 border-l border-b text-center border-gray-300">
								RM {parseFloat(record.ChildWBed_Double)}
							</td>
							<td className="p-1 border-l border-b text-center border-gray-300">
								RM {parseFloat(record.ChildWBed_Triple)}
							</td>
							<td className="p-1 border-l border-r border-b text-center border-gray-300">
								RM {parseFloat(record.ChildWBed_Quad)}
							</td>
						</tr>

						{/* Child without Bed */}
						<tr>
							<td className="p-1 border-l border-b border-gray-300 font-bold">
								CHILD WITHOUT BED
							</td>
							<td className="p-1 border-l border-b text-center border-gray-300">
								RM {parseFloat(record.ChildNoBed_Double)}
							</td>
							<td className="p-1 border-l border-b text-center border-gray-300">
								RM {parseFloat(record.ChildNoBed_Triple)}
							</td>
							<td className="p-1 border-l border-r border-b text-center border-gray-300">
								RM {parseFloat(record.ChildNoBed_Quad)}
							</td>
						</tr>

						{/* Infant */}
						<tr>
							<td className="p-1 border-l border-b border-gray-300 font-bold">
								INFANT
							</td>
							<td className="p-1 border-l border-b text-center border-gray-300">
								RM {parseFloat(record.Infant_Double)}
							</td>
							<td className="p-1 border-l border-b text-center border-gray-300">
								RM {parseFloat(record.Infant_Triple)}
							</td>
							<td className="p-1 border-l border-r border-b text-center border-gray-300">
								RM {parseFloat(record.Infant_Quad)}
							</td>
						</tr>
					</tbody>
				</table>
			),
		},
		{
			title: "Hotel",
			key: "Hotel",
			className: "font-primary text-center",
			render: (text, record) => (
				<span className="uppercase font-primary">
					{record.MakkahHotelName} / {record.MadinahHotelName}
				</span>
			),
			onCell: () => ({
				style: { verticalAlign: "top" },
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Trip Umrah",
			dataIndex: "tripDetails",
			key: "TripID",
			className: "font-primary text-center",
			onCell: () => ({
				style: { verticalAlign: "top" },
				className: "uppercase font-primary",
			}),
			render: (tripDetails) => {
				if (!tripDetails || tripDetails.length === 0) return "-";

				return (
					<div className="grid grid-cols-2 gap-1">
						{tripDetails.map((trip, index) => (
							<span
								key={index}
								className={`flex flex-col items-center px-1 py-0.5 text-white 
											${trip.Status === "Open" ? "bg-green-500" : "bg-red-500"} 
											text-[11px] rounded-3xl`}
							>
								<strong>{trip.TripName}</strong>
								{dayjs(trip.StartTravelDate).format("DD MMM YYYY")} -{" "}
								{dayjs(trip.EndTravelDate).format("DD MMM YYYY")}
							</span>
						))}
					</div>
				);
			},
		},
		{
			title: "Commission",
			dataIndex: "Commission",
			key: "Commission",
			className: "font-primary text-center",
			render: (text, record) => (
				<span className="font-primary">
					{record.Commission ? `RM ${record.Commission}` : "N/A"}
				</span>
			),
			onCell: () => ({
				style: { verticalAlign: "top" },
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Actions",
			key: "actions",
			className: "font-primary w-32",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
			render: (_, record) => (
				<Space>
					<Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
					<Button
						icon={<DeleteOutlined />}
						onClick={() => handleDelete(record.PakejID)}
						danger
					/>
					<Button onClick={() => handleViewDetails(record)}>
						View Details
					</Button>
				</Space>
			),
		},
	];

	const HotelSelectionMakkah = ({ hotels, form }) => {
		const [selectedHotel, setSelectedHotel] = useState(
			editingPackage ? editingPackage.HotelMakkahID : null
		);

		useEffect(() => {
			if (editingPackage) {
				form.setFieldsValue({ HotelMakkahID: editingPackage.HotelMakkahID });
			}
		}, [selectedHotel]);

		const handleSelectHotel = (hotelId) => {
			setSelectedHotel(hotelId);
			form.setFieldsValue({ HotelMakkahID: hotelId });
		};

		return (
			<Form.Item
				name="HotelMakkahID"
				label="Hotel Makkah"
				rules={[{ required: true, message: "Please select a hotel" }]}
			>
				<div className="flex flex-wrap gap-2">
					{" "}
					{hotels.map((hotel) => (
						<Button
							key={hotel.HotelID}
							type={selectedHotel === hotel.HotelID ? "primary" : "default"}
							onClick={() => handleSelectHotel(hotel.HotelID)}
						>
							{hotel.HotelName}
						</Button>
					))}
				</div>
			</Form.Item>
		);
	};

	const HotelSelectionMadinah = ({ hotels, form }) => {
		const [selectedHotel, setSelectedHotel] = useState(
			editingPackage ? editingPackage.HotelMadinahID : null
		);

		useEffect(() => {
			if (editingPackage) {
				form.setFieldsValue({ HotelMadinahID: editingPackage.HotelMadinahID });
			}
		}, [selectedHotel]);

		const handleSelectHotel = (hotelId) => {
			setSelectedHotel(hotelId);
			form.setFieldsValue({ HotelMadinahID: hotelId }); // Update form value
		};

		return (
			<Form.Item
				name="HotelMadinahID"
				label="Hotel Madinah"
				rules={[{ required: true, message: "Please select a hotel" }]}
			>
				<div className="flex flex-wrap gap-2">
					{" "}
					{hotels.map((hotel) => (
						<Button
							key={hotel.HotelID}
							type={selectedHotel === hotel.HotelID ? "primary" : "default"}
							onClick={() => handleSelectHotel(hotel.HotelID)}
						>
							{hotel.HotelName}
						</Button>
					))}
				</div>
			</Form.Item>
		);
	};

	const TripSelection = ({ trips, form }) => {
		const [strSelectedTrips, setStrSelectedTrips] = useState(
			editingPackage ? editingPackage.TripID : null
		);
		const [selectedTrips, setSelectedTrips] = useState(
			strSelectedTrips ? strSelectedTrips.split(",").map(Number) : []
		);

		useEffect(() => {
			if (selectedTrips) {
				form.setFieldsValue({ TripIDs: selectedTrips });
			}
		}, [selectedTrips]);

		const handleSelectTrip = (tripId) => {
			let updatedTrips;
			if (selectedTrips.includes(tripId)) {
				updatedTrips = selectedTrips.filter((id) => id !== tripId);
			} else {
				updatedTrips = [...selectedTrips, tripId];
			}
			setSelectedTrips(updatedTrips);
			form.setFieldsValue({ TripIDs: updatedTrips });
		};

		return (
			<Form.Item
				name="TripIDs"
				label="Umrah Trip"
				rules={[{ required: true, message: "Please select at least one trip" }]}
			>
				<div className="flex flex-wrap gap-2">
					{trips.map((trip) => (
						<Button
							key={trip.TripID}
							type={selectedTrips.includes(trip.TripID) ? "primary" : "default"}
							onClick={() => handleSelectTrip(trip.TripID)}
						>
							{trip.TripName}
						</Button>
					))}
				</div>
			</Form.Item>
		);
	};

	return (
		<AdminLayout>
			<div className="mx-3">
				{loading ? (
					<Spin className="min-h-40 flex items-center justify-center" />
				) : (
					<>
						<div className="flex justify-between items-center mb-4 border-b border-gray-200 p-4">
							<h1 className="text-3xl font-regular">Manage Umrah Packages</h1>
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={() => {
									setEditingPackage(null);
									setIsModalVisible(true);
								}}
							>
								Add New Package
							</Button>
						</div>
						<Table
							columns={columns}
							dataSource={packages.map((pkg) => ({ ...pkg, key: pkg.PakejID }))}
							rowKey="key"
						/>

						<Modal
							title={editingPackage ? "Edit Package" : "Add New Package"}
							open={isModalVisible}
							onCancel={() => {
								setIsModalVisible(false);
								form.resetFields();
								setEditingPackage(null);
							}}
							confirmLoading="true"
							centered={true}
							width={"60%"}
							footer={null}
						>
							<Form
								form={form}
								layout="vertical"
								onFinish={handleAddPackage}
								initialValues={editingPackage || {}}
							>
								<Form.Item
									name="PakejName"
									label="Package Name"
									rules={[
										{
											required: true,
											message: "Please enter the package name",
										},
									]}
								>
									<Input placeholder="Enter package name" />
								</Form.Item>

								<HotelSelectionMakkah hotels={hotelMakkah} form={form} />
								<HotelSelectionMadinah hotels={hotelMadinah} form={form} />
								<TripSelection trips={trips} form={form} />

								<table className="table-auto w-full border-collapse border border-gray-300 mb-4">
									<thead>
										<tr className="bg-gray-200">
											<th className="border border-gray-300 px-4 py-2">
												KATEGORI
											</th>
											<th className="border border-gray-300 px-4 py-2">
												BILIK 2
											</th>
											<th className="border border-gray-300 px-4 py-2">
												BILIK 3
											</th>
											<th className="border border-gray-300 px-4 py-2">
												BILIK 4
											</th>
										</tr>
									</thead>
									<tbody>
										{/* ADULT */}
										<tr className="h-9">
											<td className="border border-gray-300 px-4 py-1 font-bold">
												ADULT
											</td>
											{["Adult_Double", "Adult_Triple", "Adult_Quad"].map(
												(field) => (
													<td
														key={field}
														className="border border-gray-300 px-4 py-2"
													>
														<div className="flex items-start justify-center h-9">
															<p className="px-2 py-1 border-l border-t border-b border-gray-200 rounded-s-md">
																RM
															</p>
															<Form.Item
																name={field}
																rules={[
																	{
																		required: true,
																		message: "Please enter the price",
																	},
																]}
																className="flex items-center"
															>
																<Input
																	type="number"
																	min={0}
																	className="rounded-s-none"
																	placeholder="Enter price"
																/>
															</Form.Item>
														</div>
													</td>
												)
											)}
										</tr>

										{/* CHILD WITH BED */}
										<tr className="h-9">
											<td className="border border-gray-300 px-4 py-2 font-bold">
												CHILD WITH BED
											</td>
											{[
												"ChildWBed_Double",
												"ChildWBed_Triple",
												"ChildWBed_Quad",
											].map((field) => (
												<td
													key={field}
													className="border border-gray-300 px-4 py-2"
												>
													<div className="flex items-start justify-center h-9">
														<p className="px-2 py-1 border-l border-t border-b border-gray-200 rounded-s-md">
															RM
														</p>
														<Form.Item
															name={field}
															rules={[
																{
																	required: true,
																	message: "Please enter the price",
																},
															]}
															className="flex items-center"
														>
															<Input
																type="number"
																min={0}
																className="rounded-s-none"
																placeholder="Enter price"
															/>
														</Form.Item>
													</div>
												</td>
											))}
										</tr>

										{/* CHILD WITHOUT BED */}
										<tr className="h-9">
											<td className="border border-gray-300 px-4 py-2 font-bold">
												CHILD WITHOUT BED
											</td>
											{[
												"ChildNoBed_Double",
												"ChildNoBed_Triple",
												"ChildNoBed_Quad",
											].map((field) => (
												<td
													key={field}
													className="border border-gray-300 px-4 py-2"
												>
													<div className="flex items-start justify-center h-9">
														<p className="px-2 py-1 border-l border-t border-b border-gray-200 rounded-s-md">
															RM
														</p>
														<Form.Item
															name={field}
															rules={[
																{
																	required: true,
																	message: "Please enter the price",
																},
															]}
															className="flex items-center"
														>
															<Input
																type="number"
																min={0}
																className="rounded-s-none"
																placeholder="Enter price"
															/>
														</Form.Item>
													</div>
												</td>
											))}
										</tr>

										{/* INFANT */}
										<tr className="h-9">
											<td className="border border-gray-300 px-4 py-2 font-bold">
												INFANT
											</td>
											{["Infant_Double", "Infant_Triple", "Infant_Quad"].map(
												(field) => (
													<td
														key={field}
														className="border border-gray-300 px-4 py-2"
													>
														<div className="flex items-start justify-center h-9">
															<p className="px-2 py-1 border-l border-t border-b border-gray-200 rounded-s-md">
																RM
															</p>
															<Form.Item
																name={field}
																rules={[
																	{
																		required: true,
																		message: "Please enter the price",
																	},
																]}
																className="flex items-center"
															>
																<Input
																	type="number"
																	min={0}
																	className="rounded-s-none"
																	placeholder="Enter price"
																/>
															</Form.Item>
														</div>
													</td>
												)
											)}
										</tr>
									</tbody>
								</table>

								<Form.Item>
									<Button type="primary" htmlType="submit" block>
										{editingPackage ? "Update Package" : "Add Package"}
									</Button>
								</Form.Item>
							</Form>
						</Modal>
					</>
				)}
			</div>
		</AdminLayout>
	);
};

export default TetapanPakej;
