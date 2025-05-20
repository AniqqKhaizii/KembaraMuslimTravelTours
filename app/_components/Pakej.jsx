"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";

const PackageCard = ({ href, imageSrc, title, price, items }) => (
	<div className="max-w-screen-xl rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50">
		<div className="relative group">
			<img
				className="w-full h-[55vh] object-cover rounded-t-lg brightness-[0.40] group-hover:scale-105 transition duration-200 ease-in"
				src={imageSrc}
				alt={title}
			/>

			<div className="absolute bottom-0 px-8 py-5 space-y-4 w-full">
				<h2 className="text-4xl font-semibold text-gray-100">{title}</h2>
				<div className="border-t border-gray-200 pt-4">
					<ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-md text-gray-100">
						<li className="flex items-start gap-2">
							<div>
								<span className="font-bold">Visa</span>
								<p className="text-sm text-gray-200 font-primary">
									Proses visa mudah & cepat
								</p>
							</div>
						</li>
						<li className="flex items-start gap-2">
							<div>
								<span className="font-bold">Makan</span>
								<p className="text-sm text-gray-200 font-primary">
									3 kali sehari
								</p>
							</div>
						</li>
						<li className="flex items-start gap-2">
							<div>
								<span className="font-bold">Penerbangan</span>
								<p className="text-sm text-gray-200 font-primary">
									Kelas ekonomi pergi & balik
								</p>
							</div>
						</li>
						<li className="flex items-start gap-2">
							<div>
								<span className="font-bold">Hotel</span>
								<p className="text-sm text-gray-200 font-primary">
									Berdekatan dengan masjid
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div className="flex items-center justify-between mt-4">
					<a
						href={href}
						className="px-5 py-1.5 bg-orange-500 text-white text-sm font-medium rounded-xl shadow hover:bg-orange-600 transition duration-300"
					>
						Tempah
					</a>
					<div className="text-right">
						<p className="text-xs text-orange-400">Bermula</p>
						<p className="text-3xl font-bold text-white">{price}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const Pakej = () => {
	gsap.registerPlugin(ScrollTrigger);

	const backgroundImage = useRef(null);
	const headerRef = useRef(null);
	const cardsRef = useRef([]);
	cardsRef.current = [];
	const [trips, setTrips] = useState([]);
	const [packages, setPackages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
		if (!headerRef.current) return;
		if (typeof window !== "undefined") {
			const ctx = gsap.context(() => {
				gsap.to(backgroundImage.current, {
					y: 0,
					ease: "power2.out",
					scrollTrigger: {
						trigger: backgroundImage.current,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					},
				});

				gsap.from(headerRef.current.children, {
					y: 0,
					opacity: 0,
					stagger: 0.2,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: headerRef.current,
						start: "top 80%",
					},
				});

				cardsRef.current.forEach((card, i) => {
					gsap.from(card, {
						opacity: 0,
						y: 50,
						scale: 0.95,
						duration: 0.8,
						delay: i * 0.2,
						ease: "back.out(1.7)",
						scrollTrigger: {
							trigger: card,
							start: "top 90%",
							toggleActions: "play none none reverse", // play on enter, reverse on leave
						},
					});
				});
			}, backgroundImage);
			return () => ctx.revert();
		}
	}, [isLoading]);

	const addToRefs = (el) => {
		if (el && !cardsRef.current.includes(el)) {
			cardsRef.current.push(el);
		}
	};

	useEffect(() => {
		const fetchPackages = async () => {
			setIsLoading(true);
			try {
				const response = await Axios.get("/api/Tetapan/ManagePackage", {
					params: {
						Operation: "SEARCH",
						TripUnique: "Y",
					},
				});
				const packagesData = response.data;
				const filteredPackages = packagesData.map(
					({ PakejPoster, ...rest }) => rest
				);

				console.log("filteredPackages", filteredPackages);
				setPackages(packagesData);
			} catch (error) {
				console.error("Error fetching packages:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchPackages();

		const fetchTrips = async () => {
			try {
				const response = await Axios.get("/api/Tetapan/ManageTrip", {
					params: {
						Operation: "SEARCH",
					},
				});
				setTrips(response.data);
			} catch (error) {
				console.error("Error fetching trips:", error);
			}
		};

		fetchTrips();
	}, []);

	const getPackagesForTrip = (tripID, packages) => {
		return packages.filter((pkg) =>
			pkg.TripID.split(",")
				.map((id) => id.trim())
				.includes(tripID.toString())
		);
	};

	return (
		<section className="relative overflow-x-hidden bg-gradient-to-b from-white to-kmtt-text lg:pt-24 lg:mt-0 -mt-2 pb-12">
			<div
				ref={backgroundImage}
				className="relative mx-auto lg:px-6 px-2 sm:pb-24 text-slate-900"
			>
				<header ref={headerRef} className="text-center">
					<p className="text-gray-700 font-reenie text-2xl font-semibold">
						- Experience the World, Embrace Your Faith -
					</p>
					<h2 className="mx-auto text-3xl max-w-4xl  sm:text-5xl font-bold text-orange-600 tracking-tighter">
						Pakej Umrah 2025
					</h2>
				</header>

				<div className="mx-auto max-w-screen-2xl sm:px-2 py-12 flex flex-col gap-24">
					<ul className="grid gap-3 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3">
						{isLoading
							? [...Array(4)].map((_, index) => (
									<Skeleton key={index} className="min-h-[50vh]" />
							  ))
							: packages.map((pkg, index) => (
									<li key={pkg.PakejID} ref={addToRefs}>
										<PackageCard
											href={`/Pakej/Pakej-Umrah?kategori=${
												pkg.PakejName || "Unknown"
											}`}
											imageSrc={
												pkg.PakejName
													? `/Pakej/${pkg.PakejName}.jpg`
													: "/default-image.jpg"
											}
											title={`Pakej Umrah ${pkg.PakejName}`}
											price={`RM ${pkg.Adult_Quad || "N/A"}`}
											items={["Visa", "Makan", "Penerbangan", "Hotel"]}
										/>
									</li>
							  ))}
					</ul>
					<div className="w-full overflow-x-auto">
						<Table className="min-w-[700px] border border-slate-300">
							<TableHeader>
								<TableRow className="h-12 bg-gradient-to-b from-kmtt-primary to-orange-600 rounded-xl">
									<TableHead className="font-semibold text-kmtt-text border border-slate-300">
										Trip Name
									</TableHead>
									<TableHead className="font-semibold text-kmtt-text border border-slate-300 text-center">
										Travel Date
									</TableHead>
									<TableHead className="font-semibold text-kmtt-text border border-slate-300 text-center">
										Seat Available
									</TableHead>
									<TableHead className="font-semibold text-kmtt-text border border-slate-300 text-center">
										Status
									</TableHead>
									<TableHead className="font-semibold text-kmtt-text border border-slate-300 text-center">
										Packages Available
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{trips.map((trip) => {
									const relatedPackages = getPackagesForTrip(
										trip.TripID,
										packages
									);
									const formattedStartDate = new Intl.DateTimeFormat("en-GB", {
										day: "2-digit",
										month: "short",
										year: "numeric",
									}).format(new Date(trip.StartTravelDate));

									const formattedEndDate = new Intl.DateTimeFormat("en-GB", {
										day: "2-digit",
										month: "short",
										year: "numeric",
									}).format(new Date(trip.EndTravelDate));

									const travelDate = `${formattedStartDate} - ${formattedEndDate}`;
									return (
										<TableRow
											key={trip.TripID}
											className="border border-slate-300"
										>
											<TableCell className="border border-slate-300">
												{trip.TripName}
											</TableCell>
											<TableCell className="border border-slate-300 text-center">
												{formattedStartDate} – {formattedEndDate}
											</TableCell>
											<TableCell className="border border-slate-300 text-center">
												{trip.SeatBalance}
											</TableCell>
											<TableCell className="border border-slate-300 text-center">
												{trip.Status}
											</TableCell>
											<TableCell className="border border-slate-300 text-center">
												<div className="flex flex-wrap gap-2">
													{relatedPackages.map((pkg) => {
														const isFull = trip.Status.toLowerCase() === "full";
														return (
															<Link
																key={pkg.PakejID}
																href={`/Pakej/Pakej-Umrah/TempahPakej?kategori=${encodeURIComponent(
																	pkg.PakejName
																)}&tarikh=${encodeURIComponent(
																	travelDate
																)}&trip=${encodeURIComponent(trip.TripID)}`}
																className={isFull ? "pointer-events-none" : ""}
															>
																<Button
																	variant={isFull ? "secondary" : "outline"}
																	disabled={isFull}
																	className={`text-sm px-4 py-1 rounded-xl ${
																		isFull
																			? "bg-gray-300 text-gray-600 cursor-not-allowed border-none"
																			: "hover:bg-orange-100"
																	}`}
																>
																	{pkg.PakejName}
																</Button>
															</Link>
														);
													})}
												</div>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Pakej;
