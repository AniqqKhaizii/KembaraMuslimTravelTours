"use client";
import React, { useState, useEffect } from "react";
import { Table, Form, Input, Button, Modal, Spin, Select, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IoClipboardOutline } from "react-icons/io5";
import AdminLayout from "../../../../layout/AdminLayout";
import Axios from "axios";
import { useRouter } from "next/navigation";

const { Option } = Select;

const ManageHotel = () => {
	const router = useRouter();
	const [hotels, setHotels] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentHotel, setCurrentHotel] = useState(null);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHotels = async () => {
			setLoading(true);
			try {
				const response = await Axios.get("/api/Tetapan/ManageHotel", {
					params: {
						Operation: "SEARCH",
						HotelID: null,
						HotelName: null,
						Location: null,
					},
				});
				setHotels(response.data);
			} catch (error) {
				console.error("Error fetching hotels:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchHotels();
	}, []);

	const showModal = (hotel = null) => {
		setCurrentHotel(hotel);
		if (hotel) {
			form.setFieldsValue({
				HotelName: hotel.HotelName,
				Location: hotel.Location,
				Stars: hotel.Stars,
				Distance: hotel.Distance,
			});
		} else {
			form.resetFields();
		}
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setCurrentHotel(null);
	};

	const handleFormSubmit = async (values) => {
		try {
			if (currentHotel) {
				const response = await Axios.get("/api/Tetapan/ManageHotel", {
					params: {
						Operation: "UPDATE",
						HotelID: currentHotel.HotelID,
						...values,
					},
				});
				if (response.data.message) {
					message.error(response.data.message);
				} else {
					setHotels((prev) =>
						prev.map((hotel) =>
							hotel.HotelID === currentHotel.HotelID
								? { ...hotel, ...values }
								: hotel
						)
					);
					message.success("Hotel updated successfully");
				}
			} else {
				const response = await Axios.get("/api/Tetapan/ManageHotel", {
					params: {
						Operation: "ADD_NEW",
						...values,
					},
				});
				if (response.data.message) {
					message.error(response.data.message);
				} else {
					const newHotel = {
						HotelID: hotels.length + 1,
						...values,
					};
					setHotels((prev) => [...prev, newHotel]);
					message.success("Hotel added successfully");
				}
			}

			handleCancel();
		} catch (error) {
			console.error("Error saving hotel:", error);
			message.error("Failed to save hotel");
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await Axios.get("/api/Tetapan/ManageHotel", {
				params: {
					Operation: "DELETE",
					HotelID: id,
				},
			});
			if (response.data.message) {
				message.error(response.data.message);
				return;
			} else {
				setHotels((prev) => prev.filter((hotel) => hotel.HotelID !== id));
				message.success("Hotel deleted successfully");
			}
		} catch (error) {
			console.error("Error deleting hotel:", error);
			message.error("Failed to delete hotel");
		}
	};

	const columns = [
		{
			title: "No.",
			key: "no",
			width: 50,
			className: "font-primary",
			render: (_, __, index) => index + 1 + ".",
			onCell: () => ({
				className: "font-primary",
			}),
		},
		{
			title: "Hotel Name",
			dataIndex: "HotelName",
			key: "HotelName",
			className: "font-primary",
			onCell: () => ({
				className: "font-primary",
			}),
		},
		{
			title: "Location",
			dataIndex: "Location",
			key: "Location",
			className: "font-primary",
			onCell: () => ({
				className: "font-primary",
			}),
		},
		{
			title: "Stars",
			dataIndex: "Stars",
			key: "Stars",
			className: "font-primary",
			onCell: () => ({
				className: "font-primary",
			}),
			render: (stars) => `${stars} ⭐`,
		},
		{
			title: "Distance (m)",
			dataIndex: "Distance",
			key: "Distance",
			className: "font-primary",
			onCell: () => ({
				className: "font-primary",
			}),
		},
		{
			title: "Actions",
			key: "actions",
			width: 300,
			className: "font-primary",
			onCell: () => ({
				className: "font-primary",
			}),
			render: (_, record) => (
				<div className="flex gap-2">
					<Button
						icon={<EditOutlined />}
						onClick={() => showModal(record)}
						className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-3xl font-primary"
					>
						Edit
					</Button>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => handleDelete(record.HotelID)}
						className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-3xl font-primary"
					>
						Delete
					</Button>
					<Button
						icon={<IoClipboardOutline />}
						onClick={() =>
							router.push(`Hotel/Details?HotelID=${record.HotelID}`)
						}
						className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-3xl font-primary"
					>
						Details
					</Button>
				</div>
			),
		},
	];

	return (
		<AdminLayout>
			<div className="mx-2">
				{loading ? (
					<Spin className="min-h-40 flex items-center justify-center" />
				) : (
					<>
						<div className="flex justify-between items-center mb-4 border-b border-gray-200 p-4">
							<h2 className="text-3xl font-regular">Manage Hotel Details</h2>
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={() => showModal()}
							>
								Add New Hotel
							</Button>
						</div>

						<div className="p-2">
							<Table
								columns={columns}
								dataSource={hotels}
								rowKey="HotelID"
								className="bg-white/10 rounded-lg glass-table"
							/>
						</div>

						<Modal
							title={currentHotel ? "Edit Hotel" : "Add New Hotel"}
							open={isModalVisible}
							onCancel={handleCancel}
							footer={null}
							className="glass-modal"
						>
							<Form form={form} layout="vertical" onFinish={handleFormSubmit}>
								{/* Hotel Name */}
								<Form.Item
									label={<span className="text-white">Hotel Name</span>}
									name="HotelName"
									rules={[
										{ required: true, message: "Please enter the hotel name" },
									]}
								>
									<Input
										placeholder="Enter hotel name"
										className="glass-input text-white"
										rootClassName="glass-input-wrapper"
									/>
								</Form.Item>

								{/* Location */}
								<Form.Item
									label={<span className="text-white">Location</span>}
									name="Location"
									rules={[
										{ required: true, message: "Please enter the location" },
									]}
								>
									<Select
										placeholder="Select location"
										className="glass-select w-full"
										dropdownClassName="glass-select-dropdown"
									>
										<Option value="Makkah">Makkah</Option>
										<Option value="Madinah">Madinah</Option>
									</Select>
								</Form.Item>

								{/* Stars */}
								<Form.Item
									label={<span className="text-white">Stars</span>}
									name="Stars"
									rules={[{ required: true, message: "Please select stars" }]}
								>
									<Select
										placeholder="Select stars"
										className="glass-select w-full"
										dropdownClassName="glass-select-dropdown"
									>
										<Option value="1">1</Option>
										<Option value="2">2</Option>
										<Option value="3">3</Option>
										<Option value="4">4</Option>
										<Option value="5">5</Option>
									</Select>
								</Form.Item>

								{/* Distance */}
								<Form.Item
									label={<span className="text-white">Distance (m)</span>}
									name="Distance"
									rules={[
										{ required: true, message: "Please enter the distance" },
									]}
								>
									<Input
										placeholder="Enter distance in meters"
										type="number"
										className="glass-input text-white"
										rootClassName="glass-input-wrapper"
									/>
								</Form.Item>

								{/* Submit Button */}
								<Form.Item>
									<div className="flex justify-end gap-4">
										<Button
											onClick={handleCancel}
											className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
										>
											Cancel
										</Button>
										<Button
											type="primary"
											htmlType="submit"
											className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
										>
											{currentHotel ? "Update Hotel" : "Add Hotel"}
										</Button>
									</div>
								</Form.Item>
							</Form>
						</Modal>
					</>
				)}
			</div>
		</AdminLayout>
	);
};

export default ManageHotel;
