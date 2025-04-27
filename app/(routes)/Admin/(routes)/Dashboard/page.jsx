"use client";
import React, { useState, useEffect, Suspense } from "react";
import Axios from "axios";
import { message } from "antd"; // since you are using message.error
import AdminLayout from "../../layout/AdminLayout";
import { AiOutlineHome } from "react-icons/ai";

const FlightLogo = ({ flightCode }) => {
	const logo = [
		{
			flightCode: "Emirates",
			logoUrl: "/flight/Emirates.svg",
		},
		{
			flightCode: "AirAsia",
			logoUrl: "/flight/AirAsia.svg",
		},
	];

	// Find the logoUrl for the given flightCode
	const logoItem = logo.find((item) => item.flightCode === flightCode);
	const logoUrl = logoItem ? logoItem.logoUrl : null;

	return (
		<div>
			{logoUrl ? (
				<img src={logoUrl} alt={flightCode} className="w-12 h-auto" />
			) : (
				<span>{flightCode}</span>
			)}
		</div>
	);
};

const Dashboard = () => {
	const [packages, setPackages] = useState([]);
	const [hotelMakkah, setHotelMakkah] = useState(null);
	const [hotelMadinah, setHotelMadinah] = useState(null);
	const [trips, setTrips] = useState(null);
	const [loading, setLoading] = useState(false);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const options = { year: "numeric", month: "short", day: "numeric" };
		return new Intl.DateTimeFormat("en-GB", options).format(date);
	};

	useEffect(() => {
		const fetchHotelsAndTrips = async () => {
			try {
				const [makkahRes, madinahRes, tripsRes] = await Promise.all([
					Axios.get("/api/Tetapan/ManageHotel", {
						params: { Operation: "SEARCH", Location: "Makkah" },
					}),
					Axios.get("/api/Tetapan/ManageHotel", {
						params: { Operation: "SEARCH", Location: "Madinah" },
					}),
					Axios.get("/api/Tetapan/ManageTrip", {
						params: {
							Operation: "SEARCH",
							TripID: null,
							TripName: null,
							StartDate: null,
							EndDate: null,
							Duration: null,
						},
					}),
				]);

				setHotelMakkah(makkahRes.data);
				setHotelMadinah(madinahRes.data);
				setTrips(tripsRes.data);
			} catch (error) {
				console.error("Error fetching hotels or trips:", error);
				message.error("Failed to load hotels/trips. Please try again.");
			}
		};

		fetchHotelsAndTrips();
	}, []);

	useEffect(() => {
		const fetchPackages = async () => {
			setLoading(true);
			try {
				const response = await Axios.get("/api/Tetapan/ManagePackage", {
					params: {
						Operation: "SEARCH",
						TripUnique: "Y",
					},
				});
				const packagesData = response.data;

				const updatedPackages = await Promise.all(
					packagesData.map(async (pkg) => {
						if (!pkg.TripID) return { ...pkg, tripDetails: [] };

						const tripIds = pkg.TripID.split(",").map((id) => id.trim());

						const tripDetails = await Promise.all(
							tripIds.map(async (id) => {
								console.log("id", id);
								try {
									const trip = trips?.find((t) => t.TripID == id);
									return trip ? trip : null;
								} catch (error) {
									console.error("Error fetching trip detail:", error);
									return null;
								}
							})
						);

						return { ...pkg, tripDetails: tripDetails.filter(Boolean) };
					})
				);

				setPackages(updatedPackages);
			} catch (error) {
				console.error("Error fetching packages:", error);
				message.error("Failed to load packages. Please try again.");
			}
			setLoading(false);
		};

		if (trips) {
			fetchPackages();
		}
	}, [trips]);

	console.log("packages", packages);
	return (
		<AdminLayout>
			<Suspense fallback={<div>Loading...</div>}>
				<div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 p-4 h-full">
					{/* Cards */}
					<div>
						<div className="flex items-center gap-2 w-full p-4 border-2 border-gray-100 rounded-md">
							<AiOutlineHome className="w-8 h-8" />
							<div className="flex flex-col items-end w-full gap-2">
								<span>Available Trip</span>
								<span className="text-3xl">{trips.length}</span>
							</div>
						</div>
					</div>
					<div>
						<div className="flex items-center gap-2 w-full p-4 border-2 border-gray-100 rounded-md">
							<AiOutlineHome className="w-8 h-8" />
							<div className="flex flex-col items-end w-full gap-2">
								<span>Selling Trip</span>
								<span className="text-3xl">
									{trips.filter((trip) => trip.Status === "Open").length}
								</span>
							</div>
						</div>
					</div>
					<div>
						<div className="flex items-center gap-2 w-full p-4 border-2 border-gray-100 rounded-md">
							<AiOutlineHome className="w-8 h-8" />
							<div className="flex flex-col items-end w-full gap-2">
								<span>Full Trip</span>
								<span className="text-3xl">
									{trips.filter((trip) => trip.Status === "Full").length}
								</span>
							</div>
						</div>
					</div>

					{/* Table */}
					<div className="col-span-3 rounded-md">
						<h1 className="text-xl border-b border-gray-300 mb-4">
							Tour Packages
						</h1>

						{loading ? (
							<div>Loading packages...</div>
						) : (
							<table className="w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
								<thead>
									<tr className="bg-orange-500 text-white">
										<th className="border border-gray-300 p-2">Tour Package</th>
										<th className="border border-gray-300 p-2">Flight</th>
										<th className="border border-gray-300 p-2 text-center">
											Travel Date
										</th>
										<th className="border border-gray-300 p-2 text-center">
											Price
										</th>
										<th className="border border-gray-300 p-2 text-center">
											Seats
										</th>
										<th className="border border-gray-300 p-2 text-center">
											Deadline
										</th>
										<th className="border border-gray-300 p-2 text-center">
											Departure
										</th>
										<th className="border border-gray-300 p-2 text-center">
											Commission
										</th>
										<th className="border border-gray-300 p-2 text-center">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{packages.length === 0 ? (
										<tr>
											<td colSpan="8" className="text-center py-4">
												No packages found.
											</td>
										</tr>
									) : (
										packages.map((pkg, index) => {
											const tripIDs = pkg.TripID.split(",").map((id) =>
												parseInt(id.trim())
											);
											const matchingTrips = trips.filter((trip) =>
												tripIDs.includes(trip.TripID)
											);

											return matchingTrips.map((trip, tripIndex) => (
												<tr
													key={`${index}-${tripIndex}`}
													className="text-center odd:bg-gray-50"
												>
													<td
														className="border-b border-gray-300 p-2 text-left uppercase"
														valign="top"
													>
														Trip {trip.TripName || trip.TripName} - Pakej{" "}
														{pkg.PakejName || pkg.PakejName}
													</td>
													<td
														className="border-b border-gray-300 p-2"
														valign="top"
													>
														<div className="flex justify-center items-start">
															<FlightLogo flightCode={trip.Airline} />
														</div>
													</td>
													<td
														className="border-b border-gray-300 text-center p-2"
														valign="top"
													>
														{trip.StartTravelDate
															? formatDate(trip.StartTravelDate)
															: "-"}{" "}
														-{" "}
														{trip.EndTravelDate
															? formatDate(trip.EndTravelDate)
															: "-"}
													</td>
													<td
														className="border-b border-gray-300 text-left p-2"
														valign="top"
													>
														{/* Price details */}
														Adult: RM
														{pkg.Adult_Double
															? parseFloat(pkg.Adult_Double).toFixed(0)
															: "0"}{" "}
														<br />
														Child With Bed: RM
														{pkg.ChildWBed_Double
															? parseFloat(pkg.ChildWBed_Double).toFixed(0)
															: "0"}{" "}
														<br />
														Child No Bed: RM
														{pkg.ChildNoBed_Double
															? parseFloat(pkg.ChildNoBed_Double).toFixed(0)
															: "0"}{" "}
														<br />
														Infant: RM
														{pkg.Infant_Double
															? parseFloat(pkg.Infant_Double).toFixed(0)
															: "0"}
													</td>
													<td
														className="border-b border-gray-300 text-left p-2"
														valign="top"
													>
														Total Seats:{" "}
														<span className="font-bold">
															{trip.SeatAvailable}
														</span>
														<br />
														Sold:{" "}
														<span className="font-bold">
															{trip.SeatSold}
														</span>{" "}
														<br />
														Available:{" "}
														<span className="font-bold">
															{trip.SeatBalance}
														</span>
													</td>
													<td
														className="border-b border-gray-300 text-center p-2"
														valign="top"
													>
														{trip.Deadline || "-"}
													</td>
													<td
														className="border-b border-gray-300 text-center p-2"
														valign="top"
													>
														{trip.Status || "-"}
													</td>
													<td
														className="border-b border-gray-300 text-center p-2"
														valign="top"
													>
														RM {pkg.Commission || "-"}
													</td>
													<td
														className="border-b border-gray-300 text-left p-2"
														valign="top"
													>
														<div className="flex flex-col justify-center space-y-2">
															<button className="px-2 py-1 bg-blue-500 text-white rounded">
																Add Booking
															</button>
															<button className="px-2 py-1 bg-gray-200 rounded">
																Flyers PDF
															</button>
															<button className="px-2 py-1 bg-gray-200 rounded">
																Edit
															</button>
														</div>
													</td>
												</tr>
											));
										})
									)}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</Suspense>
		</AdminLayout>
	);
};

export default Dashboard;
