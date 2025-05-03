"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../../../layout/AdminLayout";
import { IoMdAdd } from "react-icons/io";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Button, Table, Modal, Space, Select, Upload, Form } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Option } = Select;
import Axios from "axios";

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
					const response = await Axios.get(`/api/Admin/AdminCarian`, {
						params: params,
					});
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
			className: "font-light font-primary",
			render: (_, __, index) => <span>{index + 1}.</span>,
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Name",
			dataIndex: "AdmName",
			key: "AdmName",
			className: "font-light font-primary",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Email",
			dataIndex: "AdmEmail",
			key: "AdmEmail",
			className: "font-light font-primary",
			onCell: () => ({
				className: "font-primary",
			}),
		},
		{
			title: "Username",
			dataIndex: "AdmUname",
			key: "AdmUname",
			className: "font-light font-primary",
			onCell: () => ({
				className: "font-primary",
			}),
		},
		{
			title: "Role",
			dataIndex: "AdmRole",
			key: "AdmRole",
			className: "font-light font-primary",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "User Level",
			dataIndex: "AdmLevel",
			key: "AdmLevel",
			className: "font-light font-primary",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
		},
		{
			title: "Actions",
			key: "actions",
			className: "font-light font-primary",
			onCell: () => ({
				className: "uppercase font-primary",
			}),
			render: (_, users) => (
				<Space>
					<Button
						icon={<EditOutlined />}
						className="bg-green-500/60 hover:bg-green-600 text-white py-1 px-2 rounded-3xl"
						onClick={() => openEditModal(users)}
					/>
					<Button
						icon={<DeleteOutlined />}
						className="bg-red-500/60 hover:bg-red-600 text-white py-1 px-2 rounded-3xl"
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
				AddNew: "Y",
				AdmName: formData.name,
				AdmEmail: formData.email,
				AdmUname: formData.username,
				AdmPassword: formData.password,
				AdmLevel: formData.userlevel,
				AdmRole: formData.role,
				AdmImage: formData.image,
				CreateBy: userData.AdmUname,
				ModifyBy: null,
			};

			// Make the API call using Axios
			const response = await Axios.post(
				`/api/Admin/AdminSimpan`,
				formDataToSend
			);

			// Check if the response is successful
			if (response.status === 200) {
				console.log("User added successfully:", response.data);
				setUsers([...users, formData]);
				setIsModalAddOpen(false);
				Axios.get(`/api/Admin/AdminCarian`).then((res) => {
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
				CreateBy: null,
				ModifyBy: userData.AdmUname,
			};

			const response = await Axios.post(
				`/api/Admin/AdminSimpan`,
				formDataToSend
			);

			if (response.status === 200) {
				const updatedUsers = users.map((user) =>
					user.email === editingUser.email ? formData : user
				);
				setUsers(updatedUsers);

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

				Axios.get(`/api/Admin/AdminCarian`).then((res) => {
					setUsers(res.data);
				});
			} else {
				throw new Error("Failed to update user");
			}
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	const handleDeleteUser = async () => {
		try {
			// Make the API call using Axios to call the SP_Admin_Hapus stored procedure
			const response = await Axios.get(`/api/Admin/AdminHapus`, {
				params: {
					AdmUname: editingUser.AdmUname,
				},
			});

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
				Axios.get(`/api/Admin/AdminCarian`).then((res) => {
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
				<div className="flex justify-between items-center p-4">
					<h1 className="text-3xl font-regular dark:text-white text-zinc-950">
						Senarai Admin
					</h1>
					<Button
						icon={<PlusOutlined />}
						onClick={() => setIsModalAddOpen(true)}
						className="flex items-center gap-2 bg-blue-200/10 hover:bg-blue-600/70 border border-gray-100/40 dark:text-white text-zinc-950 py-2 px-4 rounded-3xl"
					>
						Add User
					</Button>
				</div>

				<Table
					className="w-full bg-white/10 rounded-lg glass-table"
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
				className="glass-modal"
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
						<Button
							icon={<UploadOutlined />}
							className="w-full bg-transparent dark:text-white text-zinc-950 backdrop-blur"
						>
							Upload Image
						</Button>
					</Upload>
				</div>

				<Form
					layout="vertical"
					onFinish={handleAddUser}
					initialValues={formData}
				>
					<div className="grid grid-cols-2 gap-4">
						<Form.Item
							label={
								<span className="dark:text-white text-zinc-950">Name</span>
							}
							name="name"
							rules={[{ required: true, message: "Please enter your name" }]}
							className="col-span-2 mb-0"
						>
							<Input
								placeholder="Name"
								className="glass-input dark:text-white text-zinc-950"
							/>
						</Form.Item>

						<Form.Item
							label={
								<span className="dark:text-white text-zinc-950">Email</span>
							}
							name="email"
							rules={[
								{ required: true, type: "email", message: "Invalid email" },
							]}
							className="mb-0"
						>
							<Input
								placeholder="Email"
								className="glass-input dark:text-white text-zinc-950"
							/>
						</Form.Item>

						<Form.Item
							label={
								<span className="dark:text-white text-zinc-950">Username</span>
							}
							name="username"
							rules={[{ required: true, message: "Please enter a username" }]}
							className="mb-0"
						>
							<Input
								placeholder="Username"
								className="glass-input dark:text-white text-zinc-950"
							/>
						</Form.Item>

						<Form.Item
							label={
								<span className="dark:text-white text-zinc-950">Password</span>
							}
							name="password"
							rules={[{ required: true, message: "Please enter a password" }]}
							className="mb-0"
						>
							<Input.Password placeholder="Password" className="glass-input" />
						</Form.Item>

						<Form.Item
							label={
								<span className="dark:text-white text-zinc-950">
									Confirm Password
								</span>
							}
							name="confirmPassword"
							dependencies={["password"]}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Please confirm your password",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("Passwords do not match"));
									},
								}),
							]}
							className="mb-0"
						>
							<Input.Password
								placeholder="Re-enter Password"
								className="glass-input"
							/>
						</Form.Item>

						<Form.Item
							label={
								<span className="dark:text-white text-zinc-950">Role</span>
							}
							name="role"
							className="mb-0"
						>
							<Select
								className="glass-select w-full"
								popupClassName="glass-select-dropdown"
							>
								<Option value="Admin">Admin</Option>
								<Option value="Agent">Agent</Option>
								<Option value="Customer">Customer</Option>
							</Select>
						</Form.Item>

						<Form.Item
							label={
								<span className="dark:text-white text-zinc-950">
									User Level
								</span>
							}
							name="userlevel"
							className="mb-0"
						>
							<Select
								className="glass-select w-full"
								popupClassName="glass-select-dropdown"
							>
								<Option value="1">Level 1</Option>
								<Option value="2">Level 2</Option>
								<Option value="3">Level 3</Option>
							</Select>
						</Form.Item>
					</div>

					<Form.Item className="mt-8">
						<Button
							type="submit"
							className="w-full bg-blue-500 dark:text-white text-zinc-950 hover:bg-blue-700"
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
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
				className="glass-modal"
			>
				<div className="grid grid-cols-2 gap-4">
					{/* Image Upload Section */}
					<div className="col-span-2 flex flex-col items-center mb-4">
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
							<Button
								icon={<UploadOutlined />}
								className="w-full bg-transparent dark:text-white text-zinc-950 backdrop-blur"
							>
								Upload Image
							</Button>
						</Upload>
					</div>
					<Input
						placeholder="Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="col-span-2 mb-3 glass-input dark:text-white text-zinc-950"
						rootClassName="glass-input-wrapper"
					/>
					<Input
						placeholder="Email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="mb-3 glass-input dark:text-white text-zinc-950"
						rootClassName="glass-input-wrapper"
					/>
					<Input
						placeholder="Username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						className="mb-3 glass-input dark:text-white text-zinc-950"
						rootClassName="glass-input-wrapper"
					/>
					<Input.Password
						placeholder="Password"
						name="password"
						onChange={handleChange}
						className="mb-3 glass-input dark:text-white text-zinc-950"
						rootClassName="glass-input-wrapper"
						required
					/>
					<div className="relative">
						<Input.Password
							placeholder="Re-enter Password"
							name="confirmPassword"
							onChange={handleChange}
							className="mb-3 glass-input"
							rootClassName="glass-input-wrapper"
							required
						/>
						{formData.password &&
							formData.confirmPassword &&
							formData.password !== formData.confirmPassword && (
								<p className="absolute -bottom-2 left-2 text-red-500 text-sm">
									Passwords do not match
								</p>
							)}
					</div>
					<Select
						defaultValue={formData.role}
						className="glass-select w-full mb-3"
						popupClassName="glass-select-dropdown"
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
						className="glass-select w-full mb-3"
						popupClassName="glass-select-dropdown"
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
				className="glass-modal"
			>
				<p>Are you sure you want to delete this user?</p>
			</Modal>
		</AdminLayout>
	);
};

export default AdminPage;
