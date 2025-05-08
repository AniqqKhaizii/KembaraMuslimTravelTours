"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 3,
	autoplay: true,
	autoplaySpeed: 5000,
	arrows: false,
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
		<section className="hidden lg:block lg:absolute bottom-56 left-44 w-full max-w-[40rem] px-12">
			<Slider {...settings}>
				{testimonials.map((t, idx) => (
					<div key={idx} className="p-2">
						<div className="flex gap-2 items-center">
							<img
								src={t.profile_photo_url || "default-image-url.jpg"} // Fallback image if not available
								alt={t.author_name}
								className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-white"
							/>
							<div className="flex flex-col">
								<h3 className="text-xs font-semibold text-white drop-shadow-md">
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
			{/* Social Proof */}
			<p className="text-sm lg:text-base text-gray-200 uppercase tracking-wide font-semibold mb-1">
				🌟 Lebih 5,000 jemaah telah memilih kami
			</p>

			<h1
				key={currentSlide}
				className="flex flex-col lg:items-start items-center gap-1 text-center max-w-2xl lg:text-left w-full font-extrabold drop-shadow-lg tracking-wide text-white text-3xl lg:text-5xl"
			>
				{slides[currentSlide].title}
				<span className="text-lg lg:text-2xl font-light text-gray-200">
					{slides[currentSlide].subtitle}
				</span>
			</h1>

			{/* Tags */}
			<div className="lg:mx-0 mx-auto flex flex-wrap lg:flex-row flex-col lg:items-start items-center gap-2 text-xs uppercase tracking-wide font-semibold text-white/80 mt-2">
				{tags.map((tag, index) => (
					<span
						key={index}
						className="px-3 py-1 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm"
					>
						{tag}
					</span>
				))}
			</div>

			<p
				key={"p-" + currentSlide}
				className="flex justify-start self-start max-w-2xl text-gray-200 sm:text-sm lg:text-lg lg:text-left text-center drop-shadow-2xl font-primary mt-4"
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
		<section className="lg:h-[100vh] h-[110vh] relative overflow-hidden lg:py-0 py-12">
			{/* Background */}
			<div className="absolute inset-0 h-[90vh] bg-[url('/BgMainHeroTest.png')] bg-cover lg:bg-right-top bg-top brightness-125"></div>
			<div
				data-scroll
				data-scroll-speed="0.3"
				className="absolute inset-0 h-[100vh] bg-[url('/CloudMainHeroTest.png')] bg-cover lg:bg-right-top bg-top opacity-60"
			></div>
			<div className="lg:hidden absolute inset-0 h-full bg-gradient-to-b from-transparent via-black/50 to-transparent from-0% via-55% to-120%"></div>

			{/* Content */}
			<div className="w-full lg:h-[80vh] h-[100vh] px-6 lg:px-12 grid grid-cols-1 items-center gap-5 relative z-20">
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
							className="lg:w-auto text-sm shadow-md w-full group px-6 py-2 gap-2 items-center rounded-2xl bg-black/90 hover:scale-105 transition-transform text-white backdrop-blur duration-300 ease-in-out flex justify-center"
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
