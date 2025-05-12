"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SplitText from "@/components/animata/text/split-text";

const settings = {
	dots: false,
	infinite: true,
	speed: 500,
	easing: "linear",
	slidesToShow: 3,
	autoplay: true,
	autoplaySpeed: 3000,
	arrows: false,
	lazyLoad: "ondemand",
	cssEase: "linear",
	pauseOnHover: true,
};

const slides = [
	{
		title: "Rancang Umrah Anda Dengan Tenang",
		subtitle: "Dipercayai 5,000+ Jemaah",
		paragraph:
			"Capai Umrah yang sempurna tanpa tekanan. Kami uruskan setiap aspek perjalanan anda dari dokumen hingga ibadah agar anda dapat fokus pada apa yang benar-benar penting, ketenangan hati dan jiwa.",
		bgImage: "/Hero/HeroLatest1.jpg",
	},
	{
		title: "Mulakan Langkah Menuju Tanah Suci",
		subtitle: "Dengan Panduan Profesional",
		paragraph:
			"Kami bimbing anda dari A to Z dengan perkhidmatan menyeluruh, sokongan penuh dan pengalaman Umrah yang mendalam serta bermakna.",
		bgImage: "/Hero/HeroLatest.jpg",
	},
	{
		title: "Umrah Yang Terancang & Bermakna",
		subtitle: "Dari Pakej Hingga Doa",
		paragraph:
			"Dapatkan pengalaman rohani yang diuruskan rapi dengan jadual fleksibel, penginapan selesa, dan sokongan mutlak dari pasukan yang peduli.",
		bgImage: "/Hero/HeroMain2.jpg",
	},
];

const tags = [
	"Dipercayai Ribuan Jemaah",
	"Perkhidmatan Lengkap",
	"Sokongan Berterusan",
	"Pakej Fleksibel",
];

const TestimonialCarousel = () => {
	const [testimonials, setTestimonials] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTestimonials = async () => {
			const placeId = "ChIJQ8MnC_FgSzAR0DHPST0ERtM";

			if (!placeId) {
				setError("Missing place_id");
				return;
			}

			const googleApiUrl = `/api/getReviews?place_id=${placeId}&language=ms`;

			try {
				const response = await fetch(googleApiUrl);
				if (!response.ok) {
					throw new Error("Failed to fetch reviews");
				}

				const data = await response.json();
				setTestimonials(data.result.reviews || []);
			} catch (error) {
				console.error("Error fetching reviews:", error);
				setError("Error fetching reviews");
			}
		};

		fetchTestimonials();
	}, []);

	return (
		<section className="hidden lg:block overflow-hidden absolute bottom-40 lg:left-44 left-32 w-full max-w-[40rem] py-12 lg:mx-12 mx-auto border-t-2 border-kmtt-text">
			<Slider {...settings}>
				{testimonials.map((t, idx) => (
					<div key={idx} className="p-2">
						<div className="flex gap-2 items-center">
							<img
								src={
									t.profile_photo_url ||
									"https://img.icons8.com/?size=100&id=gYI9v0NbFgxC&format=png&color=000000"
								}
								alt={t.author_name}
								className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-white"
							/>
							<div className="flex flex-col">
								<h3 className="text-xs font-semibold text-kmtt-neutral drop-shadow-md">
									{t.author_name}
								</h3>
								<p className="text-xs text-gray-500">{t.author_location}</p>
								<div className="text-yellow-500 text-sm drop-shadow-sm">
									{"★".repeat(t.rating)}
									{"☆".repeat(5 - t.rating)}
								</div>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</section>
	);
};

const HeroCarousel = ({ currentSlide }) => {
	return (
		<>
			{/* Tags */}
			<div className="lg:mx-0 mx-auto max-w-3xl flex flex-wrap lg:flex-row flex-col lg:items-start items-center gap-2 text-xs uppercase tracking-wide font-semibold text-kmtt-contrast mt-2 overflow-hidden">
				{tags.map((tag, index) => (
					<span
						key={index}
						className="px-3 py-1 rounded-full border border-white/40 bg-white/40 backdrop-blur-sm"
					>
						{tag}
					</span>
				))}
			</div>

			<h1
				key={currentSlide}
				className="lg:mx-0 mx-auto flex flex-col lg:items-start items-center text-center max-w-2xl lg:text-left w-full font-semibold drop-shadow-lg tracking-wide text-kmtt-text text-3xl lg:text-5xl overflow-hidden"
			>
				<SplitText
					text={slides[currentSlide].title}
					className="font-semibold"
					delay={50}
					animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
					animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
					easing="easeOutCubic"
					threshold={0.8}
				/>
				{/* <span className="text-lg lg:text-2xl font-light text-kmtt-text">
					{slides[currentSlide].subtitle}
				</span> */}
			</h1>

			<p
				key={"p-" + currentSlide}
				className="lg:mx-0 mx-auto flex justify-start self-start max-w-lg text-kmtt-text sm:text-sm lg:text-lg lg:text-justify text-center drop-shadow-2xl font-primary mt-2 overflow-hidden"
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
		<section className="lg:h-[100vh] h-[110vh] relative">
			{/* Background */}
			<div
				data-scroll
				data-scroll-speed="0.5"
				className="absolute inset-0 h-[100vh] bg-[url('/BgMainHero.png')] bg-cover lg:bg-right-top bg-top brightness-100"
			></div>
			<div
				data-scroll
				data-scroll-speed="0.6"
				className="absolute inset-0 h-[100vh] bg-[url('/CloudMainHero.png')] bg-cover lg:bg-right-top bg-top opacity-50 blur-[2px]"
			></div>
			<div className="lg:hidden absolute inset-0 h-full bg-gradient-to-b from-transparent via-black/50 to-transparent from-0% via-55% to-120%"></div>

			{/* Content */}
			<div className="w-full h-[80vh] px-6 lg:px-12 grid grid-cols-1 items-center gap-5 relative z-20">
				<div className="flex flex-col gap-4 items-start justify-start text-center mx-auto max-w-screen-xl w-full">
					<HeroCarousel currentSlide={currentSlide} />

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row items-start justify-start gap-2 w-full mt-4">
						<a
							href="/Hubungi"
							className="lg:w-auto text-sm w-full group px-6 py-2 gap-2 items-center rounded-2xl bg-white hover:scale-105 transition-transform text-black duration-300 ease-in-out flex justify-center shadow-md"
						>
							Hubungi
						</a>
						<a
							href="/Pakej"
							className="lg:w-auto text-sm shadow-md w-full group px-6 py-2 gap-2 items-center rounded-2xl bg-kmtt-contrast hover:scale-105 transition-transform text-white backdrop-blur duration-300 ease-in-out flex justify-center"
						>
							Pilih Pakej Anda <FaArrowRightLong />
						</a>
					</div>
				</div>
			</div>
			<TestimonialCarousel />
		</section>
	);
};

export default HeroSection;
