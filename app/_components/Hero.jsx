"use client";
import React, { useEffect } from "react";
import * as motion from "framer-motion/client";
import { FaArrowRightLong } from "react-icons/fa6";
import Threads from "@/components/ui/threads";
import SlideArrowButton from "@/components/animata/button/slide-arrow-button";
const HeroSection = () => {
	return (
		<section
			className="lg:h-screen h-auto lg:py-32 py-24 lg:mt-0 relative bg-cover bg-center overflow-hidden"
			style={{
				backgroundImage: "url('/Hero/1.jpg')",
				backgroundAttachment: "fixed",
			}}
		>
			<video
				className="absolute top-0 left-0 w-full h-full object-cover"
				autoPlay
				loop
				muted
			>
				<source src="/Videos/HeroUtama.webm" type="video/webm" />
				Your browser does not support the video tag.
			</video>
			<div className="absolute inset-0 h-full bg-black/70"></div>

			<div
				data-aos="fade-up"
				className="w-full h-full px-6 lg:px-12 grid grid-cols-1 lg:items-center lg:gap-0 gap-5 relative z-20"
			>
				{/* Hero Content */}
				<div className="flex flex-col gap-5 items-center justify-center text-center mx-auto w-full">
					<h1 className="flex flex-col items-center gap-2 w-full font-light font-primary tracking-wide text-white text-3xl sm:text-3xl lg:text-6xl">
						Bersama Anda
						<div className="flex items-center gap-5">
							<span>Menyempurnakan</span>
							<span className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 via-[#ec7222] to-orange-500">
								Umrah
							</span>
						</div>
					</h1>
					<p className="flex w-full max-w-4xl  text-gray-100 text-xl tracking-normal lg:font-light font-extralight">
						Menyediakan pengalaman Umrah yang penuh bermakna dan lancar, dengan
						sokongan sepenuh hati dalam setiap langkah perjalanan anda ke Tanah
						Suci.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center  gap-4 w-full">
						<a href="/Pakej">
							<SlideArrowButton />
						</a>
						<a
							href="/Hubungi"
							className="group px-6 gap-2 items-center h-12 rounded-full border border-gray-100 hover:scale-105 transition-transform text-white bg-transparent hover:bg-white/40 backdrop-blur-sm hover:backdrop-hue-rotate-60 duration-300 ease-linear flex justify-center"
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
