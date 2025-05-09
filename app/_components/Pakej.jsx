"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PackageCard = ({ href, imageSrc, title, price, items }) => (
	<div className="max-w-screen-xl rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50">
		<div className="relative group">
			<img
				className="w-full h-[60vh] object-cover rounded-t-lg brightness-[0.40] group-hover:scale-105 transition duration-200 ease-in"
				src={imageSrc}
				alt={title}
			/>

			<div className="absolute bottom-0 px-4 py-5 space-y-4 w-full">
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
						className="px-5 py-2 bg-orange-500 text-white text-sm font-medium rounded-2xl shadow hover:bg-orange-600 transition duration-300"
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

	const [packages, setPackages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
		if (!headerRef.current) return;
		if (typeof window !== "undefined") {
			const ctx = gsap.context(() => {
				gsap.to(backgroundImage.current, {
					y: 50,
					ease: "power2.out",
					scrollTrigger: {
						trigger: backgroundImage.current,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					},
				});

				gsap.from(headerRef.current.children, {
					y: 40,
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
				setPackages(packagesData);
			} catch (error) {
				console.error("Error fetching packages:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchPackages();
	}, []);

	return (
		<section className="relative overflow-hidden bg-[url('/BgMainPakej.png')] lg:-mt-20 -mt-2">
			<div
				data-scroll
				data-scroll-speed="0.3"
				className="absolute inset-0 h-full bg-[url('/BgMainPakej.png')]"
			></div>
			<div
				ref={backgroundImage}
				className="relative mx-auto lg:px-6 px-2 sm:pb-24 text-slate-900"
			>
				<header ref={headerRef} className="text-center">
					<p className="text-gray-700 font-reenie text-2xl font-semibold">
						- Experience the World, Embrace Your Faith -
					</p>
					<h2 className="mx-auto text-3xl max-w-4xl font-semibold sm:text-5xl text-orange-600 tracking-tighter">
						Pakej Umrah 2025
					</h2>
				</header>

				<div className="mx-auto max-w-screen-2xl sm:px-2 py-12">
					<ul className="grid gap-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3">
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
				</div>
			</div>
		</section>
	);
};

export default Pakej;
