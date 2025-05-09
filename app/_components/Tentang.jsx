"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import CountUp from "react-countup";
import { FaPaperPlane } from "react-icons/fa";

const targetDate = new Date("2025-06-05T00:00:00");

export default function AgencyInfoShowcase() {
	const [initialX, setInitialX] = useState(50);

	const [timeLeft, setTimeLeft] = useState({});

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const difference = targetDate - now;
			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((difference / 1000 / 60) % 60);
			const seconds = Math.floor((difference / 1000) % 60);

			setTimeLeft({ days, hours, minutes, seconds });
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setInitialX(window.innerWidth < 768 ? 50 : 500);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, [initialX]);

	return (
		<section className="w-full bg-gray-50 text-gray-800 overflow-hidden relative shadow-inner">
			<div className="relative grid lg:grid-cols-2 grid-cols-1">
				<div className="absolute top-0 left-0 w-full h-full bg-[url('/Hero/KembaraDuaTanahSuci.jpg')] bg-fixed bg-cover bg-right-top"></div>
				<video
					className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
					autoPlay
					loop
					muted
					style={{
						maskImage: "linear-gradient(to right, transparent, black 100%)",
						WebkitMaskImage:
							"linear-gradient(to right, transparent, black 100%)",
					}}
				>
					<source src="/Videos/KembaraDuaTanahSuci.mp4" type="video/mp4" />
				</video>
				<div className="relative lg:h-[40vh] h-[30vh] col-span-2 bg-black/60 flex flex-col items-center justify-center text-white px-4 ">
					<div className="absolute flex flex-col items-center justify-center w-full h-full px-4 py-8 text-center">
						<h2 className="text-2xl md:text-3xl font-extrabold text-yellow-400 mb-2">
							Bersedia untuk Berlepas: 5 Jun 2025
						</h2>
						<p className="text-lg md:text-xl font-medium tracking-wide">
							Masa berbaki:{" "}
							<span className="text-orange-400">
								{timeLeft.days}h {timeLeft.hours}j {timeLeft.minutes}m{" "}
								{timeLeft.seconds}s
							</span>
						</p>
					</div>
				</div>
				{/* Left Media Section */}
				<div className="lg:h-[40vh] h-[30vh] overflow-hidden shadow-2xl">
					<div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/60 px-4 py-8 text-center">
						<motion.h1
							initial={{ x: -initialX }}
							whileInView={{ x: 0 }}
							transition={{ duration: 1 }}
							viewport={{ once: true }}
							className="text-2xl md:text-5xl font-bold text-white"
						>
							Kembara Dua Tanah Suci
						</motion.h1>
						<motion.p
							initial={{ x: initialX }}
							whileInView={{ x: 0 }}
							transition={{ duration: 1 }}
							viewport={{ once: true }}
							className="mt-2 text-orange-400 italic text-lg md:text-2xl"
						>
							Perjalanan suci yang mendekatkan hati dan jiwa
						</motion.p>
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ duration: 1 }}
							viewport={{ once: true }}
							className="mt-4"
						>
							<Link href="/KembaraDuaTanahSuci">
								<button className="flex items-center gap-2 px-6 py-2 text-white text-sm md:text-lg rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 shadow-lg hover:shadow-orange-700">
									Lihat Lanjut <FaPaperPlane />
								</button>
							</Link>
						</motion.div>
					</div>
				</div>

				{/* Right Agency Info Section */}
				<div className="py-8 pl-48 pr-24 flex flex-col justify-center rounded-tl-[2rem] -ml-10 z-30 bg-gray-50 shadow-inner">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						viewport={{ once: true }}
					>
						<div className="mb-2">
							<span className="inline-block bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
								Rakan Umrah Terbaik Anda
							</span>
						</div>
						<h2 className="text-xl md:text-4xl font-bold leading-tight mb-2">
							Kembara Muslim{" "}
							<span className="text-orange-600">Travel & Tours</span>
						</h2>
						<p className="text-gray-600 text-xs md:text-sm mb-4 max-w-2xl">
							Kembara Muslim Travel & Tours Sdn Bhd ialah agensi pelancongan
							berlesen yang berpusat di Ayer Hitam, Kedah. Kami menguruskan
							pakej Umrah dan percutian mesra Muslim dengan harga berpatutan dan
							servis yang berkualiti.
						</p>

						<div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
							{[
								{ label: "Pelanggan", value: 10000 },
								{ label: "Penerbangan", value: 2000 },
								{ label: "Tahun", value: 10 },
								{ label: "Pakej", value: 50 },
							].map((item, index) => (
								<div key={index} className="sm:text-center lg:text-left">
									<h3 className="text-xl md:text-2xl font-bold text-orange-600">
										<CountUp end={item.value} duration={2} separator="," />+
									</h3>
									<p className="text-xs text-gray-500 mt-1">{item.label}</p>
								</div>
							))}
						</div>
					</motion.div>

					{/* Coming Soon Feature */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.5 }}
						viewport={{ once: true }}
						className="mt-4 border-t pt-6"
					>
						<ul className="list-disc list-inside text-sm text-gray-600">
							<li>Platform tempahan Umrah digital yang mudah dan pantas</li>
							<li>Pemberitahuan pintar untuk proses pendaftaran & dokumen</li>
							<li>
								Kalendar interaktif untuk memilih tarikh penerbangan yang sesuai
							</li>
						</ul>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
