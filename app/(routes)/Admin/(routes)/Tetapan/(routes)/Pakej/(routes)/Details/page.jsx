"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, message, Table } from "antd";
import AdminLayout from "../../../../../../layout/AdminLayout";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

const Details = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const [loading, setLoading] = useState(false);
	const [packageData, setPackageData] = useState(null);
	const [updatedPoster, setUpdatedPoster] = useState(null);
	const [tripDetails, setTripDetails] = useState([]);

	const handleBack = () => {
		router.back();
	};

	useEffect(() => {
		if (!id) {
			message.error("No package ID found in URL");
			router.push("/admin/packages");
			return;
		}

		const fetchPackageDetails = async () => {
			try {
				setLoading(true);

				// Fetch package details
				const { data } = await axios.get(
					`/api/Tetapan/ManagePackage?Operation=SEARCH&TripUnique=Y&PakejID=${id}`
				);
				setPackageData(data);
				if (data[0].PakejPoster && Array.isArray(data[0].PakejPoster.data)) {
					// Convert the byte array to Base64 string
					const base64String = Buffer.from(data[0].PakejPoster.data).toString(
						"base64"
					);
					data[0].PakejPoster = `data:image/jpeg;base64,${base64String}`;
					setUpdatedPoster(data[0].PakejPoster);
				} else if (
					typeof data[0].PakejPoster === "string" &&
					data[0].PakejPoster.startsWith("data:image/jpeg;base64,")
				) {
					setUpdatedPoster(data[0].PakejPoster);
				}

				const tripIds = data[0].TripID.split(",").map((id) => id.trim());

				// Initialize an empty array to store trip details
				const tripDetailsArray = [];

				for (const tripId of tripIds) {
					const tripResponse = await axios.get(
						`/api/Tetapan/ManageTrip?Operation=SEARCH&TripID=${tripId}`
					);
					tripDetailsArray.push(...tripResponse.data);
				}
				setTripDetails(tripDetailsArray);
			} catch (error) {
				message.error("Failed to fetch package details");
			} finally {
				setLoading(false);
			}
		};

		fetchPackageDetails();
	}, [id]);

	const handlePosterChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setUpdatedPoster(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const airlineLogos = {
		Emirates: "/flight/Emirates.svg",
		AirAsia: "/flight/AirAsia.svg",
	};

	const tripColumns = [
		{
			title: "#",
			key: "TripId",
			render: (text, record, index) => index + 1,
		},
		{ title: "Trip Name", dataIndex: "TripName", key: "TripName" },
		{
			title: "Travel Date",
			key: "TravelDate",
			render: (_, record) => {
				const startDate = new Date(record.StartTravelDate);
				const endDate = new Date(record.EndTravelDate);

				const formatDate = (date) =>
					date
						.toLocaleDateString("en-GB", {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})
						.replace(/ /g, " "); // This will format like "21 Apr 2025"

				return `${formatDate(startDate)} - ${formatDate(endDate)}`;
			},
		},
		{
			title: "Duration",
			dataIndex: "Duration",
			key: "Duration",
			render: (text) => `${text} days`,
		},
		{
			title: "Airline",
			dataIndex: "Airline",
			key: "Airline",
			render: (airline) => {
				const url = airlineLogos[airline];
				if (url) {
					return (
						<img
							src={url}
							alt={airline}
							style={{ height: "30px", objectFit: "contain" }}
						/>
					);
				}

				return airline || "-";
			},
		},
		{
			title: "Seat",
			key: "Seats",
			render: (_, record) => {
				const seatAvailable = record.SeatAvailable;
				const seatSold = record.SeatSold;
				const seatBalance = record.SeatBalance;

				return (
					<>
						{seatSold}/{seatAvailable} ({seatBalance} seats left)
					</>
				);
			},
		},
		{ title: "Status", dataIndex: "Status", key: "Status" },
		{
			title: "Action",
			key: "Action",
			render: (_, record) => {
				const handleBookingClick = () => {
					const bookingUrl = `/Admin/Booking/create-booking?pkgId=${id}&tripId=${record.TripID}`;
					window.open(bookingUrl, "_blank"); // This will open the URL in a new tab
				};

				return (
					<Button
						icon={<PlusOutlined />}
						onClick={handleBookingClick}
						className="px-3 py-1 bg-blue-200/20 rounded-3xl text-white text-sm"
					>
						Add Booking
					</Button>
				);
			},
		},
	];

	const handleSaveChanges = async () => {
		try {
			let base64Poster = updatedPoster;

			// If it starts with "data:image", we need to remove that header part
			if (updatedPoster.startsWith("data:image")) {
				base64Poster = updatedPoster.split(",")[1];
			}

			const response = await axios.post("/api/Tetapan/ManagePackage", {
				Operation: "UPDATE",
				PakejID: id,
				PakejName: packageData[0].PakejName,
				HotelMakkahID: packageData[0].HotelMakkahID,
				HotelMadinahID: packageData[0].HotelMadinahID,
				TripIDs: tripDetails.map((trip) => trip.TripID).join(","),
				TripUnique: tripDetails.map((trip) => trip.TripUnique).join(","),
				Adult_Double: packageData[0].Adult_Double,
				Adult_Triple: packageData[0].Adult_Triple,
				Adult_Quad: packageData[0].Adult_Quad,
				ChildWBed_Double: packageData[0].ChildWBed_Double,
				ChildWBed_Triple: packageData[0].ChildWBed_Triple,
				ChildWBed_Quad: packageData[0].ChildWBed_Quad,
				ChildNoBed_Double: packageData[0].ChildNoBed_Double,
				ChildNoBed_Triple: packageData[0].ChildNoBed_Triple,
				ChildNoBed_Quad: packageData[0].ChildNoBed_Quad,
				Infant_Double: packageData[0].Infant_Double,
				Infant_Triple: packageData[0].Infant_Triple,
				Infant_Quad: packageData[0].Infant_Quad,
				PakejPoster: base64Poster,
				Commission: packageData[0].Commission,
			});

			if (response.status === 200) {
				message.success("Changes saved successfully");
			} else {
				message.error("Failed to save changes");
			}
		} catch (error) {
			console.error(error);
			message.error("Failed to save changes");
		}
	};

	return (
		<AdminLayout>
			{packageData && (
				<div className="m-4 border-2 border-gray-100/30 rounded-lg backdrop-blur-md p-8 text-white">
					<h1 className="text-2xl font-semibold pb-4 border-b border-gray-200/30">
						Package Details
					</h1>

					<div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-6 mt-4">
						<div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6 col-span-2">
							{/* Package Name */}
							<div className="flex flex-col gap-2 col-span-2">
								<label className="text-sm text-white">Package Name</label>
								<span className="p-2 border-b border-gray-100/30 rounded-md text-gray-100">
									Pakej {packageData[0].PakejName}
								</span>
							</div>

							{/* Makkah Hotel Name */}
							<div className="flex flex-col gap-2">
								<label className="text-sm text-white">Makkah Hotel</label>
								<span className="p-2 border-b border-gray-100/30 rounded-md text-gray-100">
									{packageData[0].MakkahHotelName}
								</span>
							</div>

							{/* Madinah Hotel Name */}
							<div className="flex flex-col gap-2">
								<label className="text-sm text-gray-200">Madinah Hotel</label>
								<span className="p-2 border-b border-gray-100/30 rounded-md text-gray-100">
									{packageData[0].MadinahHotelName}
								</span>
							</div>

							{/* Package Pricing */}
							<div className="flex flex-col gap-4 lg:col-span-2">
								<label className="text-sm text-white">Pricing Details</label>
								<div className="bg-gray-100/10 p-4 rounded-md">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										<div className="flex justify-between text-sm">
											<span>Adult Double</span>
											<span>RM {packageData[0].Adult_Double}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Adult Triple</span>
											<span>RM {packageData[0].Adult_Triple}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Adult Quad</span>
											<span>RM {packageData[0].Adult_Quad}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Child With Bed (Double)</span>
											<span>RM {packageData[0].ChildWBed_Double}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Child No Bed (Double)</span>
											<span>RM {packageData[0].ChildNoBed_Double}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Infant (Double)</span>
											<span>RM {packageData[0].Infant_Double}</span>
										</div>
									</div>
								</div>
							</div>

							{/* Trip Details Table */}
							<div className="flex flex-col gap-4 col-span-2">
								<label className="text-sm text-gray-200">Trip Details</label>
								<Table
									columns={tripColumns}
									dataSource={tripDetails}
									rowKey="TripID"
									pagination={true}
									loading={loading}
									className="w-full bg-white/10 rounded-lg glass-table"
								/>
							</div>
						</div>

						{/* Poster Slot */}
						<div className="flex flex-col gap-2 row-span-2">
							<label className="text-sm text-gray-200">Package Poster</label>
							{updatedPoster ? (
								<img
									src={updatedPoster}
									alt="Package Poster"
									className="object-cover rounded-md"
								/>
							) : packageData[0]?.PakejPoster ? (
								<img
									src={packageData[0].PakejPoster}
									alt="Package Poster"
									className="object-cover rounded-md"
								/>
							) : (
								<div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center">
									No Poster
								</div>
							)}
							<input
								type="file"
								onChange={handlePosterChange}
								accept="image/*"
								className="mt-2 p-2 border rounded-md"
							/>
						</div>
					</div>

					<div className="mt-4 flex justify-end gap-2">
						<Button
							onClick={handleBack}
							className="px-6 py-2 bg-gray-500 text-white rounded-3xl"
						>
							Back
						</Button>
						<Button
							onClick={handleSaveChanges}
							className="px-6 py-2 bg-blue-500 text-white rounded-3xl"
						>
							Save Changes
						</Button>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default Details;
