"use client";
import React, { useState, useEffect } from "react";
import * as motion from "framer-motion/client";
import Axios from "axios";
const PackageCard = ({ href, imageSrc, title, price, items }) => (
	<div className="max-w-screen-xl rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-white to-gray-50">
		<div className="relative group">
			<img
				className="w-full h-[50vh] object-cover rounded-t-lg brightness-50 group-hover:scale-105 transition duration-300 ease-in"
				src={imageSrc}
				alt={title}
			/>
			{/* <div className="absolute bottom-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white rounded-lg shadow-md">
				{duration}
			</div> */}
			<div className="absolute bottom-0 px-4 py-5 space-y-4 w-full">
				<h2 className="text-4xl font-semibold text-gray-100">{title}</h2>
				<div className="border-t border-gray-200 pt-4">
					<ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-md text-gray-100">
						<li className="flex items-start gap-2">
							<div>
								Visa
								<p className="text-sm text-gray-200">
									Proses visa mudah & cepat
								</p>
							</div>
						</li>
						<li className="flex items-start gap-2">
							<div>
								Makan
								<p className="text-sm text-gray-200">3 kali sehari</p>
							</div>
						</li>
						<li className="flex items-start gap-2">
							<div>
								Penerbangan
								<p className="text-sm text-gray-200">
									Kelas ekonomi pergi & balik
								</p>
							</div>
						</li>
						<li className="flex items-start gap-2">
							<div>
								Hotel
								<p className="text-sm text-gray-200">
									Berdekatan dengan masjid
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div className="flex items-center justify-between mt-4">
					<a
						href={href}
						className="px-5 py-2 bg-orange-500 text-white text-sm font-medium rounded-full shadow hover:bg-orange-600 transition duration-300"
					>
						Tempah
					</a>
					<div className="text-right">
						<p className="text-xs text-orange-500">Bermula</p>
						<p className="text-3xl font-bold text-white font-price">{price}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const Pakej = () => {
	const [packages, setPackages] = useState([]);
	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const response = await Axios.get(
					"http://localhost:3000/api/Tetapan/ManagePackage",
					{
						params: {
							Operation: "SEARCH",
							TripUnique: "Y",
						},
					}
				);
				const packagesData = response.data;
				setPackages(packagesData);
			} catch (error) {
				console.error("Error fetching packages:", error);
			}
		};
		fetchPackages();
	}, []);
	return (
		<section className="relative overflow-hidden bg-[url('/Hero/PakejBg1.jpg')] bg-cover">
			<div className="absolute inset-0 h-full bg-gradient-to-b from-white to-white/40"></div>
			<div className="relative mx-auto px-6 py-12 sm:py-24 text-slate-900">
				<motion.header
					initial={{ y: -100 }}
					whileInView={{ y: 0 }}
					transition={{ ease: "easeInOut", duration: 1 }}
					viewport={{ once: true, amount: 0.2 }}
					className="text-center"
				>
					<p className="text-gray-700 font-reenie text-2xl font-semibold">
						- Experience the World, Embrace Your Faith -
					</p>
					<h2 className="mx-auto text-3xl max-w-4xl font-regular sm:text-5xl text-orange-600">
						Pakej Umrah 2025
					</h2>

					{/* <p className="mx-auto mt-4 text-xl lg:max-w-4xl sm:max-w-xl text-slate-500 ">
						Umrah bersama KMTT menawarkan pakej yang berpatutan, mudah dan
						selamat. Terokai pakej yang bersesuaian dengan bajet anda dan
						rancang perjalanan anda sekarang!
					</p> */}
				</motion.header>
				<div className="mx-auto max-w-screen-xl sm:px-2 py-6">
					<ul className="grid gap-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3">
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
		</section>
	);
};

export default Pakej;
