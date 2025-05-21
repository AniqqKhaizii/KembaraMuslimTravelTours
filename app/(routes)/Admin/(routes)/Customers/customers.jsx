"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { Button, Table, Space, message } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	WhatsAppOutlined,
} from "@ant-design/icons";

import Axios from "axios";
import { CopyIcon } from "lucide-react";

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
			width: 10,
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
			width: 350,
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
			width: 150,
			onCell: () => ({
				className: "font-primary",
			}),
			render: (_, record) => (
				<Space className="flex justify-center">
					{record.ReferralCode}
					<Button
						icon={<CopyIcon className="w-4 h-4" />}
						className="bg-transparent hover:bg-transparent border-0 text-white"
						onClick={() => {
							navigator.clipboard.writeText(record.ReferralCode);
							message.success("Copied to clipboard");
						}}
					/>
				</Space>
			),
		},
		{
			title: "Contact",
			dataIndex: "CustPhone",
			key: "Contact",
			width: 100,
			onCell: () => ({
				className: "font-primary",
			}),
			render: (_, record) => (
				<Space className="flex justify-center">
					<Button
						icon={<WhatsAppOutlined />}
						className="bg-green-500/60 hover:bg-green-600 text-white py-1 px-2 rounded-3xl"
						onClick={() => window.open(`https://wa.me/${record.CustPhone}`)}
					/>
				</Space>
			),
		},
	];

	return (
		<AdminLayout>
			<div className="px-4">
				<div className="flex justify-between items-center  p-4">
					<h1 className="text-3xl font-regular dark:text-white text-zinc-950">
						Senarai Jemaah
					</h1>
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
