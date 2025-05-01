"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { Button, Table, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Axios from "axios";

const Customers = () => {
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null);
	const [customers, setCustomers] = useState([]);

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
					const response = await Axios.get(`/api/Customers`, {
						params: params,
					});
					if (response.data.message) {
						alert(response.data.message);
					} else {
						const queryData = response.data;
						setCustomers(queryData);
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

	const columns = [
		{
			title: "No.",
			dataIndex: "index",
			key: "index",
			render: (_, __, index) => <span>{index + 1}.</span>,
			onCell: () => ({
				className: "uppercase font-primary ",
			}),
		},
		{
			title: "IC Number",
			dataIndex: "CustID",
			key: "CustID",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Name",
			dataIndex: "CustName",
			key: "CustName",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Email",
			dataIndex: "CustEmail",
			key: "CustEmail",
			onCell: () => ({
				className: "font-primary",
			}),
		},
		{
			title: "Address",
			dataIndex: "CustAddress",
			key: "CustAddress",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Phone No.",
			dataIndex: "CustPhone",
			key: "CustPhone",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Referral Code",
			dataIndex: "ReferralCode",
			key: "ReferralCode",
			onCell: () => ({
				className: "font-primary",
			}),
		},
	];

	return (
		<AdminLayout>
			<div className="px-4">
				<div className="flex justify-between items-center  p-4">
					<h1 className="text-3xl font-regular text-white">Senarai Jemaah</h1>
				</div>

				<Table
					loading={loading}
					columns={columns}
					dataSource={customers}
					onHeaderRow={() => ({
						className: "uppercase font-primary",
					})}
					rowKey={(record) => record.CustID}
					className="w-full bg-white/10 rounded-lg glass-table"
				/>
			</div>
		</AdminLayout>
	);
};

export default Customers;
