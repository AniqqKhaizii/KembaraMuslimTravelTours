"use client";
import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import SlideArrowButton from "@/components/animata/button/slide-arrow-button";

const slides = [
	{
		title: "Bersama Anda",
		subtitle: " Umrah",
		paragraph:
			"Kami komited untuk menyediakan pengalaman Umrah yang lancar, selesa, dan penuh makna dengan sokongan menyeluruh di setiap langkah perjalanan anda ke Tanah Suci.",
		bgImage: "/Hero/HeroLatest1.jpg",
	},
	{
		title: "Perjalanan Suci",
		subtitle: " Sini",
		paragraph:
			"Mulakan perjalanan suci anda bersama kami, dengan perkhidmatan profesional yang mengutamakan keselesaan dan ketenangan jiwa sepanjang Umrah anda.",
		bgImage: "/Hero/HeroLatest.jpg",
	},
	{
		title: "Pengalaman Terbaik",
		subtitle: " Makna",
		paragraph:
			"Nikmati pengalaman Umrah yang dirancang rapi, penuh keberkatan, dan memberi makna mendalam dalam setiap detik perjalanan ibadah anda.",
		bgImage: "/Hero/HeroMain2.jpg",
	},
];

const HeroCarousel = ({ currentSlide }) => {
	return (
		<>
			<h1
				key={currentSlide}
				className="flex flex-col lg:items-start items-center gap-0 text-center w-full font-extrabold drop-shadow-lg tracking-wide text-white text-3xl lg:text-5xl"
			>
				{slides[currentSlide].title}
				<div className="flex lg:flex-row flex-col lg:items-center items-center gap-2">
					<span>
						{currentSlide === 0
							? "Menyempurnakan"
							: currentSlide === 1
							? "Bermula Di"
							: "Umrah Penuh"}
					</span>
					<span className="font-reenie text-7xl drop-shadow-2xl  animate-fadeUp">
						{slides[currentSlide].subtitle}
					</span>
				</div>
			</h1>

			<p
				key={"p-" + currentSlide}
				className="flex justify-start self-start max-w-2xl text-gray-200 sm:text-sm lg:text-lg lg:text-left text-center drop-shadow-2xl font-primary"
			>
				{slides[currentSlide].paragraph}
			</p>
		</>
	);
};

const HeroSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="lg:h-[100vh] h-[110vh] relative overflow-hidden">
			<div className="absolute inset-0 h-[90vh] bg-[url('/BgMainHero.png')] bg-cover lg:bg-right-top bg-top brightness-125"></div>
			<div
				data-scroll
				data-scroll-speed="0.3"
				className="absolute inset-0 h-[100vh] bg-[url('/CloudMainHero.png')] bg-cover lg:bg-right-top bg-top opacity-60"
			></div>
			<div className="lg:hidden absolute inset-0 h-full bg-gradient-to-b from-transparent via-black/50 to-transparent from-0% via-55% to-120%"></div>

			<div
				// data-aos="fade-up"

				className="w-full lg:h-[80vh] h-[90vh] px-12 lg:px-12 grid grid-cols-1 items-center gap-5 relative z-20"
			>
				<div className="flex flex-col gap-6 items-start justify-start text-center mx-auto max-w-screen-xl w-full">
					<HeroCarousel currentSlide={currentSlide} />

					<div className="flex flex-col sm:flex-row items-start justify-start gap-4 w-full">
						<a href="/Pakej" className="lg:w-auto w-full text-center">
							<SlideArrowButton className="w-full text-sm" />
						</a>
						<a
							href="/Hubungi"
							className="lg:w-auto text-sm w-full group px-6 py-2 gap-2 items-center rounded-2xl bg-white/30 border border-white hover:scale-105 transition-transform text-gray-200 hover:bg-white/20 backdrop-blur duration-300 ease-in-out flex justify-center"
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
