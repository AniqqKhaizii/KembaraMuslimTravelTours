"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function UpcomingDeparture() {
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

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
			className="relative text-center h-[20vh] py-10 overflow-hidden shadow-inner"
		>
			{/* <div className="absolute top-0 left-0 w-full h-full bg-[url('/Hero/KembaraDuaTanahSuci.jpg')] bg-fixed bg-cover bg-right-top"></div>

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
			</video> */}
		</motion.div>
	);
}
