"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Axios from "axios";
import AdminLayout from "../../../../../../layout/AdminLayout";
import { BsPlusCircleFill } from "react-icons/bs";
import { Button, Input } from "antd";
import SpinnerCircleDemo from "@/components/spinner-02";
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
			setLoading(true);
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

				const imageFields = [
					"Image1",
					"Image2",
					"Image3",
					"Image4",
					"Image5",
					"Image6",
					"Image7",
					"Image8",
				];

				const base64Images = {};

				imageFields.forEach((imgKey) => {
					const imageData = hotelData?.[imgKey];
					if (imageData && Array.isArray(imageData.data)) {
						const base64String = Buffer.from(imageData.data).toString("base64");
						base64Images[imgKey] = `data:image/jpeg;base64,${base64String}`;
					} else if (
						typeof imageData === "string" &&
						imageData.startsWith("data:image/")
					) {
						base64Images[imgKey] = imageData;
					}
				});
				setNewImages(base64Images);
			} catch (err) {
				console.error(err);
				setError("Failed to load hotel details");
			} finally {
				setLoading(false);
			}
		};

		fetchHotelDetails();
	}, [HotelID]); // Dependency on HotelID so it triggers the effect when it changes

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUpdatedHotel((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageUpload = (e, imageKey) => {
		setEditMode(true);
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.onloadend = () => {
			setNewImages((prev) => ({ ...prev, [imageKey]: reader.result }));
		};
		if (file) {
			reader.readAsDataURL(file); // This will generate a Base64 string
		}
	};
	const handleUpdate = async () => {
		setLoading(true);

		const processedImages = {};

		Object.entries(newImages).forEach(([key, value]) => {
			if (
				value &&
				typeof value === "string" &&
				value.startsWith("data:image")
			) {
				processedImages[key] = value.split(",")[1];
			}
		});

		const payload = {
			Operation: "UPDATE",
			...updatedHotel,
			...processedImages,
		};

		try {
			const response = await Axios.post("/api/Tetapan/ManageHotel", payload, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 200) {
				alert("Hotel details updated successfully!");
				setEditMode(false);
				setHotel(updatedHotel);
			} else {
				throw new Error("Server responded with an unexpected status.");
			}
		} catch (err) {
			console.error("Update error:", err);
			alert("Failed to update hotel details.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AdminLayout>
			<div className="p-6">
				<h1 className="text-3xl mb-4 text-white">Hotel Details</h1>
				{loading ? (
					<div className="flex items-center justify-center h-[80vh] text-white">
						<SpinnerCircleDemo />
					</div>
				) : (
					<div className="grid grid-cols-3 rounded-lg p-6 gap-12">
						{/* Hotel Details Section */}
						<div className="bg-white/20 border py-4 px-8 rounded-lg shadow-xl">
							<h2 className="text-xl font-semibold text-white mb-4 pb-2 text-center border-b">
								{hotel?.HotelName}
							</h2>
							<div className="space-y-8">
								{Object.keys(hotel || {}).map(
									(key) =>
										!["HotelID", "Image", "CreatedDate", "UpdatedDate"].some(
											(exclude) => key.includes(exclude)
										) && (
											<div
												key={key}
												className="flex items-start justify-between mb-4"
											>
												<label className="text-md font-regular text-gray-100">
													{key}
												</label>
												{editMode ? (
													<Input
														type="text"
														name={key}
														value={updatedHotel[key] || ""}
														onChange={handleInputChange}
														className="w-2/3 glass-input text-white"
														rootClassName="glass-input-wrapper"
													/>
												) : (
													<div className="text-gray-200 text-right w-2/3">
														{key === "Stars" ? (
															<>
																{Array.from({ length: hotel[key] || 0 }).map(
																	(_, index) => (
																		<span
																			key={index}
																			className="text-yellow-500"
																		>
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
							<h3 className="text-lg font-semibold text-gray-100 bg-white/10 py-2 px-4 border shadow-xl mb-4 rounded-lg">
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
										{newImages[imgKey] ? (
											<img
												src={newImages[imgKey]}
												alt={`Hotel Image ${index + 1}`}
												className="w-full h-40 object-cover rounded-md"
											/>
										) : hotel?.imgKey ? (
											<img
												src={hotel.imgKey}
												alt={`Hotel Image ${index + 1}`}
												className="w-full h-40 object-cover rounded-md"
											/>
										) : (
											<Button
												type="button"
												onClick={() =>
													document.getElementById(`upload-${imgKey}`).click()
												}
												className="w-full h-40 bg-gray-100/10 p-4 rounded-lg shadow-xl flex items-center justify-center text-white hover:text-gray-300"
											>
												<BsPlusCircleFill className="text-3xl" />
												<input
													id={`upload-${imgKey}`}
													type="file"
													accept="image/*"
													onChange={(e) => handleImageUpload(e, imgKey)}
													className="hidden"
												/>
											</Button>
										)}
									</div>
								))}
							</div>
						</div>

						{/* Edit and Save Buttons Section */}
						<div className="flex justify-between mx-1 col-span-3">
							{!editMode ? (
								<Button
									onClick={() => setEditMode(true)}
									className="px-6 py-2 bg-blue-200/10 text-white rounded-3xl shadow hover:bg-blue-700"
								>
									Edit Details
								</Button>
							) : (
								<>
									<Button
										onClick={handleUpdate}
										className="px-6 py-2 bg-green-200/10 text-white rounded-3xl shadow hover:bg-green-700"
									>
										Save Changes
									</Button>
									<Button
										onClick={() => setEditMode(false)}
										className="px-6 py-2 bg-red-200/10 text-white rounded-3xl shadow hover:bg-red-700"
									>
										Cancel
									</Button>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</AdminLayout>
	);
};

export default HotelDetails;
