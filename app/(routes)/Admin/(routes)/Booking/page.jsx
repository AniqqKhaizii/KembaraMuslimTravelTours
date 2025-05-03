"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { Button, Table, Space, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs"; // to format dates
import relativeTime from "dayjs/plugin/relativeTime"; // Optional for relative time
import advancedFormat from "dayjs/plugin/advancedFormat";
import Axios from "axios";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

const parsePax = (paxString) => {
	const paxObject = {};
	paxString.split(",").forEach((item) => {
		const [key, value] = item.split(":");
		paxObject[key] = parseInt(value, 10);
	});
	return paxObject;
};

const BookingPage = () => {
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null);
	const [customers, setCustomers] = useState([]);
	const [groupedData, setGroupedData] = useState({});
	const [tripFilter, setTripFilter] = useState(null);

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
					Operation: "SEARCH",
				};
				setLoading(true);
				try {
					const response = await Axios.get(`/api/Booking`, {
						params: params,
					});
					if (response.data.message) {
						alert(response.data.message);
					} else {
						const queryData = response.data;
						setCustomers(queryData);
						groupDataByTrip(queryData); // Group the data when it's fetched
					}
				} catch (error) {
					console.error("Error fetching user info", error);
				} finally {
					setLoading(false);
				}
			};
			fetchUserInfo();
		}
	}, [userData]);

	// Group data by TripID
	const groupDataByTrip = (data) => {
		const grouped = data.reduce((acc, record) => {
			const tripID = record.TripID;
			if (!acc[tripID]) {
				acc[tripID] = [];
			}
			acc[tripID].push(record);
			return acc;
		}, {});
		setGroupedData(grouped);
	};

	const handleTripFilterChange = (value) => {
		setTripFilter(value);
	};

	const filteredCustomers = tripFilter
		? groupedData[tripFilter] || []
		: [].concat(...Object.values(groupedData));

	const columns = [
		{
			title: "No.",
			dataIndex: "index",
			key: "index",
			render: (_, __, index) => <span>{index + 1}.</span>,
			onCell: () => ({
				className: "uppercase font-primary text-sm text-center",
			}),
		},
		{
			title: "Booking Date",
			dataIndex: "BookDate",
			key: "BookDate",
			onCell: () => ({
				className: "uppercase font-primary text-sm",
			}),
			render: (text) => dayjs(text).format("DD MMM YYYY hh:mm:ss A"),
		},
		{
			title: "Booking ID",
			dataIndex: "BookID",
			key: "BookID",
			onCell: () => ({
				className: "uppercase font-primary text-sm",
			}),
		},
		{
			title: "Customer Name",
			dataIndex: "CustName",
			onCell: () => ({
				className: "uppercase font-primary text-sm",
			}),
		},
		{
			title: "Pakej & Trip",
			dataIndex: "PakejTrip",
			key: "PakejTrip",
			onCell: () => ({
				className: "font-primary uppercase text-sm",
			}),
			render: (_, record) => `${record.PakejName} - ${record.TripName}`,
		},
		{
			title: "Travel Date",
			dataIndex: "TravelDate",
			key: "TravelDate",
			onCell: () => ({
				className: "uppercase font-primary text-sm",
			}),
			render: (_, record) =>
				`${dayjs(record.StartTravelDate).format("DD MMM YYYY")} - ${dayjs(
					record.EndTravelDate
				).format("DD MMM YYYY")}`,
		},
		{
			title: "Pax",
			dataIndex: "Pax",
			key: "Pax",
			onCell: () => ({
				className: "font-primary text-sm",
			}),
			render: (_, record) => {
				const paxData = parsePax(record.Pax);
				return (
					<table className="table-auto w-full text-sm p-2">
						<tbody>
							<tr>
								<td className="border-b border-gray-100/40">Adult</td>
								<td className="border-b border-gray-100/40">:</td>
								<td className="border-b border-gray-100/40">{paxData.Adult}</td>
							</tr>
							<tr>
								<td className="border-b border-gray-100/40">Child With Bed</td>
								<td className="border-b border-gray-100/40">:</td>
								<td className="border-b border-gray-100/40">
									{paxData.ChildWithBed}
								</td>
							</tr>
							<tr>
								<td className="border-b border-gray-100/40">
									Child Without Bed
								</td>
								<td className="border-b border-gray-100/40">:</td>
								<td className="border-b border-gray-100/40">
									{paxData.ChildWithoutBed}
								</td>
							</tr>
							<tr>
								<td className="border-b border-gray-100/40">Infant</td>
								<td className="border-b border-gray-100/40">:</td>
								<td className="border-b border-gray-100/40">
									{paxData.Infant}
								</td>
							</tr>
						</tbody>
					</table>
				);
			},
		},
		{
			title: "Referral",
			dataIndex: "ReferralCode",
			key: "ReferralCode",
			onCell: () => ({
				className: "font-primary text-sm",
			}),
		},
		{
			title: "Actions",
			key: "Actions",
			render: (_, record) => (
				<div className="flex flex-col gap-2 text-sm">
					<Button
						type="link"
						onClick={() =>
							(window.location.href = `/Admin/Booking/Details?BookID=${record.BookID}`)
						}
						className="bg-green-500/10 border border-green-500 text-white hover:bg-green-500 hover:text-white rounded-3xl"
					>
						View
					</Button>
					<Button
						type="link"
						onClick={() =>
							window
								.open(
									`/Admin/Booking/Invoice?BookID=${record.BookID}`,
									"_blank"
								)
								.focus()
						}
						className="bg-orange-500/10 border border-orange-300 text-white hover:bg-orange-300 hover:text-white rounded-3xl"
					>
						Invoice
					</Button>
				</div>
			),
		},
	];

	return (
		<AdminLayout>
			<div className="px-4">
				<div className="flex justify-between items-center p-4">
					<h1 className="text-3xl font-regular text-white">Senarai Booking</h1>
					<Select
						value={tripFilter}
						onChange={handleTripFilterChange}
						className="w-64  glass-select"
						popupClassName="glass-select-dropdown"
						placeholder="Select Trip"
					>
						<Select.Option value={null}>All Trips</Select.Option>
						{Object.keys(groupedData).map((tripID) => (
							<Select.Option key={tripID} value={tripID}>
								{groupedData[tripID][0].TripName}
							</Select.Option>
						))}
					</Select>
				</div>

				<div className="px-4">
					<Table
						loading={loading}
						columns={columns}
						dataSource={filteredCustomers}
						onHeaderRow={() => ({
							className: "uppercase font-primary",
						})}
						rowKey={(record) => record.BookID}
						className="w-full bg-white/10 rounded-lg glass-table"
					/>
				</div>
			</div>
		</AdminLayout>
	);
};

export default BookingPage;
