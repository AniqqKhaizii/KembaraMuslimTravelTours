"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../../../layout/AdminLayout";
import { IoMdAdd } from "react-icons/io";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Button, Table, Modal, Space, Select, Upload } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Axios from "axios";
import { apiUrl } from "../../../../../../../config.js";

const AdminPage = () => {
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null); // Initially set to null
	const [isModalAddOpen, setIsModalAddOpen] = useState(false);
	const [isModalEditOpen, setIsModalEditOpen] = useState(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
		role: "Admin",
		userlevel: "1",
		image: null,
	});
	const [users, setUsers] = useState([]);
	const [editingUser, setEditingUser] = useState(null);

	const { Option } = Select;

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
					Username: null,
					UserLevel: null,
					UserRole: null,
				};
				setLoading(true);
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
						setUsers(queryData);
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
			title: "Name",
			dataIndex: "AdmName",
			key: "AdmName",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Email",
			dataIndex: "AdmEmail",
			key: "AdmEmail",
			onCell: () => ({
				className: "font-primary",
			}),
		},
		{
			title: "Username",
			dataIndex: "AdmUname",
			key: "AdmUname",
			onCell: () => ({
				className: "font-primary",
			}),
		},
		{
			title: "Role",
			dataIndex: "AdmRole",
			key: "AdmRole",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "User Level",
			dataIndex: "AdmLevel",
			key: "AdmLevel",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Actions",
			key: "actions",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
			render: (_, users) => (
				<Space>
					<Button
						icon={<EditOutlined />}
						className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
						onClick={() => openEditModal(users)}
					/>
					<Button
						icon={<DeleteOutlined />}
						className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
						onClick={() => openDeleteModal(users)}
					/>
				</Space>
			),
		},
	];
	const handleAddUser = async () => {
		try {
			// Prepare formData to send in the API request
			const formDataToSend = {
				AddNew: "Y", // Assuming you're adding a new user
				AdmName: formData.name,
				AdmEmail: formData.email,
				AdmUname: formData.username,
				AdmPassword: formData.password,
				AdmRole: formData.role,
				AdmLevel: formData.userlevel,
				AdmImage: formData.image,
				CreateBy: "Admin",
			};

			// Make the API call using Axios
			const response = await Axios.get(
				`http://localhost:3000/api/Admin/AdminSimpan`,
				{
					params: formDataToSend, // Send data as URL params
				}
			);

			// Check if the response is successful
			if (response.status === 200) {
				console.log("User added successfully:", response.data);
				setUsers([...users, formData]);
				setIsModalAddOpen(false);
				Axios.get(`http://localhost:3000/api/Admin/AdminCarian`).then((res) => {
					setUsers(res.data);
				});
				setFormData({
					name: "",
					email: "",
					username: "",
					password: "",
					role: "Admin",
					userlevel: "Level 1",
					image: null,
				});
			} else {
				throw new Error("Failed to add user");
			}
		} catch (error) {
			console.error("Error adding user:", error);
			// Handle error appropriately (e.g., show an error message to the user)
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageUpload = (file) => {
		if (file && file instanceof Blob) {
			const reader = new FileReader();
			reader.onloadend = () => {
				console.log("reader.result", reader.result);
				setFormData((prev) => ({ ...prev, image: reader.result }));
			};
			reader.readAsDataURL(file); // Convert the file to base64
		}
		return false;
	};

	const handleEditUser = async () => {
		try {
			// Prepare formData to send in the API request
			const formDataToSend = {
				AddNew: "N", // Assuming you're editing an existing user, so AddNew is set to "N"
				AdmName: formData.name,
				AdmEmail: formData.email,
				AdmUname: formData.username,
				AdmPassword: formData.password,
				AdmRole: formData.role,
				AdmLevel: formData.userlevel,
				AdmImage: formData.image,
				CreateBy: "Admin", // You might want to set a real user or keep it static
			};

			// Make the API call using Axios
			const response = await Axios.get(
				`http://localhost:3000/api/Admin/AdminSimpan`,
				{
					params: formDataToSend, // Send data as URL params
				}
			);

			// Check if the response is successful
			if (response.status === 200) {
				console.log("User updated successfully:", response.data);
				// Update the user list
				const updatedUsers = users.map((user) =>
					user.email === editingUser.email ? formData : user
				);
				setUsers(updatedUsers);

				// Close the modal and reset the form
				setIsModalEditOpen(false);
				setEditingUser(null);
				setFormData({
					name: "",
					email: "",
					username: "",
					password: "",
					role: "Admin",
					userlevel: "Level 1",
					image: null,
				});

				// Optionally, fetch updated user list again
				Axios.get(`http://localhost:3000/api/Admin/AdminCarian`).then((res) => {
					setUsers(res.data);
				});
			} else {
				throw new Error("Failed to update user");
			}
		} catch (error) {
			console.error("Error updating user:", error);
			// Handle error appropriately (e.g., show an error message to the user)
		}
	};
	const handleDeleteUser = async () => {
		try {
			// Make the API call using Axios to call the SP_Admin_Hapus stored procedure
			const response = await Axios.get(
				`http://localhost:3000/api/Admin/AdminHapus`,
				{
					params: {
						AdmUname: editingUser.AdmUname,
					},
				}
			);

			// Check if the response is successful
			if (response.status === 200) {
				console.log("User deleted successfully:", response.data);

				// Update the users list after deletion
				const updatedUsers = users.filter(
					(user) => user.email !== editingUser.email
				);
				setUsers(updatedUsers);

				// Close the modal and reset the editing user state
				setIsModalDeleteOpen(false);
				setEditingUser(null);
				// Optionally, fetch updated user list again
				Axios.get(`http://localhost:3000/api/Admin/AdminCarian`).then((res) => {
					setUsers(res.data);
				});
			} else {
				throw new Error("Failed to delete user");
			}
		} catch (error) {
			console.error("Error deleting user:", error);
			// Handle error appropriately (e.g., show an error message to the user)
		}
	};

	const openEditModal = (user) => {
		setEditingUser(user);
		setFormData({
			name: user.AdmName,
			email: user.AdmEmail,
			username: user.AdmUname,
			password: user.AdmPassword,
			role: user.AdmRole,
			userlevel: user.AdmLevel,
			image: user.AdmImage || null,
		});
		setIsModalEditOpen(true);
	};

	const openDeleteModal = (user) => {
		setEditingUser(user);
		setIsModalDeleteOpen(true);
	};

	return (
		<AdminLayout>
			<div className="px-4">
				<div className="flex justify-between items-center mb-4 border-b border-gray-200 p-4">
					<h1 className="text-3xl font-regular">Senarai Admin</h1>
					<button
						onClick={() => setIsModalAddOpen(true)}
						className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
					>
						<IoMdAdd />
						Add User
					</button>
				</div>

				<Table
					loading={loading}
					columns={columns}
					dataSource={users}
					rowKey={(record) => record.AdmId}
				/>
			</div>

			{/* Add User Modal */}
			<Modal
				title="Add New User"
				open={isModalAddOpen}
				onCancel={() => {
					setIsModalAddOpen(false);
					setFormData({
						name: "",
						email: "",
						username: "",
						password: "",
						role: "Admin",
						userlevel: "Level 1",
						image: null,
					});
				}}
				onOk={handleAddUser}
				className="rounded-lg"
			>
				{/* Image Upload Section */}
				<div className="flex flex-col items-center mb-4">
					<img
						src={formData.image ? formData.image : "/Placeholder1.png"}
						alt="User Image"
						className="w-24 h-24 rounded-full object-cover mb-4"
					/>
					<Upload
						listType="picture"
						beforeUpload={() => false} // Disable auto upload
						onChange={handleImageUpload}
						className="w-full flex justify-center"
					>
						<Button icon={<UploadOutlined />} className="w-full">
							Upload Image
						</Button>
					</Upload>
				</div>

				{/* User Details Form */}
				<div className="grid grid-cols-2 gap-4">
					<Input
						placeholder="Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="col-span-2 mb-3"
					/>
					<Input
						placeholder="Email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="mb-3"
					/>
					<Input
						placeholder="Username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						className="mb-3"
					/>
					<Input.Password
						placeholder="Password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="mb-3"
					/>
					<Input.Password
						placeholder="Re-enter Password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="mb-3"
					/>
					<Select
						defaultValue={formData.role}
						className="w-full mb-3"
						onChange={(value) =>
							setFormData((prev) => ({ ...prev, role: value }))
						}
					>
						<Option value="Admin">Admin</Option>
						<Option value="Agent">Agent</Option>
						<Option value="Customer">Customer</Option>
					</Select>
					<Select
						defaultValue={formData.userlevel}
						className="w-full mb-3"
						onChange={(value) =>
							setFormData((prev) => ({ ...prev, userlevel: value }))
						}
					>
						<Option value="1">Level 1</Option>
						<Option value="2">Level 2</Option>
						<Option value="3">Level 3</Option>
					</Select>
				</div>
			</Modal>

			{/* Edit User Modal */}
			<Modal
				title="Edit User"
				open={isModalEditOpen}
				onCancel={() => {
					setIsModalEditOpen(false);
					setFormData({
						name: "",
						email: "",
						username: "",
						password: "",
						role: "Admin",
						userlevel: "Level 1",
						image: null,
					});
				}}
				onOk={handleEditUser}
			>
				<div className="grid grid-cols-2 gap-4">
					<Input
						placeholder="Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="col-span-2 mb-3"
					/>
					<Input
						placeholder="Email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="mb-3"
					/>
					<Input
						placeholder="Username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						className="mb-3"
					/>
					<Input.Password
						placeholder="Password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="mb-3"
					/>
					<Input.Password
						placeholder="Re-enter Password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="mb-3"
					/>
					<Select
						defaultValue={formData.role}
						className="w-full mb-3"
						onChange={(value) =>
							setFormData((prev) => ({ ...prev, role: value }))
						}
					>
						<Option value="Admin">Admin</Option>
						<Option value="Agent">Agent</Option>
						<Option value="Customer">Customer</Option>
					</Select>
					<Select
						defaultValue={formData.userlevel}
						className="w-full mb-3"
						onChange={(value) =>
							setFormData((prev) => ({ ...prev, userlevel: value }))
						}
					>
						<Option value="1">Level 1</Option>
						<Option value="2">Level 2</Option>
						<Option value="3">Level 3</Option>
					</Select>
				</div>
			</Modal>

			{/* Delete User Modal */}
			<Modal
				title="Confirm Delete"
				open={isModalDeleteOpen}
				onCancel={() => setIsModalDeleteOpen(false)}
				onOk={handleDeleteUser}
				okButtonProps={{ danger: true }}
			>
				<p>Are you sure you want to delete this user?</p>
			</Modal>
		</AdminLayout>
	);
};

export default AdminPage;
