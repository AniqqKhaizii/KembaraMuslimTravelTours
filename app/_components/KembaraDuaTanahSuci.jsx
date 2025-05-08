"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import { FaPaperPlane } from "react-icons/fa";
const KembaraDuaTanahSuci = () => {
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
		<div className="sm:mx-6 mx-4 lg:h-[40vh] h-[15vh] relative overflow-hidden z-0 rounded-3xl">
			{/* Background Image */}
			<div className="absolute top-0 left-0 w-full h-full bg-[url('/Hero/KembaraDuaTanahSuci.jpg')] bg-fixed bg-cover bg-right-top"></div>

			{/* Video with gradient mask */}
			<video
				className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
				autoPlay
				loop
				muted
				style={{
					maskImage: "linear-gradient(to right, transparent, black 100%)",
					WebkitMaskImage: "linear-gradient(to right, transparent, black 100%)",
				}}
			>
				<source src="/Videos/KembaraDuaTanahSuci.mp4" type="video/mp4" />
			</video>

			{/* Content Section */}
			<div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-2 md:p-24 text-center bg-black/70">
				<motion.h1
					initial={{ x: -initialX }}
					whileInView={{ x: 0 }}
					transition={{ ease: "easeInOut", duration: 1 }}
					viewport={{ once: true, amount: 0.2 }}
					className="text-xl md:text-7xl font-medium text-white"
				>
					Kembara Dua Tanah Suci
				</motion.h1>
				<motion.p
					initial={{ x: initialX }}
					whileInView={{ x: 0 }}
					transition={{ ease: "easeInOut", duration: 1 }}
					viewport={{ once: true, amount: 0.2 }}
					className="lg:block hidden text-md md:text-4xl text-orange-500 font-reenie italic mt-3"
				>
					Perjalanan suci yang mendekatkan hati dan jiwa
				</motion.p>
				<motion.div
					initial={{ x: -initialX }}
					whileInView={{ x: 0 }}
					transition={{ ease: "easeInOut", duration: 1 }}
					viewport={{ once: true, amount: 0.2 }}
					className="lg:mt-5 mt-1"
				>
					<Link href="/KembaraDuaTanahSuci">
						<button className="lg:text-lg text-xs relative flex items-center gap-2 px-5 py-1.5 font-regular text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-md shadow-orange-500/30 hover:from-red-500 hover:to-orange-500 hover:shadow-orange-600/40 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
							Lihat Lanjut <FaPaperPlane />
						</button>
					</Link>
				</motion.div>
			</div>
		</div>
	);
};

export default KembaraDuaTanahSuci;
