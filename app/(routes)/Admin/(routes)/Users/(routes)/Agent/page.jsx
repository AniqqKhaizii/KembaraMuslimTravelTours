"use client";
import React, { useState } from "react";
import AdminLayout from "../../../../layout/AdminLayout";
import { IoMdAdd } from "react-icons/io";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Input, Select, Upload, Table } from "antd";
import { FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AgentPage = () => {
	const [isModalAddOpen, setIsModalAddOpen] = useState(false);
	const [isModalEditOpen, setIsModalEditOpen] = useState(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
		role: "Agent",
		userlevel: "Level 1",
		image: null,
	});
	const [agents, setAgents] = useState([]);
	const [editingAgent, setEditingAgent] = useState(null);

	const { Option } = Select;

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle file upload (image upload)
	const handleImageUpload = (info) => {
		if (info.file.status === "done") {
			setFormData((prev) => ({ ...prev, image: info.file.name }));
		}
	};

	// Add Agent Handler
	const handleAddAgent = () => {
		setAgents([...agents, formData]);
		setIsModalAddOpen(false);
		setFormData({
			name: "",
			email: "",
			username: "",
			password: "",
			role: "Agent",
			userlevel: "Level 1",
			image: null,
		});
	};

	// Edit Agent Handler
	const handleEditAgent = () => {
		const updatedAgents = agents.map((agent) =>
			agent.email === editingAgent.email ? formData : agent
		);
		setAgents(updatedAgents);
		setIsModalEditOpen(false);
		setEditingAgent(null);
		setFormData({
			name: "",
			email: "",
			username: "",
			password: "",
			role: "Agent",
			userlevel: "Level 1",
			image: null,
		});
	};

	// Delete Agent Handler
	const handleDeleteAgent = () => {
		const updatedAgents = agents.filter(
			(agent) => agent.email !== editingAgent.email
		);
		setAgents(updatedAgents);
		setIsModalDeleteOpen(false);
		setEditingAgent(null);
	};

	// Open Edit Modal with selected agent data
	const openEditModal = (agent) => {
		setEditingAgent(agent);
		setFormData(agent);
		setIsModalEditOpen(true);
	};

	// Open Delete Modal with selected agent data
	const openDeleteModal = (agent) => {
		setEditingAgent(agent);
		setIsModalDeleteOpen(true);
	};

	const columns = [
		{
			title: "No",
			key: "no",
			render: (_, __, index) => index + 1,
		},
		{
			title: "Logo Agensi",
			key: "logo",
			render: (_, agent, index) => (
				<img
					src={`https://randomuser.me/api/portraits/men/${index + 20}.jpg`}
					alt="Agent Image"
					className="w-10 h-10 rounded-full object-cover"
				/>
			),
		},
		{
			title: "Nama Agensi",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email Agensi",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Username",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "User Level",
			dataIndex: "userlevel",
			key: "userlevel",
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, agent) => (
				<div className="flex justify-start items-center gap-2">
					<button
						className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
						onClick={() => openEditModal(agent)}
					>
						Edit
					</button>
					<button
						className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
						onClick={() => openDeleteModal(agent)}
					>
						Delete
					</button>
				</div>
			),
		},
	];

	return (
		<AdminLayout>
			<div className="flex flex-col gap-4 p-4">
				<div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-4">
					<div className="flex justify-center">
						<div className="flex justify-center items-center w-1/4 bg-gradient-to-br from-blue-700 to-blue-500 p-6 rounded-s-xl border border-blue-100 shadow-lg">
							<span className="text-6xl text-white">
								<FaUsers />
							</span>
						</div>
						<div className="bg-gradient-to-br from-gray-200 to-white w-3/4 p-6 rounded-e-xl border border-blue-100 shadow-lg">
							<div>
								<h1 className="text-xl font-semibold text-gray-700">
									Jumlah Agent
								</h1>
								<h1 className="text-3xl font-bold text-gray-800">100</h1>
							</div>
						</div>
					</div>

					<div className="flex justify-center">
						<div className="flex justify-center items-center w-1/4  bg-gradient-to-br from-green-700 to-green-500 p-6 rounded-s-xl border border-green-100 shadow-lg">
							<span className="text-6xl text-white">
								<FaCheckCircle />
							</span>
						</div>
						<div className="bg-gradient-to-br from-gray-200 to-white w-3/4 p-6 rounded-e-xl border border-green-100 shadow-lg">
							<div>
								<h1 className="text-xl font-semibold text-gray-700">
									Jumlah Agent Aktif
								</h1>
								<h1 className="text-3xl font-bold text-gray-800">90</h1>
							</div>
						</div>
					</div>

					<div className="flex justify-center">
						<div className="flex justify-center items-center w-1/4 bg-gradient-to-br from-red-700 to-red-500 p-6 rounded-s-xl border border-red-100 shadow-lg">
							<span className="text-6xl text-white">
								<FaTimesCircle />
							</span>
						</div>
						<div className="bg-gradient-to-br from-gray-200 to-white w-3/4 p-6 rounded-e-xl border border-red-100 shadow-lg">
							<div>
								<h1 className="text-xl font-semibold text-gray-700">
									Jumlah Agent Tidak Aktif
								</h1>
								<h1 className="text-3xl font-bold text-gray-800">10</h1>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center mb-4 border-b border-gray-200 p-4">
					<h1 className="text-3xl font-regular">Senarai Agent</h1>
					<button
						onClick={() => setIsModalAddOpen(true)}
						className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
					>
						<IoMdAdd />
						Register Agent
					</button>
				</div>
				<Table columns={columns} dataSource={agents} rowKey="email" />
			</div>

			{/* Add Agent Modal */}
			<Modal
				title="Register New Agent"
				open={isModalAddOpen}
				onCancel={() => setIsModalAddOpen(false)}
				onOk={handleAddAgent}
				className="rounded-lg"
			>
				{/* Image Upload Section */}
				<div className="flex flex-col items-center mb-4">
					<img
						src={
							formData.image
								? `/path/to/images/${formData.image}`
								: "/path/to/default-image.jpg"
						}
						alt="Agent Image"
						className="w-24 h-24 rounded-full object-cover mb-4"
					/>
					<Upload
						listType="picture"
						beforeUpload={() => false}
						onChange={handleImageUpload}
						className="w-full flex justify-center"
					>
						<Button icon={<UploadOutlined />}>Upload Image</Button>
					</Upload>
				</div>

				{/* Form Inputs */}
				<Input
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Agent Name"
					className="mb-4"
				/>
				<Input
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="Agent Email"
					className="mb-4"
				/>
				<Input
					name="username"
					value={formData.username}
					onChange={handleChange}
					placeholder="Agent Username"
					className="mb-4"
				/>
				<Input.Password
					name="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Password"
					className="mb-4"
				/>
				<Select
					name="role"
					value={formData.role}
					onChange={(value) =>
						setFormData((prev) => ({ ...prev, role: value }))
					}
					className="mb-4 w-full"
				>
					<Option value="Agent">Agent</Option>
					<Option value="Admin">Admin</Option>
				</Select>
				<Select
					name="userlevel"
					value={formData.userlevel}
					onChange={(value) =>
						setFormData((prev) => ({ ...prev, userlevel: value }))
					}
					className="mb-4 w-full"
				>
					<Option value="Level 1">Level 1</Option>
					<Option value="Level 2">Level 2</Option>
				</Select>
			</Modal>

			{/* Edit Agent Modal */}
			<Modal
				title="Edit Agent"
				open={isModalEditOpen}
				onCancel={() => setIsModalEditOpen(false)}
				onOk={handleEditAgent}
				className="rounded-lg"
			>
				{/* Image Upload Section */}
				<div className="flex flex-col items-center mb-4">
					<img
						src={
							formData.image
								? `/path/to/images/${formData.image}`
								: "/path/to/default-image.jpg"
						}
						alt="Agent Image"
						className="w-24 h-24 rounded-full object-cover mb-4"
					/>
					<Upload
						listType="picture"
						beforeUpload={() => false}
						onChange={handleImageUpload}
						className="w-full flex justify-center"
					>
						<Button icon={<UploadOutlined />}>Upload Image</Button>
					</Upload>
				</div>

				{/* Form Inputs */}
				<Input
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Agent Name"
					className="mb-4"
				/>
				<Input
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="Agent Email"
					className="mb-4"
				/>
				<Input
					name="username"
					value={formData.username}
					onChange={handleChange}
					placeholder="Agent Username"
					className="mb-4"
				/>
				<Input.Password
					name="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Password"
					className="mb-4"
				/>
				<Select
					name="role"
					value={formData.role}
					onChange={(value) =>
						setFormData((prev) => ({ ...prev, role: value }))
					}
					className="mb-4 w-full"
				>
					<Option value="Agent">Agent</Option>
					<Option value="Admin">Admin</Option>
				</Select>
				<Select
					name="userlevel"
					value={formData.userlevel}
					onChange={(value) =>
						setFormData((prev) => ({ ...prev, userlevel: value }))
					}
					className="mb-4 w-full"
				>
					<Option value="Level 1">Level 1</Option>
					<Option value="Level 2">Level 2</Option>
				</Select>
			</Modal>

			{/* Delete Agent Modal */}
			<Modal
				title="Delete Agent"
				open={isModalDeleteOpen}
				onCancel={() => setIsModalDeleteOpen(false)}
				onOk={handleDeleteAgent}
				className="rounded-lg"
			>
				<p>Are you sure you want to delete this agent?</p>
			</Modal>
		</AdminLayout>
	);
};

export default AgentPage;
