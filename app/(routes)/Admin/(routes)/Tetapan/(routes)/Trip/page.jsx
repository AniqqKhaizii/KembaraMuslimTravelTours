"use client";
import React, { useState, useEffect } from "react";
import {
	Table,
	Form,
	Input,
	Button,
	DatePicker,
	Modal,
	message,
	Spin,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminLayout from "../../../../layout/AdminLayout";
import Axios from "axios";
import dayjs from "dayjs";

const ManageTripDetails = () => {
	const [trips, setTrips] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentTrip, setCurrentTrip] = useState(null);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const storedUserData =
			sessionStorage.getItem("UserData") || localStorage.getItem("UserData");
		if (storedUserData) {
			setUserData(JSON.parse(storedUserData));
		}
	}, []);

	useEffect(() => {
		const fetchTrips = async () => {
			setLoading(true);
			try {
				const response = await Axios.get("/api/Tetapan/ManageTrip", {
					params: {
						Operation: "SEARCH",
						TripID: null,
						TripName: null,
						StartDate: null,
						EndDate: null,
						Duration: null,
					},
				});
				setTrips(response.data);
			} catch (error) {
				console.error("Error fetching trips:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchTrips();
	}, [currentTrip]);

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
				Airline: trip.Airline,
				FlightDetails: trip.FlightDetails,
				SeatAvailable: trip.SeatAvailable,
				SeatSold: trip.SeatSold,
				Deadline: trip.Deadline,
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
			StartTravelDate: values.StartTravelDate.format("YYYYMMDD"),
			EndTravelDate: values.EndTravelDate.format("YYYYMMDD"),
		};

		try {
			const response = currentTrip
				? await Axios.get("/api/Tetapan/ManageTrip", {
						params: {
							Operation: "UPDATE",
							TripID: currentTrip.TripID,
							TripName: formattedValues.TripName,
							StartTravelDate: formattedValues.StartTravelDate,
							EndTravelDate: formattedValues.EndTravelDate,
							Duration: formattedValues.Duration,
							Airline: formattedValues.Airline,
							FlightDetails: formattedValues.FlightDetails,
							SeatAvailable: formattedValues.SeatAvailable,
							SeatSold: formattedValues.SeatSold,
							Deadline: formattedValues.Deadline,
						},
				  })
				: await Axios.get("/api/Tetapan/ManageTrip", {
						params: {
							Operation: "ADD_NEW",
							TripID: null,
							TripName: formattedValues.TripName,
							StartTravelDate: formattedValues.StartTravelDate,
							EndTravelDate: formattedValues.EndTravelDate,
							Duration: formattedValues.Duration,
							Airline: formattedValues.Airline,
							FlightDetails: formattedValues.FlightDetails,
							SeatAvailable: formattedValues.SeatAvailable,
							SeatSold: formattedValues.SeatSold,
							Deadline: formattedValues.Deadline,
						},
				  });

			if (response.data.message) {
				message.error(response.data.message);
			} else {
				if (currentTrip) {
					setTrips((prev) =>
						prev.map((trip) =>
							trip.TripID === currentTrip.TripID
								? { ...trip, ...formattedValues }
								: trip
						)
					);
					message.success("Trip updated successfully");
				} else {
					setTrips((prev) => [...prev, formattedValues]);
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
			const response = await Axios.get("/api/Tetapan/ManageTrip", {
				params: {
					Operation: "DELETE",
					TripID: id,
				},
			});
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
			className: "font-primary",
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
			align: "center",
			className: "font-primary text-center",
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
						className="bg-green-500 hover:bg-green-600 text-white px-4 font-primary rounded-3xl w-full"
					>
						Edit
					</Button>
					<Button
						icon={<DeleteOutlined />}
						onClick={() => handleDelete(record.TripID)}
						className="bg-red-500 hover:bg-red-600 text-white px-4 font-primary rounded-3xl w-full"
					>
						Delete
					</Button>
				</div>
			),
		},
	];

	return (
		<AdminLayout>
			<div className="mx-4">
				{loading ? (
					<Spin className="min-h-40 flex items-center justify-center" />
				) : (
					<>
						<div className="flex justify-between items-center p-4 text-white">
							<h2 className="text-3xl font-regular">
								Manage Umrah Trip Details
							</h2>
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={() => showModal()}
								className="flex items-center gap-2 bg-blue-200/10 hover:bg-blue-600/70 border border-gray-100/40 text-white py-2 px-4 rounded-3xl"
							>
								Add New Trip
							</Button>
						</div>
						<Table
							className="w-full bg-white/10 rounded-lg glass-table"
							loading={loading}
							columns={columns}
							dataSource={trips}
							pagination={false}
							rowKey="TripID"
						/>
						<Modal
							title={currentTrip ? "Edit Trip" : "Add Trip"}
							open={isModalVisible}
							onCancel={handleCancel}
							footer={null}
							width={1000}
							className="glass-modal"
						>
							<Spin spinning={loading}>
								<Form
									form={form}
									onFinish={handleFormSubmit}
									layout="vertical"
									className="grid grid-cols-2 gap-4 gap-y-0"
								>
									<Form.Item
										name="TripName"
										label={<span className="text-white">Trip Name</span>}
										className="col-span-2 text-white"
										rules={[
											{
												required: true,
												message: "Please input the trip name!",
											},
										]}
									>
										<Input
											className="glass-input text-white"
											rootClassName="glass-input-wrapper"
										/>
									</Form.Item>
									<Form.Item
										name="StartTravelDate"
										label={
											<span className="text-white">Start Travel Date</span>
										}
										rules={[
											{
												required: true,
												message: "Please input the start travel date!",
											},
										]}
									>
										<DatePicker
											format="DD/MM/YYYY"
											className="w-full glass-input"
										/>
									</Form.Item>
									<Form.Item
										name="EndTravelDate"
										label={<span className="text-white">End Travel Date</span>}
										rules={[
											{
												required: true,
												message: "Please input the end travel date!",
											},
										]}
									>
										<DatePicker
											format="DD/MM/YYYY"
											className="w-full glass-input"
										/>
									</Form.Item>
									<Form.Item
										name="Duration"
										label={<span className="text-white">Duration (Days)</span>}
										rules={[
											{ required: true, message: "Please input the duration!" },
										]}
									>
										<Input
											type="number"
											className="glass-input text-white"
											rootClassName="glass-input-wrapper"
										/>
									</Form.Item>
									<Form.Item
										name="Airline"
										label={<span className="text-white">Airline</span>}
									>
										<Input
											className="glass-input text-white"
											rootClassName="glass-input-wrapper"
										/>
									</Form.Item>
									<Form.Item
										name="FlightDetails"
										label={<span className="text-white">Flight Details</span>}
									>
										<Input
											className="glass-input text-white"
											rootClassName="glass-input-wrapper"
										/>
									</Form.Item>
									<Form.Item
										name="SeatAvailable"
										label={<span className="text-white">Seat Available</span>}
									>
										<Input
											type="number"
											className="glass-input text-white"
											rootClassName="glass-input-wrapper"
										/>
									</Form.Item>
									<Form.Item
										name="SeatSold"
										label={<span className="text-white">Seat Sold</span>}
									>
										<Input
											type="number"
											className="glass-input text-white"
											rootClassName="glass-input-wrapper"
										/>
									</Form.Item>
									<Form.Item
										name="Deadline"
										label={<span className="text-white">Deadline</span>}
									>
										<DatePicker
											format="DD/MM/YYYY"
											className="w-full glass-input"
										/>
									</Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										className="w-full mt-2 py-4 col-span-2 border border-white rounded-full bg-transparent text-white backdrop-blur"
									>
										Save
									</Button>
								</Form>
							</Spin>
						</Modal>
					</>
				)}
			</div>
		</AdminLayout>
	);
};

export default ManageTripDetails;
