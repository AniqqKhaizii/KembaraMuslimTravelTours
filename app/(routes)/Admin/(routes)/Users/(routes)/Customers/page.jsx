"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import AdminLayout from "../../../../layout/AdminLayout";
import { IoMdAdd } from "react-icons/io";
const Customers = () => {
	const [customers, setCustomers] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState(null);

	// Fetch customers from API on component mount
	useEffect(() => {
		axios
			.get("/api/customers") // Replace with your actual API endpoint
			.then((response) => {
				setCustomers(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the customers!", error);
			});
	}, []);

	// Handle the edit action
	const handleEdit = (customer) => {
		setSelectedCustomer(customer);
		setIsModalVisible(true);
	};

	// Close the modal
	const handleModalClose = () => {
		setIsModalVisible(false);
		setSelectedCustomer(null);
	};

	// Update customer data
	const handleUpdateCustomer = (updatedCustomer) => {
		axios
			.put(`/api/customers/${updatedCustomer.id}`, updatedCustomer) // Replace with your actual API endpoint
			.then((response) => {
				const updatedCustomers = customers.map((customer) =>
					customer.id === updatedCustomer.id ? updatedCustomer : customer
				);
				setCustomers(updatedCustomers);
				handleModalClose();
			})
			.catch((error) => {
				console.error("There was an error updating the customer!", error);
			});
	};

	// Table columns configuration
	const columns = [
		{
			title: "Customer ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Actions",
			key: "actions",
			render: (text, record) => (
				<Button type="primary" onClick={() => handleEdit(record)}>
					Edit
				</Button>
			),
		},
	];

	return (
		<AdminLayout>
			<div>
				<div className="p-4">
					<div className="flex justify-between items-center mb-4 border-b border-gray-200 p-4">
						<h1 className="text-3xl font-regular">Senarai Jemaah</h1>
						<button
							onClick={() => setIsModalAddOpen(true)}
							className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
						>
							<IoMdAdd />
							Daftar Jemaah
						</button>
					</div>

					{/* Ant Design Table */}
					<Table
						columns={columns}
						dataSource={customers}
						rowKey="id"
						pagination={true}
					/>
				</div>

				{isModalVisible && selectedCustomer && (
					<Modal
						title="Edit Customer"
						visible={isModalVisible}
						onCancel={handleModalClose}
						footer={[
							<Button key="cancel" onClick={handleModalClose}>
								Cancel
							</Button>,
							<Button
								key="submit"
								type="primary"
								onClick={() => {
									const form = document.getElementById("edit-customer-form");
									form.dispatchEvent(new Event("submit", { cancelable: true }));
								}}
							>
								Update
							</Button>,
						]}
					>
						<Form
							id="edit-customer-form"
							initialValues={selectedCustomer}
							onFinish={handleUpdateCustomer}
							layout="vertical"
						>
							<Form.Item
								label="Name"
								name="name"
								rules={[
									{
										required: true,
										message: "Please enter the customer's name!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										message: "Please enter the customer's email!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Phone"
								name="phone"
								rules={[
									{
										required: true,
										message: "Please enter the customer's phone!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item shouldUpdate>
								{() => (
									<Button type="primary" htmlType="submit">
										Update
									</Button>
								)}
							</Form.Item>
						</Form>
					</Modal>
				)}
			</div>
		</AdminLayout>
	);
};

export default Customers;
