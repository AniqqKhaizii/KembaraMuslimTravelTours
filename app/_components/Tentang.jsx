"use client";
import Image from "next/image";
import CountUp from "react-countup";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import { FaPaperPlane } from "react-icons/fa";
import { ImageDown } from "lucide-react";

export default function HeroSection() {
	const [initialX, setInitialX] = useState(50);

	useEffect(() => {
		const handleResize = () => {
			setInitialX(window.innerWidth < 768 ? 50 : 500);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, [initialX]);

	return (
		<section className="grid lg:grid-cols-2 grid-cols-1 py-2 bg-white text-gray-800 shadow-inner">
			<div className="lg:mx-6 mx-4 h-[40vh] relative overflow-hidden z-0 rounded-3xl shadow-lg">
				{/* Background Image */}
				<div className="absolute top-0 left-0 w-full h-full bg-[url('/Hero/KembaraDuaTanahSuci.jpg')] bg-fixed bg-cover bg-right-top"></div>

				{/* Video with gradient mask */}
				<img
					src="/Tentang/1.jpg"
					className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
					style={{
						maskImage: "linear-gradient(to right, transparent, black 100%)",
						WebkitMaskImage:
							"linear-gradient(to right, transparent, black 100%)",
					}}
				></img>

				{/* Content Section */}
				<div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-10 md:p-24 text-center bg-black/70">
					<motion.h1
						initial={{ scale: 0 }}
						whileInView={{ scale: 1 }}
						transition={{ ease: "easeInOut", duration: 1 }}
						viewport={{ once: true, amount: 0.2 }}
						className="flex justify-center items-center"
					>
						<img src="/LOGOKMTT.png" className="w-1/2" />
					</motion.h1>
				</div>
			</div>
			<div className="max-w-5xl mx-32 grid grid-cols-1 items-center gap-12">
				{/* Right: Text */}
				<div className="space-y-6">
					<span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm tracking-wide">
						Rakan Umrah Terbaik Anda
					</span>
					<h1 className="text-4xl lg:text-5xl font-bold leading-snug tracking-tight">
						Kembara Muslim{" "}
						<span className="text-orange-600">Travel & Tours</span>
					</h1>
					<p className="text-sm text-justify text-gray-700">
						Kembara Muslim Travel & Tours Sdn Bhd ialah agensi pelancongan
						berlesen yang berpusat di Ayer Hitam, Kedah. Kami menguruskan pakej
						Umrah dan percutian mesra Muslim dengan harga berpatutan dan servis
						yang berkualiti.
					</p>

					{/* Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
						{[
							{ label: "Pelanggan", value: 10000 },
							{ label: "Penerbangan", value: 2000 },
							{ label: "Tahun", value: 10 },
							{ label: "Pakej", value: 50 },
						].map((item, idx) => (
							<div key={idx}>
								<h3 className="text-2xl font-bold text-orange-600">
									<CountUp end={item.value} duration={2} separator="," />+
								</h3>
								<p className="text-xs text-gray-500 mt-1">{item.label}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
