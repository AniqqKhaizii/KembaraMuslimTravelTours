"use client";
import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useAppearance } from "@/hooks/use-appearance";
import Axios from "axios";
import { message, theme } from "antd"; // since you are using message.error
import AdminLayout from "../../layout/AdminLayout";
import { AiOutlineHome } from "react-icons/ai";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const BookingBarChart = dynamic(
	() => import("@/components/chart/BookingBarChart"),
	{
		ssr: false,
	}
);

const useAppearanceFromLocalStorage = () => {
	const [appearance, setAppearance] = useState("system");

	useEffect(() => {
		const stored = localStorage.getItem("appearance") || "system";
		setAppearance(stored);

		const listener = () => {
			const updated = localStorage.getItem("appearance") || "system";
			console.log("updated", updated);
			setAppearance(updated);
		};

		window.addEventListener("storage", listener);

		return () => window.removeEventListener("storage", listener);
	}, [appearance]);

	return appearance;
};

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

const formatDate = (dateString) => {
	const date = new Date(dateString);
	const options = { year: "numeric", month: "short", day: "numeric" };
	return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const Dashboard = () => {
	const [packages, setPackages] = useState([]);
	const [hotelMakkah, setHotelMakkah] = useState(null);
	const [hotelMadinah, setHotelMadinah] = useState(null);
	const [trips, setTrips] = useState(null);
	const [loading, setLoading] = useState(false);

	const appearance = useAppearanceFromLocalStorage();

	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const res = await Axios.get("/api/Booking", {
					params: { Operation: "SEARCH" },
				});
				setBookings(res.data);
			} catch (error) {
				console.error("Error fetching bookings:", error);
				message.error("Failed to load bookings.");
			}
		};

		fetchBookings();
	}, []);

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

	const bookingsPerTripByPackage = useMemo(() => {
		if (!bookings || bookings.length === 0) return [];

		const tripMap = {};
		const packageSet = new Set();

		bookings.forEach(({ TripID, TripName, PakejName }) => {
			if (!tripMap[TripID]) {
				tripMap[TripID] = { tripId: TripID, tripName: TripName, packages: {} };
			}
			if (!tripMap[TripID].packages[PakejName]) {
				tripMap[TripID].packages[PakejName] = 0;
			}
			tripMap[TripID].packages[PakejName]++;
			packageSet.add(PakejName);
		});

		const trips = Object.values(tripMap).sort((a, b) => a.tripId - b.tripId);
		const packageNames = Array.from(packageSet);

		const series = packageNames.map((pkg) => ({
			name: pkg,
			data: trips.map((trip) => trip.packages[pkg] || 0),
		}));

		const categories = trips.map((trip) => trip.tripName);

		return { series, categories };
	}, [bookings]);

	const bookingChartSeries = bookingsPerTripByPackage?.series || [];

	const bookingChartOptions = {
		chart: {
			type: "bar",
			stacked: false,
			toolbar: { show: false },
			background: "transparent",
		},
		plotOptions: {
			bar: {
				horizontal: false,
				borderRadius: 4,
				borderRadiusApplication: "end",
				columnWidth: "60%",
			},
		},
		dataLabels: {
			enabled: true,
		},
		stroke: {
			show: true,
			width: 2,
			colors: ["transparent"],
		},
		xaxis: {
			categories: bookingsPerTripByPackage?.categories || [],
		},
		yaxis: {
			title: {
				text: "Number of Bookings",
			},
		},
		legend: {
			position: "top",
		},
		fill: {
			opacity: 1,
		},
		grid: {
			show: false,
		},
		theme: {
			mode: appearance,
			palette: "palette2",
		},
	};
	return (
		<AdminLayout>
			<div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 p-4 h-[87vh] overflow-clip">
				<div className="flex items-center gap-2 w-full p-4 border border-white/70 rounded-md bg-white/10 backdrop-blur dark:text-white text-zinc-950 max-h-24">
					<AiOutlineHome className="w-8 h-8" />
					<div className="flex flex-col items-end w-full gap-2">
						<span>Available Trip</span>
						<span className="text-3xl">{trips?.length}</span>
					</div>
				</div>
				<div className="flex items-center gap-2 w-full p-4 border border-white/70 rounded-md bg-white/10 backdrop-blur dark:text-white text-zinc-950 max-h-24">
					<AiOutlineHome className="w-8 h-8" />
					<div className="flex flex-col items-end w-full gap-2">
						<span>Selling Trip</span>
						<span className="text-3xl">
							{trips?.filter((trip) => trip.Status === "Open").length}
						</span>
					</div>
				</div>

				{/* Table */}
				<div className="row-span-2 rounded-md dark:text-white text-zinc-950 bg-white/10 border border-white/70 backdrop-blur h-full"></div>
				<div className="col-span-2 rounded-md dark:text-white text-zinc-950 bg-white/10 border border-white/70 backdrop-blur pl-8 h-full min-h-[40vh]">
					{/*<h2 className="p-4 font-bold text-lg">
						Bookings per Trip (Grouped by Package)
					</h2>
					 <BookingBarChart
						options={bookingChartOptions}
						series={bookingChartSeries}
						categories={bookingsPerTripByPackage?.categories || []}
					/> */}
				</div>
				<div className="col-span-2 rounded-md dark:text-white text-zinc-950 bg-white/10 border border-white/70 backdrop-blur h-full min-h-[30vh]">
					{/* <Table className="min-h-[30vh]">
						<TableCaption className="dark:text-white text-zinc-950">
							A list of your recent invoices.
						</TableCaption>
						<TableHeader>
							<TableRow className="dark:text-white text-zinc-950 border-gray-100 dark:border-gray-300">
								<TableHead className="w-[100px] dark:text-white text-zinc-950">
									Invoice
								</TableHead>
								<TableHead className="dark:text-white text-zinc-950">
									Status
								</TableHead>
								<TableHead className="dark:text-white text-zinc-950">
									Method
								</TableHead>
								<TableHead className="text-right dark:text-white text-zinc-950">
									Amount
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow className="max-h-10 dark:text-white text-zinc-950 border border-gray-100 dark:border-gray-300">
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>Credit Card</TableCell>
								<TableCell className="text-right">$250.00</TableCell>
							</TableRow>
						</TableBody>
					</Table> */}
				</div>
				<div className="col-span-1 rounded-md dark:text-white text-zinc-950 bg-white/10 border border-white/70 backdrop-blur h-full min-h-[30vh]"></div>
			</div>
		</AdminLayout>
	);
};

export default Dashboard;
