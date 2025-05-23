"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
	Form,
	Input,
	Button,
	Table,
	Modal,
	Space,
	Spin,
	Select,
	message,
} from "antd";
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
	const [userData, setUserData] = useState(null);
	const [AdminData, setAdminData] = useState(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedUserData =
				sessionStorage.getItem("UserData") || localStorage.getItem("UserData");
			if (storedUserData) {
				setUserData(JSON.parse(storedUserData));
			}
		}
	}, []);
	useEffect(() => {
		if (userData) {
			const fetchUserInfo = async () => {
				const params = {
					Username: userData.AdmUname,
					UserLevel: userData.AdmLevel,
					UserRole: userData.AdmRole,
				};
				try {
					const response = await Axios.get(`/api/Admin/AdminCarian`, {
						params: params,
					});
					if (response.data.message) {
						alert(response.data.message);
					} else {
						const queryData = response.data;
						setAdminData(queryData);
					}
				} catch (error) {
					console.error("Error fetching user info", error);
				}
			};
			fetchUserInfo();
		}
	}, [userData]);

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
		console.log("values", values);
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
			Commission: parseFloat(values.Commission),
			Bagasi: values.Bagasi,
			SpeedTrain: values.SpeedTrain,
			MakkahFoodOption: values.MakkahFoodOption,
			MadinahFoodOption: values.MadinahFoodOption,
			Visa: values.Visa,
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
					Commission: formattedValues.Commission,
					Bagasi: formattedValues.Bagasi,
					SpeedTrain: formattedValues.SpeedTrain,
					MakkahFoodOption: formattedValues.MakkahFoodOption,
					MadinahFoodOption: formattedValues.MadinahFoodOption,
					Visa: formattedValues.Visa,
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
					Commission: formattedValues.Commission,
					Bagasi: formattedValues.Bagasi,
					SpeedTrain: formattedValues.SpeedTrain,
					MakkahFoodOption: formattedValues.MakkahFoodOption,
					MadinahFoodOption: formattedValues.MadinahFoodOption,
					Visa: formattedValues.Visa,
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

	// useEffect(() => {
	// 	if (editingPackage) {
	// 		form.setFieldsValue({
	// 			PakejName: editingPackage.PakejName,
	// 			Adult_Double: editingPackage.Adult_Double,
	// 			Adult_Triple: editingPackage.Adult_Triple,
	// 			Adult_Quad: editingPackage.Adult_Quad,
	// 			ChildWBed_Double: editingPackage.ChildWBed_Double,
	// 			ChildWBed_Triple: editingPackage.ChildWBed_Triple,
	// 			ChildWBed_Quad: editingPackage.ChildWBed_Quad,
	// 			ChildNoBed_Double: editingPackage.ChildNoBed_Double,
	// 			ChildNoBed_Triple: editingPackage.ChildNoBed_Triple,
	// 			ChildNoBed_Quad: editingPackage.ChildNoBed_Quad,
	// 			Infant_Double: editingPackage.Infant_Double,
	// 			Infant_Triple: editingPackage.Infant_Triple,
	// 			Infant_Quad: editingPackage.Infant_Quad,
	// 			Commission: editingPackage.Commission,
	// 		});
	// 	}
	// }, [editingPackage, form]);

	const handleEdit = (record) => {
		const { PakejPoster, ...newRecord } = record;
		setEditingPackage(newRecord);
		form.setFieldsValue(newRecord);
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
			width: 350,
			onCell: () => ({
				style: { verticalAlign: "top" },
				className: "uppercase font-primary",
			}),
			render: (_, record) => (
				<table className="w-full text-left text-[11px]">
					<thead className="dark:text-white text-zinc-950">
						<tr>
							<th className="p-1 border-l border-t border-b dark:border-gray-300 border-gray-400 text-left">
								Kategori
							</th>
							<th className="p-1 border-l border-t border-b dark:border-gray-300 border-gray-400">
								Bilik 2
							</th>
							<th className="p-1 border-l border-t border-b dark:border-gray-300 border-gray-400">
								Bilik 3
							</th>
							<th className="p-1 border dark:border-gray-300 border-gray-400">
								Bilik 4
							</th>
						</tr>
					</thead>
					<tbody>
						{/* Adult */}
						<tr>
							<td className="p-1 border-l border-b dark:border-gray-300 border-gray-400 font-bold">
								ADULT
							</td>
							<td className="p-1 border-l border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.Adult_Double)}
							</td>
							<td className="p-1 border-l border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.Adult_Triple)}
							</td>
							<td className="p-1 border-l border-r border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.Adult_Quad)}
							</td>
						</tr>

						{/* Child with Bed */}
						<tr>
							<td className="p-1 border-l border-b dark:border-gray-300 border-gray-400 font-bold">
								CHILD WITH BED
							</td>
							<td className="p-1 border-l border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.ChildWBed_Double)}
							</td>
							<td className="p-1 border-l border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.ChildWBed_Triple)}
							</td>
							<td className="p-1 border-l border-r border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.ChildWBed_Quad)}
							</td>
						</tr>

						{/* Child without Bed */}
						<tr>
							<td className="p-1 border-l border-b dark:border-gray-300 border-gray-400 font-bold">
								CHILD WITHOUT BED
							</td>
							<td className="p-1 border-l border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.ChildNoBed_Double)}
							</td>
							<td className="p-1 border-l border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.ChildNoBed_Triple)}
							</td>
							<td className="p-1 border-l border-r border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.ChildNoBed_Quad)}
							</td>
						</tr>

						{/* Infant */}
						<tr>
							<td className="p-1 border-l border-b dark:border-gray-300 border-gray-400 font-bold">
								INFANT
							</td>
							<td className="p-1 border-l border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.Infant_Double)}
							</td>
							<td className="p-1 border-l border-b text-center dark:border-gray-300 border-gray-400">
								RM {parseFloat(record.Infant_Triple)}
							</td>
							<td className="p-1 border-l border-r border-b text-center dark:border-gray-300 border-gray-400">
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
			className: "font-primary",
			width: 350,
			render: (text, record) => (
				<ul className="list-disc mx-4 uppercase font-primary">
					<li>
						{record.MakkahHotelName} - {record.MakkahFoodOption}
					</li>
					<li>
						{record.MadinahHotelName} - {record.MadinahFoodOption}
					</li>
				</ul>
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
			width: 400,
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
								className={`flex flex-col items-center px-1 py-0.5 border border-gray-100/40 text-white  
											${trip.Status === "Open" ? "bg-green-600" : "bg-red-600"} 
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
			title: "Actions",
			key: "actions",
			className: "font-primary w-32",
			onCell: () => ({
				style: { verticalAlign: "top" },
				className: "uppercase font-primary",
			}),
			render: (_, record) => (
				<Space>
					<Button
						className="flex items-center gap-2 bg-white/10 hover:bg-blue-600/70 border dark:border-gray-100/40 border-gray-400 dark:text-white text-gray-700 py-2 px-4 rounded-3xl"
						icon={<EditOutlined />}
						onClick={() => handleEdit(record)}
					/>
					<Button
						className="flex items-center gap-2 bg-red-700/50 hover:bg-red-600/70 border border-gray-100/40 text-white py-3 px-4 rounded-3xl"
						icon={<DeleteOutlined />}
						onClick={() => handleDelete(record.PakejID)}
					/>
					<Button
						className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600/70 border border-gray-100/40 text-white py-2 px-4 rounded-3xl"
						onClick={() => handleViewDetails(record)}
					>
						View Details
					</Button>
				</Space>
			),
		},
	];

	if (AdminData) {
		if (AdminData[0]?.AdmLevel === 1) {
			columns.splice(4, 0, {
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
			});
		}
	}
	const HotelSelectionMakkah = ({ hotels, form }) => {
		const selectedHotel = editingPackage?.HotelMakkahID || null;

		useEffect(() => {
			if (editingPackage) {
				form.setFieldsValue({ HotelMakkahID: selectedHotel });
			}
		}, [selectedHotel]);

		return (
			<Form.Item
				name="HotelMakkahID"
				label={
					<span className="dark:text-white text-zinc-950 font-primary">
						Makkah Hotel
					</span>
				}
				rules={[{ required: true, message: "Please select a hotel" }]}
			>
				<Select
					className="glass-select w-full font-primary"
					popupClassName="glass-select-dropdown"
					placeholder="Select a Makkah hotel"
					options={hotels?.map((hotel) => ({
						label: hotel.HotelName,
						value: hotel.HotelID,
					}))}
				/>
			</Form.Item>
		);
	};

	const HotelSelectionMadinah = ({ hotels, form }) => {
		const selectedHotel = editingPackage?.HotelMadinahID || null;

		useEffect(() => {
			if (editingPackage) {
				form.setFieldsValue({ HotelMadinahID: selectedHotel });
			}
		}, [selectedHotel]);

		return (
			<Form.Item
				name="HotelMadinahID"
				label={
					<span className="dark:text-white text-zinc-950 font-primary">
						Madinah Hotel
					</span>
				}
				rules={[{ required: true, message: "Please select a hotel" }]}
			>
				<Select
					className="glass-select w-full font-primary"
					popupClassName="glass-select-dropdown"
					placeholder="Select a Madinah hotel"
					options={hotels?.map((hotel) => ({
						label: hotel.HotelName,
						value: hotel.HotelID,
					}))}
				/>
			</Form.Item>
		);
	};

	const TripSelection = ({ trips, form }) => {
		const selectedTrips = editingPackage?.TripID
			? editingPackage.TripID.split(",").map(Number)
			: [];

		useEffect(() => {
			form.setFieldsValue({ TripIDs: selectedTrips });
		}, [selectedTrips]);

		return (
			<Form.Item
				name="TripIDs"
				label={
					<span className="dark:text-white text-zinc-950 font-primary">
						Trips
					</span>
				}
				rules={[{ required: true, message: "Please select at least one trip" }]}
				className="lg:col-span-2"
			>
				<Select
					className="glass-select w-full font-primary"
					popupClassName="glass-select-dropdown"
					mode="multiple"
					placeholder="Select trips"
					options={trips?.map((trip) => ({
						label: trip.TripName,
						value: trip.TripID,
					}))}
				/>
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
						<div className="flex justify-between items-center p-4">
							<h1 className="text-3xl font-regular dark:text-white text-zinc-950">
								Manage Umrah Packages
							</h1>
							<Button
								icon={<PlusOutlined />}
								onClick={() => {
									setEditingPackage(null);
									setIsModalVisible(true);
								}}
								className="flex items-center gap-2 bg-blue-200/10 hover:bg-blue-600/70 border border-gray-100/40 dark:text-white text-zinc-950 py-2 px-4 rounded-3xl"
							>
								Add New Package
							</Button>
						</div>
						<div className="p-2">
							<Table
								className="w-full bg-white/10 rounded-lg glass-table"
								loading={loading}
								columns={columns}
								dataSource={packages.map((pkg) => ({
									...pkg,
									key: pkg.PakejID,
								}))}
								rowKey="key"
							/>
						</div>
						<React.Suspense fallback={<div>Loading...</div>}>
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
								className="glass-modal"
							>
								<Form
									form={form}
									className="font-primary"
									layout="vertical"
									onFinish={handleAddPackage}
									initialValues={editingPackage || {}}
								>
									<Form.Item
										name="PakejName"
										label={
											<span className="dark:text-white text-zinc-950 font-primary">
												Package Name
											</span>
										}
										rules={[
											{
												required: true,
												message: "Please enter the package name",
											},
										]}
									>
										<Input
											placeholder="Enter package name"
											className="glass-input dark:text-white text-zinc-950 font-primary"
											rootClassName="glass-input-wrapper"
										/>
									</Form.Item>
									<div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full">
										<HotelSelectionMakkah hotels={hotelMakkah} form={form} />
										<Form.Item
											name="MakkahFoodOption"
											label={
												<span className="dark:text-white text-zinc-950 font-primary">
													Makkah Food Option
												</span>
											}
											rules={[
												{
													required: true,
													message: "Please select a food option",
												},
											]}
										>
											<Select
												className="glass-select w-full font-primary"
												popupClassName="glass-select-dropdown"
												placeholder="Select Food Option"
											>
												<Select.Option value="Fullboard">
													Fullboard
												</Select.Option>
												<Select.Option value="Breakfast">
													Breakfast
												</Select.Option>
												<Select.Option value="Lunch">Lunch</Select.Option>
												<Select.Option value="Dinner">Dinner</Select.Option>
												<Select.Option value="None">None</Select.Option>
											</Select>
										</Form.Item>
										<HotelSelectionMadinah hotels={hotelMadinah} form={form} />
										<Form.Item
											name="MadinahFoodOption"
											label={
												<span className="dark:text-white text-zinc-950 font-primary">
													Madinah Food Option
												</span>
											}
											rules={[
												{
													required: true,
													message: "Please select a food option",
												},
											]}
										>
											<Select
												className="glass-select w-full font-primary"
												popupClassName="glass-select-dropdown"
												placeholder="Select Food Option"
											>
												<Select.Option value="Fullboard">
													Fullboard
												</Select.Option>
												<Select.Option value="Breakfast">
													Breakfast
												</Select.Option>
												<Select.Option value="Lunch">Lunch</Select.Option>
												<Select.Option value="Dinner">Dinner</Select.Option>
												<Select.Option value="None">None</Select.Option>
											</Select>
										</Form.Item>
									</div>

									<div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full">
										<Form.Item
											name="Commission"
											label={
												<span className="dark:text-white text-zinc-950 font-primary">
													Commission (RM)
												</span>
											}
											className="mb-4"
										>
											<Input
												type="number"
												min={0}
												addonBefore={
													<span className="text-zinc-950 dark:text-white">
														RM
													</span>
												}
												className="glass-input dark:text-white text-zinc-950 font-primary"
												rootClassName="glass-input-wrapper"
												placeholder="Enter commission"
											/>
										</Form.Item>
										<Form.Item
											name="Bagasi"
											label={
												<span className="dark:text-white text-zinc-950 font-primary">
													Bagasi
												</span>
											}
											rules={[
												{
													required: true,
													message: "Please select Bagasi option",
												},
											]}
										>
											<Select
												className="glass-select w-full font-primary"
												popupClassName="glass-select-dropdown"
												placeholder="Select Bagasi"
											>
												<Select.Option value="Y">Yes</Select.Option>
												<Select.Option value="N">No</Select.Option>
											</Select>
										</Form.Item>
										<Form.Item
											name="SpeedTrain"
											label={
												<span className="dark:text-white text-zinc-950 font-primary">
													Speed Train
												</span>
											}
											rules={[
												{
													required: true,
													message: "Please select Speed Train option",
												},
											]}
										>
											<Select
												className="glass-select w-full font-primary"
												popupClassName="glass-select-dropdown"
												placeholder="Select Speed Train"
											>
												<Select.Option value="Y">Yes</Select.Option>
												<Select.Option value="N">No</Select.Option>
											</Select>
										</Form.Item>
										<Form.Item
											name="Visa"
											label={
												<span className="dark:text-white text-zinc-950 font-primary">
													Visa
												</span>
											}
											rules={[
												{
													required: true,
													message: "Please select Visa option",
												},
											]}
										>
											<Select
												className="glass-select w-full font-primary"
												popupClassName="glass-select-dropdown"
												placeholder="Select Visa"
											>
												<Select.Option value="Umrah">Umrah</Select.Option>
												<Select.Option value="Ziarah">Ziarah</Select.Option>
											</Select>
										</Form.Item>
									</div>

									<TripSelection trips={trips} form={form} />

									<table className="table-auto w-full border-collapse border dark:border-gray-300 border-gray-400 mb-4  dark:text-white text-zinc-950">
										<thead>
											<tr className="bg-gray-200/20">
												<th className="border dark:border-gray-300 border-gray-400 px-4 py-2">
													KATEGORI
												</th>
												<th className="border dark:border-gray-300 border-gray-400 px-4 py-2">
													BILIK 2
												</th>
												<th className="border dark:border-gray-300 border-gray-400 px-4 py-2">
													BILIK 3
												</th>
												<th className="border dark:border-gray-300 border-gray-400 px-4 py-2">
													BILIK 4
												</th>
											</tr>
										</thead>
										<tbody>
											{/* ADULT */}
											<tr className="h-9">
												<td className="border dark:border-gray-300 border-gray-400 px-4 py-1 font-bold">
													ADULT
												</td>
												{["Adult_Double", "Adult_Triple", "Adult_Quad"].map(
													(field) => (
														<td
															key={field}
															className="border dark:border-gray-300 border-gray-400 px-4 py-2"
														>
															<div className="flex items-start justify-center h-9">
																<Form.Item
																	name={field}
																	rules={[
																		{
																			required: true,
																			message: "Please enter the price",
																		},
																	]}
																	className="flex items-center font-primary"
																>
																	<Input
																		type="number"
																		min={0}
																		addonBefore={
																			<span className="text-zinc-950 dark:text-white">
																				RM
																			</span>
																		}
																		className="glass-input dark:text-white text-zinc-950 font-primary"
																		rootClassName="glass-input-wrapper"
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
												<td className="border dark:border-gray-300 border-gray-400 px-4 py-2 font-bold">
													CHILD WITH BED
												</td>
												{[
													"ChildWBed_Double",
													"ChildWBed_Triple",
													"ChildWBed_Quad",
												].map((field) => (
													<td
														key={field}
														className="border dark:border-gray-300 border-gray-400 px-4 py-2"
													>
														<div className="flex items-start justify-center h-9">
															<Form.Item
																name={field}
																rules={[
																	{
																		required: true,
																		message: "Please enter the price",
																	},
																]}
																className="flex items-center font-primary"
															>
																<Input
																	type="number"
																	min={0}
																	addonBefore={
																		<span className="text-zinc-950 dark:text-white">
																			RM
																		</span>
																	}
																	className="glass-input dark:text-white text-zinc-950 font-primary"
																	rootClassName="glass-input-wrapper"
																	placeholder="Enter price"
																/>
															</Form.Item>
														</div>
													</td>
												))}
											</tr>

											{/* CHILD WITHOUT BED */}
											<tr className="h-9">
												<td className="border dark:border-gray-300 border-gray-400 px-4 py-2 font-bold">
													CHILD WITHOUT BED
												</td>
												{[
													"ChildNoBed_Double",
													"ChildNoBed_Triple",
													"ChildNoBed_Quad",
												].map((field) => (
													<td
														key={field}
														className="border dark:border-gray-300 border-gray-400 px-4 py-2"
													>
														<div className="flex items-start justify-center h-9">
															<Form.Item
																name={field}
																rules={[
																	{
																		required: true,
																		message: "Please enter the price",
																	},
																]}
																className="flex items-center font-primary"
															>
																<Input
																	type="number"
																	min={0}
																	addonBefore={
																		<span className="text-zinc-950 dark:text-white">
																			RM
																		</span>
																	}
																	className="glass-input dark:text-white text-zinc-950 font-primary"
																	rootClassName="glass-input-wrapper"
																	placeholder="Enter price"
																/>
															</Form.Item>
														</div>
													</td>
												))}
											</tr>

											{/* INFANT */}
											<tr className="h-9">
												<td className="border dark:border-gray-300 border-gray-400 px-4 py-2 font-bold">
													INFANT
												</td>
												{["Infant_Double", "Infant_Triple", "Infant_Quad"].map(
													(field) => (
														<td
															key={field}
															className="border dark:border-gray-300 border-gray-400 px-4 py-2"
														>
															<div className="flex items-start justify-center h-9">
																<Form.Item
																	name={field}
																	rules={[
																		{
																			required: true,
																			message: "Please enter the price",
																		},
																	]}
																	className="flex items-center font-primary"
																>
																	<Input
																		type="number"
																		min={0}
																		addonBefore={
																			<span className="text-zinc-950 dark:text-white">
																				RM
																			</span>
																		}
																		className="glass-input dark:text-white text-zinc-950 font-primary"
																		rootClassName="glass-input-wrapper"
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
										<Button
											type="primary"
											htmlType="submit"
											block
											className="font-primary"
										>
											{editingPackage ? "Update Package" : "Add Package"}
										</Button>
									</Form.Item>
								</Form>
							</Modal>
						</React.Suspense>
					</>
				)}
			</div>
		</AdminLayout>
	);
};

export default TetapanPakej;
