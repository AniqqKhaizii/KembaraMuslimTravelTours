import React from "react";
import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
const Banner = () => {
	return (
		<div className="bg-gradient-to-r from-amber-600 to-orange-400 px-6 py-2 text-white sm:flex sm:items-center sm:justify-between sm:px-10 lg:px-64 font-primary text-sm">
			<div className="flex items-center gap-2">
				<span className="opacity-90">Email:</span>
				<a
					href="mailto:kembaramuslim7520@gmail.com"
					className="hover:text-blue-700 underline underline-offset-2 transition duration-200"
				>
					kembaramuslim7520@gmail.com
				</a>
			</div>

			<div className="mt-3 flex items-center gap-6 sm:mt-0 text-2xl">
				<a href="https://wa.me/6281286555555">
					<FaWhatsapp />
				</a>
				<a href="https://wa.me/6281286555555">
					<FaInstagram />
				</a>
				<a href="https://wa.me/6281286555555" className="text-xl">
					<FaTiktok />
				</a>
			</div>
		</div>
	);
};

export default Banner;
