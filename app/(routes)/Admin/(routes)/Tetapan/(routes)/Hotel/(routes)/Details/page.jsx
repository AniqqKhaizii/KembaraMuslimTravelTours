"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Axios from "axios";
import AdminLayout from "../../../../../../layout/AdminLayout";
import { BsPlusCircleFill } from "react-icons/bs";
import { Button, Input } from "antd";
import SpinnerCircleDemo from "@/components/spinner-02";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
const HotelDetails = () => {
	const router = useRouter();
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
	}, [HotelID]);

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
				<div className="flex items-center gap-2 w-full justify-start">
					<Button type="link" onClick={() => router.back()}>
						<ArrowLeftIcon className="text-2xl dark:text-white text-zinc-950" />
					</Button>
					<h1 className="text-3xl dark:text-white text-zinc-950">
						Hotel Details
					</h1>
				</div>
				{loading ? (
					<div className="flex items-center justify-center h-[80vh] dark:text-white text-zinc-950">
						<SpinnerCircleDemo />
					</div>
				) : (
					<div className="grid grid-cols-3 rounded-lg p-6 gap-12">
						<div className="bg-white/20 border py-4 px-8 rounded-lg shadow-xl">
							<h2 className="text-xl font-semibold dark:text-white text-zinc-950 mb-4 text-center">
								{hotel?.HotelName}
							</h2>
							<div className="space-y-8">
								<table className="w-full text-left">
									<tbody>
										{Object.keys(hotel || {}).map((key) => {
											if (
												["HotelID", "Image", "CreatedDate", "UpdatedDate"].some(
													(exclude) => key.includes(exclude)
												)
											) {
												return null;
											}

											return (
												<tr
													key={key}
													className="border-y border-gray-400/30 dark:border-gray-100/30"
												>
													<td
														className="py-5 px-2 text-zinc-950 dark:text-white font-medium w-1/4"
														valign="top"
													>
														{key}
													</td>
													<td
														className="py-5 px-2 text-zinc-950 dark:text-white w-4"
														valign="top"
													>
														:
													</td>
													<td
														className="py-5 px-2 text-zinc-950 dark:text-gray-200 text-right w-2/3"
														valign="top"
													>
														{editMode ? (
															<Input
																type="text"
																name={key}
																value={updatedHotel[key] || ""}
																onChange={handleInputChange}
																className="w-full glass-input dark:text-white text-zinc-950"
																rootClassName="glass-input-wrapper"
															/>
														) : key === "Stars" ? (
															<>
																{Array.from({ length: hotel[key] || 0 }).map(
																	(_, index) => (
																		<span
																			key={index}
																			className="text-yellow-500 drop-shadow"
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
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						{/* Hotel Images Section */}
						<div className="col-span-2">
							<h3 className="text-lg font-semibold dark:text-gray-100 text-zinc-950 bg-white/10 py-2 px-4 border border-gray-100/30  shadow-xl mb-4 rounded-lg">
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
												className="w-full h-40 bg-gray-100/10 p-4 rounded-lg shadow-xl flex items-center justify-center dark:text-white text-zinc-950 dark:hover:text-gray-300 hover:text-zinc-400"
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
									className="px-6 py-2 dark:bg-blue-200/10 bg-green-500 text-white rounded-3xl shadow hover:bg-blue-700"
								>
									Edit Details
								</Button>
							) : (
								<>
									<Button
										onClick={handleUpdate}
										className="px-6 py-2 dark:bg-green-200/10 bg-blue-500 text-white rounded-3xl shadow hover:bg-green-700"
									>
										Save Changes
									</Button>
									<Button
										onClick={() => setEditMode(false)}
										className="px-6 py-2 dark:bg-red-200/10 bg-gray-500 text-white rounded-3xl shadow hover:bg-red-700"
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
