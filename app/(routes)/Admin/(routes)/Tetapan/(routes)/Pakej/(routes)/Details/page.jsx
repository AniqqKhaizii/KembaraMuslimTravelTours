"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AdminLayout from "../../../../../../layout/AdminLayout";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const Details = () => {
	const router = useRouter();
	const [form] = Form.useForm();
	const searchParams = useSearchParams();
	const id = searchParams.get("id"); // Get the package ID from URL
	const [loading, setLoading] = useState(false);
	const [packageData, setPackageData] = useState(null);

	// Fetch package details on component mount
	useEffect(() => {
		if (!id) {
			message.error("No package ID found in URL");
			router.push("/admin/packages");
			return;
		}

		const fetchPackageDetails = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(
					`/api/Tetapan/ManagePackage?Operation=SEARCH&TripUnique=Y&PakejID=${id}`
				); // Replace with your API endpoint
				setPackageData(data);
				form.setFieldsValue({
					packageName: data.packageName,
					itinerary: data.itinerary,
					startDate: data.startDate ? dayjs(data.startDate) : null,
					endDate: data.endDate ? dayjs(data.endDate) : null,
					hotel: data.hotel,
					price: data.price,
				});
			} catch (error) {
				message.error("Failed to fetch package details");
			} finally {
				setLoading(false);
			}
		};

		fetchPackageDetails();
	}, [id]);

	const handleUpdatePackage = async (values) => {
		try {
			setLoading(true);
			await axios.put(`/api/packages/${id}`, values); // Replace with your API endpoint
			message.success("Package details updated successfully");
			router.push("/admin/packages");
		} catch (error) {
			message.error("Failed to update package details");
		} finally {
			setLoading(false);
		}
	};

	if (!packageData) {
		return <div>Loading...</div>;
	}

	return (
		<AdminLayout>
			<div className="p-6 bg-white rounded-md shadow-md">
				<h2>Update Package Details</h2>
				<Form
					form={form}
					layout="vertical"
					onFinish={handleUpdatePackage}
					initialValues={packageData}
				>
					<Form.Item
						name="packageName"
						label="Package Name"
						rules={[
							{ required: true, message: "Please enter the package name" },
						]}
					>
						<Input placeholder="Enter package name" />
					</Form.Item>

					<Form.Item
						name="itinerary"
						label="Itinerary"
						rules={[{ required: true, message: "Please enter the itinerary" }]}
					>
						<TextArea rows={3} placeholder="Enter itinerary details" />
					</Form.Item>

					<Form.Item
						name="startDate"
						label="Start Date"
						rules={[
							{ required: true, message: "Please select the start date" },
						]}
					>
						<DatePicker style={{ width: "100%" }} />
					</Form.Item>

					<Form.Item
						name="endDate"
						label="End Date"
						rules={[{ required: true, message: "Please select the end date" }]}
					>
						<DatePicker style={{ width: "100%" }} />
					</Form.Item>

					<Form.Item
						name="hotel"
						label="Hotel"
						rules={[{ required: true, message: "Please select the hotel" }]}
					>
						<Select placeholder="Select a hotel">
							<Option value="Hotel 1">Hotel 1</Option>
							<Option value="Hotel 2">Hotel 2</Option>
							<Option value="Hotel 3">Hotel 3</Option>
						</Select>
					</Form.Item>

					<Form.Item
						name="price"
						label="Price (RM)"
						rules={[{ required: true, message: "Please enter the price" }]}
					>
						<Input placeholder="Enter price" />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loading} block>
							Update Package
						</Button>
					</Form.Item>
				</Form>
			</div>
		</AdminLayout>
	);
};

export default Details;
