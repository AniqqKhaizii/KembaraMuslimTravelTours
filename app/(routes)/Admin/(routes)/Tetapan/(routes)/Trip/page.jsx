"use client";
import React, { useState, useEffect } from "react";
import {
	Table,
	Form,
	Input,
	Button,
	DatePicker,
	Modal,
	Select,
	Spin,
	message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminLayout from "../../../../layout/AdminLayout";
import Axios from "axios";
import dayjs from "dayjs";
const { Option } = Select;

const ManageTripDetails = () => {
	const [trips, setTrips] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentTrip, setCurrentTrip] = useState(null);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null); // Initially set to null
	const [AdminData, setAdminData] = useState(null); // Initially set to null (changed from [] to null to track loading state)
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
					const response = await Axios.get(
						`http://localhost:3000/api/Admin/AdminCarian`,
						{
							params: params,
						}
					);
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
		const fetchTrips = async () => {
			setLoading(true);
			try {
				const response = await Axios.get(
					"http://localhost:3000/api/Tetapan/ManageTrip",
					{
						params: {
							Operation: "SEARCH",
							TripID: null,
							TripName: null,
							StartDate: null,
							EndDate: null,
							Duration: null,
						},
					}
				);
				setTrips(response.data);
			} catch (error) {
				console.error("Error fetching trips:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTrips();
	}, []);
	const showModal = (trip = null) => {
		setCurrentTrip(trip);
		if (trip) {
			form.setFieldsValue({
				TripName: trip.TripName,
				StartTravelDate: trip.StartTravelDate
					? dayjs(trip.StartTravelDate)
					: null,
				EndTravelDate: trip.EndTravelDate ? dayjs(trip.EndTravelDate) : null,
				Duration: trip.Duration,
			});
		} else {
			form.resetFields();
		}
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setCurrentTrip(null);
	};

	const handleFormSubmit = async (values) => {
		const formattedValues = {
			...values,
			StartTravelDate: values.StartTravelDate.format("YYYYMMDD"), // format to 'yyyymmdd'
			EndTravelDate: values.EndTravelDate.format("YYYYMMDD"), // format to 'yyyymmdd'
		};

		try {
			if (currentTrip) {
				const response = await Axios.get(
					"http://localhost:3000/api/Tetapan/ManageTrip",
					{
						params: {
							Operation: "UPDATE",
							TripID: currentTrip.TripID,
							TripName: formattedValues.TripName,
							StartTravelDate: formattedValues.StartTravelDate,
							EndTravelDate: formattedValues.EndTravelDate,
							Duration: formattedValues.Duration,
						},
					}
				);
				if (response.data.message) {
					message.error(response.data.message);
				} else {
					setTrips((prev) =>
						prev.map((trip) =>
							trip.TripID === currentTrip.TripID
								? { ...trip, ...formattedValues }
								: trip
						)
					);
					message.success("Trip updated successfully");
				}
			} else {
				const response = await Axios.get(
					"http://localhost:3000/api/Tetapan/ManageTrip",
					{
						params: {
							Operation: "ADD_NEW",
							TripID: null,
							TripName: formattedValues.TripName,
							StartTravelDate: formattedValues.StartTravelDate,
							EndTravelDate: formattedValues.EndTravelDate,
							Duration: formattedValues.Duration,
						},
					}
				);
				if (response.data.message) {
					message.error(response.data.message);
				} else {
					const queryData = response.data;
					const newTrip = {
						TripID: trips.length + 1,
						...formattedValues,
					};
					setTrips((prev) => [...prev, newTrip]);
					message.success("Trip added successfully");
				}
			}

			handleCancel();
		} catch (error) {
			console.error("Error saving trip:", error);
			message.error("Failed to save trip");
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await Axios.get(
				"http://localhost:3000/api/Tetapan/ManageTrip",
				{
					params: {
						Operation: "DELETE",
						TripID: id,
					},
				}
			);
			if (response.data.message) {
				message.error(response.data.message);
				return;
			} else {
				setTrips((prev) => prev.filter((trip) => trip.TripID !== id));
				message.success("Trip deleted successfully");
			}
		} catch (error) {
			console.error("Error deleting trip:", error);
			message.error("Failed to delete trip");
		}
	};

	const columns = [
		{
			title: "No.",
			key: "no",
			width: 50,
			className: "font-primary text-center",
			render: (_, __, index) => index + 1 + ".",
		},
		{
			title: "Trip Name",
			dataIndex: "TripName",
			key: "TripName",
			width: 300,
			className: "font-primary ",
			onCell: () => ({
				className:
					"uppercase font-primary text-blue-600 cursor-pointer hover:underline",
			}),
		},
		{
			title: "Airline",
			dataIndex: "Airline",
			key: "TripName",
			className: "font-primary ",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Flight Details",
			dataIndex: "FlightDetails",
			key: "TripName",
			className: "font-primary ",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},

		{
			title: "Travel Date",
			dataIndex: "StartTravelDate", // Keep one dataIndex for sorting
			key: "TravelDate",
			width: 225,
			className: "font-primary",
			render: (_, record) => {
				const startDate = record.StartTravelDate
					? dayjs(record.StartTravelDate).format("DD MMM YYYY")
					: "N/A";
				const endDate = record.EndTravelDate
					? dayjs(record.EndTravelDate).format("DD MMM YYYY")
					: "N/A";
				return `${startDate} - ${endDate}`;
			},
			onCell: () => ({
				className: "uppercase font-primary",
			}),
			sorter: (a, b) => {
				const dateA = a.StartTravelDate ? dayjs(a.StartTravelDate).unix() : 0;
				const dateB = b.StartTravelDate ? dayjs(b.StartTravelDate).unix() : 0;
				return dateA - dateB;
			},
			defaultSortOrder: "ascend",
		},
		{
			title: "Duration",
			dataIndex: "Duration",
			key: "Duration",
			width: 100,
			className: "font-primary ",
			render: (value) => {
				return value ? value + " Hari" : "N/A";
			},
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Seat Balance",
			dataIndex: "SeatAvailable", // Keep one dataIndex for sorting
			key: "SeatAvailable",
			className: "font-primary",
			render: (_, record) => {
				const SeatSold = record.SeatSold ? record.SeatSold : 0;
				const SeatAvailable = record.SeatAvailable ? record.SeatAvailable : 0;
				return `${SeatSold} / ${SeatAvailable}`;
			},
			onCell: () => ({
				className: "uppercase font-primary text-center",
			}),
		},
		{
			title: "Status",
			dataIndex: "Status",
			key: "Status",
			className: "font-primary text-center",
			render: (text) => (
				<span
					className={`uppercase font-primary px-4 py-1 rounded-full ${
						text === "Open"
							? "bg-green-500 text-white"
							: "bg-red-500 text-white"
					}`}
				>
					{text}
				</span>
			),
		},
		{
			title: "Actions",
			key: "actions",
			width: 100,
			className: "font-primary",
			onCell: () => ({
				className: "uppercase font-primary flex flex-col justify-center",
			}),
			render: (_, record) => (
				<div className="flex items-center gap-2">
					<Button
						icon={<EditOutlined />}
						onClick={() => showModal(record)}
						className="bg-green-500 hover:bg-green-600 text-white px-2 rounded-md w-full"
					>
						Edit
					</Button>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => handleDelete(record.TripID)}
						className="bg-red-500 hover:bg-red-600 text-white  px-2 rounded-md w-full"
					>
						Delete
					</Button>
				</div>
			),
		},
	];
	if (AdminData) {
		if (AdminData[0]?.AdmLevel === 1) {
			columns.splice(7, 0, {
				title: "Commision",
				dataIndex: "Commision",
				key: "Commision",
				className: "font-primary ",
				onCell: () => ({
					className: "uppercase font-primary",
				}),
			});
		}
	}

	return (
		<AdminLayout>
			<div className="mx-4">
				{loading ? (
					<Spin className="min-h-40 flex items-center justify-center" />
				) : (
					<>
						<div className="flex justify-between items-center mb-4 border-b border-gray-200 p-4">
							<h2 className="text-3xl font-regular">
								Manage Umrah Trip Details
							</h2>
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={() => showModal()}
							>
								Add New Trip
							</Button>
						</div>

						<Table
							columns={columns}
							dataSource={trips}
							rowKey="TripID"
							defaultSorted={{ field: "StartTravelDate", order: "ascend" }}
						/>

						<Modal
							title={currentTrip ? "Edit Trip" : "Add New Trip"}
							open={isModalVisible}
							onCancel={handleCancel}
							footer={null}
						>
							<Form form={form} layout="vertical" onFinish={handleFormSubmit}>
								{/* Hidden Field for TripID */}
								<Form.Item name="TripID" hidden>
									<Input type="hidden" />
								</Form.Item>

								{/* Trip Name */}
								<Form.Item
									name="TripName"
									label="Trip Name"
									rules={[
										{ required: true, message: "Please enter the trip name" },
									]}
								>
									<Input placeholder="Enter trip name" />
								</Form.Item>

								{/* Start Travel Date */}
								<Form.Item
									name="StartTravelDate"
									label="Start Travel Date"
									rules={[
										{
											required: true,
											message: "Please select the start travel date",
										},
									]}
								>
									<DatePicker style={{ width: "100%" }} />
								</Form.Item>

								{/* End Travel Date */}
								<Form.Item
									name="EndTravelDate"
									label="End Travel Date"
									rules={[
										{
											required: true,
											message: "Please select the end travel date",
										},
									]}
								>
									<DatePicker style={{ width: "100%" }} />
								</Form.Item>

								{/* Duration */}
								<Form.Item
									name="Duration"
									label="Duration (Days)"
									rules={[
										{
											required: true,
											message: "Please enter the duration of the trip",
										},
									]}
								>
									<Input type="number" placeholder="Enter duration in days" />
								</Form.Item>

								{/* Submit Button */}
								<Form.Item>
									<Button type="primary" htmlType="submit" block>
										{currentTrip ? "Update Trip" : "Add Trip"}
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

export default ManageTripDetails;
