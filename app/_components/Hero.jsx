"use client";
import React, { useEffect } from "react";
import * as motion from "framer-motion/client";
import { FaArrowRightLong } from "react-icons/fa6";
import Threads from "@/components/ui/threads";
import SlideArrowButton from "@/components/animata/button/slide-arrow-button";
const HeroSection = () => {
	return (
		<section className="lg:h-screen h-auto lg:py-32 py-24 lg:mt-0 relative bg-white bg-cover bg-center overflow-hidden">
			<video
				className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
				autoPlay
				loop
				muted
			>
				<source src="/Videos/HeroUtama1.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="absolute inset-0 h-full bg-gradient-to-b from-white via-white to-transparent from-5% via-25% to-100%"></div>

			<div
				data-aos="fade-up"
				className="w-full h-full px-12 lg:px-12 grid grid-cols-1 lg:items-center gap-5 relative z-20"
			>
				{/* Hero Content */}
				<div className="flex flex-col gap-6 items-center justify-center text-center mx-auto w-full">
					<h1 className="flex flex-col items-center lg:gap-3 gap-0 w-full font-bold drop-shadow-xl font-primary tracking-wide text-gray-600 text-2xl lg:text-6xl">
						Bersama Anda
						<div className="flex items-center gap-2">
							<span>Menyempurnakan</span>
							<span className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 via-[#ec7222] to-orange-500">
								Umrah
							</span>
						</div>
					</h1>

					<p className="max-w-4xl lg:text-gray-100 text-gray-900 text-lg lg:text-xl font-light leading-relaxed font-primary drop-shadow-2xl">
						Kami komited untuk menyediakan pengalaman Umrah yang lancar, selesa,
						dan penuh makna — dengan sokongan menyeluruh di setiap langkah
						perjalanan anda ke Tanah Suci.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
						<a href="/Pakej">
							<SlideArrowButton />
						</a>
						<a
							href="/Hubungi"
							className="group px-6 py-3 gap-2 items-center rounded-full border border-white hover:scale-105 transition-transform text-white bg-transparent hover:bg-white/20 backdrop-blur duration-300 ease-in-out flex justify-center"
						>
							Hubungi Kami <FaArrowRightLong />
						</a>
					</div>
				</div>
			</div>

			<div
				data-aos="fade-right"
				className="absolute bottom-0 left-0 lg:h-[45vh] h-[15vh] flex items-end justify-end"
			>
				<img
					src="/2.png"
					alt="Logo"
					className="w-full h-full object-contain drop-shadow-2xl"
				/>
			</div>
		</section>
	);
};

export default HeroSection;
