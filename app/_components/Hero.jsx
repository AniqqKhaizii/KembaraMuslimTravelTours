"use client";
import React, { useEffect } from "react";
import * as motion from "framer-motion/client";
import { FaArrowRightLong } from "react-icons/fa6";
import Threads from "@/components/ui/threads";
import SlideArrowButton from "@/components/animata/button/slide-arrow-button";
const HeroSection = () => {
	//bg-gradient-to-b from-[#c7601d] via-[#ec7222]/60 to-orange-500 from-0% via-60% to-100%
	//clipPath:"polygon(0 0, 100% 0, 100% 100%, 90% 100%, 85% 95%, 15% 95%, 10% 100%, 0 100%)",
	return (
		<section
			className="lg:h-screen h-auto lg:py-32 py-12 lg:mt-0 relative bg-cover bg-center overflow-hidden"
			style={{
				backgroundImage: "url('/Hero/1.jpg')",
				backgroundAttachment: "fixed",
			}}
		>
			{/* bg-gradient-to-b from-transparent via-white/80 to-white */}
			{/* Gradient Overlay */}
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
			<div className="absolute top-0 left-0 w-full h-full opacity-50">
				<Threads amplitude={1} distance={0} enableMouseInteraction={true} />
			</div>
			<div className="w-full h-full px-6 lg:px-12 grid grid-cols-1 lg:items-center lg:gap-0 gap-5 relative z-20">
				{/* Hero Content */}
				<div className="flex flex-col gap-5 items-center justify-center text-center mx-auto w-full">
					<motion.h1
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ ease: "easeInOut", duration: 1 }}
						className="flex flex-col items-center gap-2 w-full font-light font-primary tracking-wide text-white text-3xl sm:text-3xl lg:text-6xl"
					>
						Bersama Anda
						<div className="flex items-center gap-5">
							<span>Menyempurnakan</span>
							<span className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 via-[#ec7222] to-orange-500">
								Umrah
							</span>
						</div>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ ease: "easeInOut", duration: 0.8 }}
						className="flex w-full max-w-4xl  text-gray-100 text-xl tracking-normal lg:font-light font-extralight"
					>
						Menyediakan pengalaman Umrah yang penuh bermakna dan lancar, dengan
						sokongan sepenuh hati dalam setiap langkah perjalanan anda ke Tanah
						Suci.
					</motion.p>
					<div className="flex flex-col sm:flex-row items-center justify-center  gap-4 w-full">
						<motion.a
							initial={{ opacity: 0, x: -200 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ type: "spring", duration: 1 }}
							href="/Pakej"
						>
							<SlideArrowButton />
						</motion.a>
						<motion.a
							initial={{ opacity: 0, x: 200 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ type: "spring", duration: 0.2 }}
							href="/Hubungi"
							className="group px-6 gap-2 items-center h-12 rounded-full border border-gray-100 hover:scale-105 transition-transform text-white bg-transparent hover:bg-white/40 backdrop-blur-sm hover:backdrop-hue-rotate-60 duration-300 ease-linear flex justify-center"
						>
							Hubungi Kami <FaArrowRightLong />
						</motion.a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
