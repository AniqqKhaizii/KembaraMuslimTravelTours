"use client";
import React, { useState, useEffect, Suspense, useMemo } from "react";
import Axios from "axios";
import { message, Select } from "antd"; // since you are using message.error
import AdminLayout from "../../layout/AdminLayout";
import { AiOutlineHome } from "react-icons/ai";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const FlightLogo = ({ flightCode }) => {
	const logo = [
		{
			flightCode: "Emirates",
			logoUrl: "/Flight/Emirates.svg",
		},
		{
			flightCode: "AirAsia",
			logoUrl: "/Flight/AirAsia.svg",
		},
	];

	const logoItem = logo.find((item) => item.flightCode === flightCode);
	const logoUrl = logoItem ? logoItem.logoUrl : null;

	return (
		<div>
			{logoUrl ? (
				<Image
					src={logoUrl}
					alt={flightCode}
					className="w-12 h-auto"
					width={0}
					height={0}
				/>
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

	const [tripNameFilter, setTripNameFilter] = useState("");
	const [airlineFilter, setAirlineFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState(null);

	const [expandedGroups, setExpandedGroups] = useState({});

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const options = { year: "numeric", month: "short", day: "numeric" };
		return new Intl.DateTimeFormat("en-GB", options).format(date);
	};

	useEffect(() => {
		const fetchHotelsAndTrips = async () => {
			setLoading(true);

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

	const groupedData = useMemo(() => {
		const map = new Map();

		packages.forEach((pkg) => {
			const tripIDs = pkg.TripID.split(",").map((id) => parseInt(id.trim()));
			tripIDs.forEach((id) => {
				if (!map.has(id)) map.set(id, []);
				map.get(id).push(pkg);
			});
		});

		return Array.from(map.entries()).map(([tripId, pkgs]) => {
			const trip = trips.find((t) => t.TripID === tripId);
			return { trip, packages: pkgs };
		});
	}, [packages, trips]);

	const filteredData = useMemo(() => {
		return groupedData.filter(({ trip }) => {
			const matchTrip = trip?.TripName?.toLowerCase().includes(
				tripNameFilter.toLowerCase()
			);
			const matchAirline = trip?.Airline?.toLowerCase().includes(
				airlineFilter.toLowerCase()
			);
			const matchStatus =
				!statusFilter ||
				trip?.Status?.toLowerCase() === statusFilter.toLowerCase();

			return matchTrip && matchAirline && matchStatus;
		});
	}, [groupedData, tripNameFilter, airlineFilter, statusFilter]);

	useEffect(() => {
		const allExpanded = {};
		filteredData.forEach((_, idx) => {
			allExpanded[idx] = true;
		});
		setExpandedGroups(allExpanded);
	}, [filteredData]);

	const toggleGroup = (index) => {
		setExpandedGroups((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};
	return (
		<AdminLayout>
			<Suspense fallback={<div>Loading...</div>}>
				<div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 p-4 h-full">
					{/* Cards */}
					<div>
						<div className="flex items-center gap-2 w-full p-4 border border-white/70 rounded-md bg-white/10 backdrop-blur dark:text-white text-zinc-900">
							<AiOutlineHome className="w-8 h-8" />
							<div className="flex flex-col items-end w-full gap-2">
								<span>Available Trip</span>
								<span className="text-3xl">{trips?.length}</span>
							</div>
						</div>
					</div>
					<div>
						<div className="flex items-center gap-2 w-full p-4 border border-white/70 rounded-md bg-white/10 backdrop-blur dark:text-white text-zinc-900">
							<AiOutlineHome className="w-8 h-8" />
							<div className="flex flex-col items-end w-full gap-2">
								<span>Selling Trip</span>
								<span className="text-3xl">
									{trips?.filter((trip) => trip.Status === "Open").length}
								</span>
							</div>
						</div>
					</div>
					<div>
						<div className="flex items-center gap-2 w-full p-4 border border-white/70 rounded-md bg-white/10 backdrop-blur dark:text-white text-zinc-900">
							<AiOutlineHome className="w-8 h-8" />
							<div className="flex flex-col items-end w-full gap-2">
								<span>Full Trip</span>
								<span className="text-3xl">
									{trips?.filter((trip) => trip.Status === "Full").length}
								</span>
							</div>
						</div>
					</div>

					{/* Table */}
					<div className="col-span-3 rounded-md dark:text-white text-zinc-900">
						<h1 className="text-2xl border-b dark:border-gray-300 border-gray-400 mb-4 dark:text-white text-zinc-900">
							Tour Packages
						</h1>

						{loading ? (
							<div className="flex items-center justify-center min-h-[45vh]">
								Loading packages...
							</div>
						) : (
							<div className="p-2 font-primary font-light">
								<div className="flex gap-4 text-sm w-1/2 mb-6">
									<input
										type="text"
										placeholder="Search Trip Name"
										className="border p-2 rounded w-full md:w-1/3 bg-white/10"
										value={tripNameFilter}
										onChange={(e) => setTripNameFilter(e.target.value)}
									/>
									<input
										type="text"
										placeholder="Search By Flight"
										className="border p-2 rounded w-full md:w-1/3 bg-white/10"
										value={airlineFilter}
										onChange={(e) => setAirlineFilter(e.target.value)}
									/>
									<Select
										value={statusFilter}
										onChange={(value) => setStatusFilter(value)}
										className="w-64 glass-select h-10"
										popupClassName="glass-select-dropdown"
										placeholder="Select Status"
									>
										<Select.Option value={null}>All</Select.Option>
										<Select.Option value={"Open"}>Open</Select.Option>
										<Select.Option value={"Full"}>Full</Select.Option>
									</Select>
								</div>

								<table className="w-full border-2 dark:border-gray-300 border-gray-400 bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-md ">
									<thead>
										<tr className="dark:text-white text-zinc-900 border-t dark:border-gray-300 border-gray-400">
											<th className="border dark:border-gray-300 border-gray-400 p-2 my-4">
												Tour Package
											</th>
											<th className="border dark:border-gray-300 border-gray-400 p-2">
												Flight
											</th>
											<th className="border dark:border-gray-300 border-gray-400 p-2 text-center">
												Travel Date
											</th>
											<th className="border dark:border-gray-300 border-gray-400 p-2 text-center">
												Price
											</th>
											<th className="border dark:border-gray-300 border-gray-400 p-2 text-center">
												Seats
											</th>
											<th className="border dark:border-gray-300 border-gray-400 p-2 text-center">
												Deadline
											</th>
											<th className="border dark:border-gray-300 border-gray-400 p-2 text-center">
												Departure
											</th>
											<th className="border dark:border-gray-300 border-gray-400 p-2 text-center">
												Commission
											</th>
											<th className="border dark:border-gray-300 border-gray-400 p-2 text-center">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{filteredData.length === 0 ? (
											<tr>
												<td
													colSpan="9"
													className="text-center py-4 dark:text-white text-zinc-900"
												>
													No matching results.
												</td>
											</tr>
										) : (
											filteredData.map(({ trip, packages }, groupIndex) => {
												if (!trip) return null;

												return (
													<React.Fragment key={`group-${groupIndex}`}>
														{/* Group Header Row */}
														<tr
															className="border h-9 dark:border-gray-300 border-gray-400 dark:text-white text-zinc-700 text-left bg-gray-100 dark:bg-white/20"
															// onClick={() => toggleGroup(groupIndex)}
														>
															<td
																colSpan="9"
																className="py-3 px-4 font-bold uppercase"
															>
																<div className="flex justify-between items-center">
																	<span>{`Trip ${trip.TripName} (${formatDate(
																		trip.StartTravelDate
																	)} - ${formatDate(
																		trip.EndTravelDate
																	)})`}</span>
																	{/* <span>
																		{expandedGroups[groupIndex] ? "▲" : "▼"}
																	</span> */}
																</div>
															</td>
														</tr>

														{/* Package Rows */}
														{expandedGroups[groupIndex] &&
															packages.map((pkg, pkgIndex) => (
																<tr
																	key={`${groupIndex}-${pkgIndex}`}
																	className="text-center dark:text-white text-zinc-900"
																>
																	<td className="border-b dark:border-gray-300 border-gray-400 py-2 px-4 text-left uppercase">
																		Trip {trip.TripName} - Pakej {pkg.PakejName}
																	</td>
																	<td className="border-b dark:border-gray-300 border-gray-400 py-2 px-4">
																		<div className="flex justify-center">
																			<FlightLogo flightCode={trip.Airline} />
																		</div>
																	</td>
																	<td className="border-b dark:border-gray-300 border-gray-400 py-2 px-4">
																		{trip.StartTravelDate
																			? formatDate(trip.StartTravelDate)
																			: "-"}{" "}
																		-{" "}
																		{trip.EndTravelDate
																			? formatDate(trip.EndTravelDate)
																			: "-"}
																	</td>
																	<td className="border-b dark:border-gray-300 border-gray-400 py-2 px-4 text-left">
																		Adult: RM
																		{parseFloat(pkg.Adult_Double || 0).toFixed(
																			0
																		)}
																		<br />
																		Child WB: RM
																		{parseFloat(
																			pkg.ChildWBed_Double || 0
																		).toFixed(0)}
																		<br />
																		Child NB: RM
																		{parseFloat(
																			pkg.ChildNoBed_Double || 0
																		).toFixed(0)}
																		<br />
																		Infant: RM
																		{parseFloat(pkg.Infant_Double || 0).toFixed(
																			0
																		)}
																	</td>
																	<td className="border-b dark:border-gray-300 border-gray-400 py-2 px-4 text-left">
																		<div className="flex items-center justify-between">
																			Total <b>{trip.SeatAvailable}</b>
																		</div>
																		<div className="flex items-center justify-between">
																			Sold <b>{trip.SeatSold}</b>
																		</div>
																		<div className="flex items-center justify-between border-t dark:border-gray-300 border-gray-400">
																			Available <b>{trip.SeatBalance}</b>
																		</div>
																	</td>
																	<td className="border-b dark:border-gray-300 border-gray-400 py-2 px-4">
																		{trip.Deadline || "-"}
																	</td>
																	<td className="border-b dark:border-gray-300 border-gray-400 py-2 px-4">
																		{trip.Status || "-"}
																	</td>
																	<td className="border-b dark:border-gray-300 border-gray-400 py-2 px-4">
																		RM {pkg.Commission || "-"}
																	</td>
																	<td className="border-b dark:border-gray-300 border-gray-400 py-2 px-4 text-left">
																		<div className="flex flex-col space-y-2">
																			<button
																				onClick={() =>
																					window.open(
																						`/Admin/Booking/create-booking?pkgId=${pkg.PakejID}&tripId=${trip.TripID}`,
																						"_blank"
																					)
																				}
																				className="px-2 py-1 text-sm dark:bg-blue-500/60 bg-blue-500 border border-gray-100/50 text-white rounded"
																			>
																				Add Booking
																			</button>
																			<button className="px-2 py-1 text-sm dark:bg-green-500/60 bg-green-500 border border-gray-100/50 text-white rounded">
																				Flyers PDF
																			</button>
																			<button className="px-2 py-1 text-sm border dark:border-gray-100/50 border-gray-100 dark:text-white text-zinc-900 rounded">
																				Edit
																			</button>
																		</div>
																	</td>
																</tr>
															))}
													</React.Fragment>
												);
											})
										)}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</Suspense>
		</AdminLayout>
	);
};

export default Dashboard;
