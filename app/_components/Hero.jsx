"use client";
import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import SlideArrowButton from "@/components/animata/button/slide-arrow-button";

const HeroCarousel = () => {
	const slides = [
		{
			title: "Bersama Anda",
			subtitle: " Umrah",
			paragraph:
				"Kami komited untuk menyediakan pengalaman Umrah yang lancar, selesa, dan penuh makna dengan sokongan menyeluruh di setiap langkah perjalanan anda ke Tanah Suci.",
		},
		{
			title: "Perjalanan Suci",
			subtitle: " Sini",
			paragraph:
				"Mulakan perjalanan suci anda bersama kami, dengan perkhidmatan profesional yang mengutamakan keselesaan dan ketenangan jiwa sepanjang Umrah anda.",
		},
		{
			title: "Pengalaman Terbaik",
			subtitle: " Makna",
			paragraph:
				"Nikmati pengalaman Umrah yang dirancang rapi, penuh keberkatan, dan memberi makna mendalam dalam setiap detik perjalanan ibadah anda.",
		},
	];

	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 10000);

		return () => clearInterval(interval);
	}, [slides.length]);

	return (
		<>
			<h1
				key={currentSlide}
				className="flex flex-col items-center gap-0 text-center w-full font-extrabold drop-shadow-lg tracking-wide text-white text-3xl lg:text-5xl animate-popUp"
			>
				{slides[currentSlide].title}
				<div className="flex lg:flex-row flex-col lg:items-center items-start gap-2 animate-fadeUp delay-200">
					<span>
						{currentSlide === 0
							? "Menyempurnakan"
							: currentSlide === 1
							? "Bermula Di"
							: "Umrah Penuh"}
					</span>
					<span className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-600 via-[#ec7222] to-orange-500">
						{slides[currentSlide].subtitle}
					</span>
				</div>
			</h1>

			<p
				key={"p-" + currentSlide}
				className="flex justify-center self-center max-w-xl text-gray-200 sm:text-sm md:text-md lg:text-lg text-center leading-relaxed drop-shadow-2xl font-primary animate-fadeUp"
			>
				{slides[currentSlide].paragraph}
			</p>
		</>
	);
};

const HeroSection = () => {
	return (
		<section className="h-screen lg:py-32 py-12 lg:mt-0 relative bg-cover bg-center overflow-hidden">
			{/* <video
				className="absolute top-0 left-0 w-full h-full object-cover"
				autoPlay
				loop
				muted
			>
				<source src="/Videos/HeroUtama1.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video> */}
			<img
				className="absolute top-0 left-0 w-full h-full object-cover object-left"
				src="/Hero/HeroLatest1.jpg"
			/>
			<div className="absolute inset-0 h-full backdrop-blur-md backdrop-brightness-50"></div>

			<div
				data-aos="fade-up"
				className="w-full h-full px-12 lg:px-12 grid grid-cols-1 items-center gap-5 relative z-20 "
			>
				{/* Hero Content */}
				<div className="flex flex-col gap-6 items-start justify-center text-center mx-auto max-w-screen-xl w-full">
					<HeroCarousel />

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
						<a href="/Pakej" className="lg:w-auto w-full text-center">
							<SlideArrowButton className="w-full" />
						</a>
						<a
							href="/Hubungi"
							className="lg:w-auto w-full group px-6 py-2 gap-2 items-center rounded-2xl bg-white/30 border border-white hover:scale-105 transition-transform text-gray-200  hover:bg-white/20 backdrop-blur duration-300 ease-in-out flex justify-center"
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
