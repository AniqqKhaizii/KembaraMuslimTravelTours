"use client";
import React, { useEffect } from "react";
import * as motion from "framer-motion/client";
import { FaArrowRightLong } from "react-icons/fa6";
import Threads from "@/components/ui/threads";
import SlideArrowButton from "@/components/animata/button/slide-arrow-button";
const HeroSection = () => {
	return (
		<section className="h-screen lg:py-32 py-12 lg:mt-0 relative bg-cover bg-center overflow-hidden">
			<video
				className="absolute top-0 left-0 w-full h-full object-cover"
				autoPlay
				loop
				muted
			>
				<source src="/Videos/HeroUtama1.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="absolute inset-0 h-full bg-gradient-to-b from-white via-white to-transparent from-0% via-5% to-%"></div>
			<div className="absolute inset-0 h-full bg-gradient-to-r from-white/90 via-white/90 to-transparent from-0% via-5% to-75%"></div>

			<div
				data-aos="fade-up"
				className="w-full h-full px-12 lg:px-12 grid grid-cols-1 items-center gap-5 relative z-20"
			>
				{/* Hero Content */}
				<div className="flex flex-col gap-6 items-start justify-center text-center mx-auto max-w-screen-xl w-full">
					<h1 className="flex flex-col items-start gap-0 w-full font-bold drop-shadow-lg drop-shadow-black tracking-wide text-gray-900 text-4xl lg:text-7xl font-header">
						Bersama Anda
						<div className="flex lg:flex-row flex-col items-center gap-2">
							<span>Menyempurnakan</span>
							<span className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 via-[#ec7222] to-orange-500">
								Umrah
							</span>
						</div>
					</h1>

					<p className="max-w-4xl text-gray-900 text-lg lg:text-xl text-left leading-relaxed font-light font-primary drop-shadow-2xl">
						Kami komited untuk menyediakan pengalaman Umrah yang lancar, selesa,
						dan penuh makna — dengan sokongan menyeluruh di setiap langkah
						perjalanan anda ke Tanah Suci.
					</p>

					<div className="flex flex-col sm:flex-row items-start justify-start gap-4 w-full">
						<a href="/Pakej" className="lg:w-auto w-full text-center">
							<SlideArrowButton className="w-full" />
						</a>
						<a
							href="/Hubungi"
							className="lg:w-auto w-full group px-6 py-2 gap-2 items-center rounded-full bg-white/30 border border-white hover:scale-105 transition-transform text-gray-800  hover:bg-white/20 backdrop-blur duration-300 ease-in-out flex justify-center"
						>
							Hubungi Kami <FaArrowRightLong />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
