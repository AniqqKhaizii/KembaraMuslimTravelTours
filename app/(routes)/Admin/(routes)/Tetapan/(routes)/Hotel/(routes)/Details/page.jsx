"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Axios from "axios";
import AdminLayout from "../../../../../../layout/AdminLayout";
import { BsPlusCircleFill } from "react-icons/bs";
const HotelDetails = () => {
	const searchParams = useSearchParams();
	const HotelID = searchParams.get("HotelID");
	const [hotel, setHotel] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [updatedHotel, setUpdatedHotel] = useState({});
	const [newImages, setNewImages] = useState({});
	const [editMode, setEditMode] = useState(false); // Toggle edit mode

	useEffect(() => {
		const fetchHotelDetails = async () => {
			try {
				const response = await Axios.get(
					"http://localhost:3002/api/Tetapan/Hotel/ManageHotel",
					{
						params: {
							Operation: "SEARCH",
							HotelID: parseInt(HotelID),
						},
					}
				);
				setHotel(response.data[0]);
				setUpdatedHotel(response.data[0]);
			} catch (err) {
				console.error(err);
				setError("Failed to load hotel details");
			} finally {
				setLoading(false);
			}
		};

		if (HotelID) {
			fetchHotelDetails();
		} else {
			setError("Invalid HotelID");
			setLoading(false);
		}
	}, [HotelID]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUpdatedHotel((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageUpload = (e, imageKey) => {
		const file = e.target.files[0];
		setNewImages((prev) => ({ ...prev, [imageKey]: file }));
	};

	const handleUpdate = async () => {
		const formData = new FormData();
		formData.append("HotelID", HotelID);
		Object.keys(updatedHotel).forEach((key) => {
			formData.append(key, updatedHotel[key]);
		});
		Object.keys(newImages).forEach((key) => {
			if (newImages[key]) {
				formData.append(key, newImages[key]);
			}
		});

		try {
			await Axios.post(
				"http://localhost:3002/api/Tetapan/Hotel/ManageHotel",
				formData,
				{
					params: {
						Operation: "UPDATE",
					},
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			alert("Hotel details updated successfully!");
			setEditMode(false); // Exit edit mode after successful update
		} catch (err) {
			console.error(err);
			alert("Failed to update hotel details");
		}
	};

	if (loading) return <AdminLayout>Loading...</AdminLayout>;
	if (error) return <AdminLayout>{error}</AdminLayout>;

	return (
		<AdminLayout>
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-6 text-gray-800">Hotel Details</h1>
				<div className="bg-white border rounded-lg shadow-md p-8 space-y-8">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">
							{hotel.HotelName}
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{Object.keys(hotel).map((key) =>
								key.includes("Image") ? null : (
									<div
										key={key}
										className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 px-4 py-6 shadow-lg rounded-md border border-gray-200 backdrop-blur-sm"
									>
										<label className="text-sm font-medium text-white">
											{key}
										</label>
										{editMode ? (
											<input
												type="text"
												name={key}
												value={updatedHotel[key] || ""}
												onChange={handleInputChange}
												className="w-full mt-1 p-2 border rounded-md"
											/>
										) : (
											<p className="text-gray-700">{hotel[key] || "N/A"}</p>
										)}
									</div>
								)
							)}
						</div>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-100 bg-orange-600 p-2 mb-4">
							Hotel Images
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
							{[
								"Image1",
								"Image2",
								"Image3",
								"Image4",
								"Image5",
								"Image6",
								"Image7",
								"Image8",
							].map((imgKey, index) => (
								<div key={index} className="relative space-y-2 group">
									{hotel[imgKey] ? (
										<img
											src={hotel[imgKey]}
											alt={`Hotel Image ${index + 1}`}
											className="w-full h-32 object-cover rounded-lg shadow border"
										/>
									) : (
										<button
											onClick={() =>
												document.getElementById(`upload-${imgKey}`).click()
											}
											className="w-full h-48 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 px-4 py-6 shadow-lg rounded-md border border-gray-200 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-gray-400 transition-all duration-300 hover:bg-gray-200 relative"
										>
											<span className="text-4xl font-bold">
												<BsPlusCircleFill />
											</span>
											<input
												id={`upload-${imgKey}`}
												type="file"
												onChange={(e) => handleImageUpload(e, imgKey)}
												className="hidden"
											/>
										</button>
									)}
								</div>
							))}
						</div>
					</div>

					<div className="flex justify-between">
						{!editMode ? (
							<button
								onClick={() => setEditMode(true)}
								className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
							>
								Edit Details
							</button>
						) : (
							<>
								<button
									onClick={handleUpdate}
									className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
								>
									Save Changes
								</button>
								<button
									onClick={() => setEditMode(false)}
									className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
								>
									Cancel
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default HotelDetails;
