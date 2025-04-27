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
	const [updatedHotel, setUpdatedHotel] = useState({});
	const [newImages, setNewImages] = useState({});
	const [loading, setLoading] = useState(true);
	const [editMode, setEditMode] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchHotelDetails = async () => {
			if (!HotelID) {
				setError("Invalid HotelID");
				setLoading(false);
				return;
			}
			try {
				const response = await Axios.get("/api/Tetapan/ManageHotel", {
					params: {
						Operation: "SEARCH",
						HotelID: parseInt(HotelID),
					},
				});
				const hotelData = response.data[0];
				setHotel(hotelData);
				setUpdatedHotel(hotelData);
			} catch (err) {
				console.error(err);
				setError("Failed to load hotel details");
			} finally {
				setLoading(false);
			}
		};
		fetchHotelDetails();
	}, [HotelID]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUpdatedHotel((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageUpload = (e, imageKey) => {
		const file = e.target.files[0];
		setNewImages((prev) => ({ ...prev, [imageKey]: file }));
	};

	// Handle hotel details update
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
			await Axios.post("/api/Tetapan/ManageHotel", formData, {
				params: { Operation: "UPDATE" },
				headers: { "Content-Type": "multipart/form-data" },
			});
			alert("Hotel details updated successfully!");
			setEditMode(false); // Exit edit mode after successful update
		} catch (err) {
			console.error(err);
			alert("Failed to update hotel details");
		}
	};

	console.log("newImages", newImages);
	// Render the component
	return (
		<AdminLayout>
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-6 text-gray-800">Hotel Details</h1>

				<div className="grid grid-cols-3 bg-white border rounded-md p-6 gap-12">
					{/* Hotel Details Section */}
					<div>
						<h2 className="text-xl font-semibold text-gray-900 mb-4">
							{hotel?.HotelName}
						</h2>
						<div className="space-y-4">
							{Object.keys(hotel || {}).map(
								(key) =>
									!["HotelID", "Image", "CreatedDate", "UpdatedDate"].some(
										(exclude) => key.includes(exclude)
									) && (
										<div key={key} className="flex justify-between mb-4">
											<label className="text-sm font-medium text-gray-600">
												{key}
											</label>
											{editMode ? (
												<input
													type="text"
													name={key}
													value={updatedHotel[key] || ""}
													onChange={handleInputChange}
													className="w-2/3 p-2 border rounded-md"
												/>
											) : (
												<div className="text-gray-700">
													{key === "Stars" ? (
														<>
															{Array.from({ length: hotel[key] || 0 }).map(
																(_, index) => (
																	<span key={index} className="text-yellow-500">
																		⭐
																	</span>
																)
															)}
														</>
													) : key === "Distance" ? (
														<span>{hotel[key]} m</span>
													) : (
														<p>{hotel[key] || "N/A"}</p>
													)}
												</div>
											)}
										</div>
									)
							)}
						</div>
					</div>

					{/* Hotel Images Section */}
					<div className="col-span-2">
						<h3 className="text-lg font-semibold text-gray-100 bg-orange-600 p-2 mb-4">
							Hotel Images
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
								<div key={index} className="relative">
									{hotel?.[imgKey] || newImages[imgKey] ? (
										<img
											src={newImages[imgKey] || hotel[imgKey]}
											alt={`Hotel Image ${index + 1}`}
											className="w-full h-32 object-cover rounded-md"
										/>
									) : (
										<button
											onClick={() =>
												document.getElementById(`upload-${imgKey}`).click()
											}
											className="w-full h-32 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 p-4 rounded-md flex items-center justify-center text-gray-500 hover:text-gray-700"
										>
											<BsPlusCircleFill className="text-3xl" />
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

					{/* Edit and Save Buttons Section */}
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
