"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import * as motion from "framer-motion/client";

{
	/* <div className="absolute bottom-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white rounded-lg shadow-md">
	{duration}
</div> */
}
const PackageCard = ({ href, imageSrc, title, price, items }) => (
	<div className="max-w-screen-xl rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-white to-gray-50">
		<div className="relative group">
			<img
				className="w-full h-[50vh] object-cover rounded-t-lg brightness-50 blur-[2px] group-hover:scale-105 transition duration-300 ease-in"
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
const PakejUmrah = () => {
	const [packages, setPackages] = useState([]);
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
				setPackages(packagesData);
			} catch (error) {
				console.error("Error fetching packages:", error);
			}
		};
		fetchPackages();
	}, []);

	return (
		<div className="mx-auto max-w-screen-4xl px-6 py-12 z-10 bg-gray-100">
			<div className="flex items-end justify-between max-w-screen-lg lg:text-left text-center mx-auto  sm:px-2 py-6 z-0">
				<div>
					<h1 className="text-4xl font-bold lg:text-left text-center text-orange-600">
						Senarai Pakej Umrah
					</h1>
					<h2 className="mt-2 max-w-screen-md text-md font-primary text-gray-800">
						Pelbagai pakej umrah yang berpatutan dan menarik disediakan mengikut
						citarasa anda. Anda hanya perlu membuat tempahan dan kami akan
						selesaikan selebihnya untuk anda!
					</h2>
				</div>
			</div>
			<div className="mx-auto max-w-screen-lg sm:px-2 py-6 z-0">
				<ul className="grid gap-6 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3">
					{packages.map((pkg, index) => (
						<motion.li
							key={pkg.PakejID} // Ensure each list item has a unique key
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: index * 0.2 }}
							viewport={{ once: true }}
						>
							<PackageCard
								href={`/Pakej/Pakej-Umrah?kategori=${
									pkg.PakejName || "Unknown"
								}`}
								imageSrc={
									pkg.PakejName
										? `/Pakej/${pkg.PakejName}.jpg`
										: "/default-image.jpg"
								}
								title={`Pakej Umrah ${pkg.PakejName}` || ""}
								price={`RM ${pkg.Adult_Quad || "N/A"}`}
								items={["Visa", "Makan", "Penerbangan", "Hotel"]}
							/>
						</motion.li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PakejUmrah;
