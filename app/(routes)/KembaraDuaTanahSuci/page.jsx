"use client";
import React, { useLayoutEffect, useRef } from "react";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Button } from "@/components/ui/button";
import { MdArrowBackIos } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { LayoutGrid } from "@/components/ui/layout-grid";

import { WorldMap } from "@/components/ui/world-map";

gsap.registerPlugin(ScrollTrigger);

const Section1 = ({ scrollYProgress }) => {
	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
	const links = [
		{ name: "Utama", href: "/" },
		{ name: "Agent", href: "#Agent" },
	];
	const images = [
		"https://picsum.photos/400/400?grayscale",
		"/AdminMainBg4.jpg",
		"https://picsum.photos/600/600?grayscale",
		"https://picsum.photos/700/700?grayscale",
		"https://picsum.photos/300/300?grayscale",
	];

	const SkeletonOne = () => {
		return (
			<div>
				<p className="font-bold md:text-4xl text-xl text-white">
					House in the woods
				</p>
				<p className="font-normal text-base text-white"></p>
				<p className="font-normal text-base my-4 max-w-lg text-neutral-200">
					A serene and tranquil retreat, this house in the woods offers a
					peaceful escape from the hustle and bustle of city life.
				</p>
			</div>
		);
	};

	const SkeletonTwo = () => {
		return (
			<div>
				<p className="font-bold md:text-4xl text-xl text-white">
					House above the clouds
				</p>
				<p className="font-normal text-base text-white"></p>
				<p className="font-normal text-base my-4 max-w-lg text-neutral-200">
					Perched high above the world, this house offers breathtaking views and
					a unique living experience. It&apos;s a place where the sky meets
					home, and tranquility is a way of life.
				</p>
			</div>
		);
	};
	const SkeletonThree = () => {
		return (
			<div>
				<p className="font-bold md:text-4xl text-xl text-white">
					Greens all over
				</p>
				<p className="font-normal text-base text-white"></p>
				<p className="font-normal text-base my-4 max-w-lg text-neutral-200">
					A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
					perfect place to relax, unwind, and enjoy life.
				</p>
			</div>
		);
	};
	const SkeletonFour = () => {
		return (
			<div>
				<p className="font-bold md:text-4xl text-xl text-white">
					Rivers are serene
				</p>
				<p className="font-normal text-base text-white"></p>
				<p className="font-normal text-base my-4 max-w-lg text-neutral-200">
					A house by the river is a place of peace and tranquility. It&apos;s
					the perfect place to relax, unwind, and enjoy life.
				</p>
			</div>
		);
	};

	const cards = [
		{
			id: 1,
			content: <SkeletonOne />,
			className: "md:col-span-2",
			thumbnail:
				"https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			id: 2,
			content: <SkeletonTwo />,
			className: "col-span-1",
			thumbnail:
				"https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			id: 3,
			content: <SkeletonThree />,
			className: "col-span-1",
			thumbnail:
				"https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			id: 4,
			content: <SkeletonFour />,
			className: "md:col-span-2",
			thumbnail:
				"https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
	];

	return (
		<motion.section style={{ scale, rotate }} className="sticky top-0 h-screen">
			<video
				className="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
				autoPlay
				loop
				muted
				playsInline
			>
				<source src="/Videos/KembaraDuaTanahSuciHero.mp4" type="video/mp4" />
			</video>
			<div className="absolute inset-0 bg-black/30 -z-10" />
			<header className="absolute top-3 left-0 w-full z-20">
				<div className="px-6 flex items-center justify-between border-b border-white/30 pb-3">
					<Button
						variant="link"
						size="icon"
						onClick={() => window.history.back()}
						className="text-white text-xl"
					>
						<span className="sr-only">Menu</span>
						<MdArrowBackIos className="w-12 h-12" />
					</Button>
					<nav className="flex gap-6 text-white text-sm font-medium">
						{links.map((link) => (
							<a key={link.name} href={link.href} className="hover:underline">
								{link.name}
							</a>
						))}
					</nav>
				</div>
			</header>

			<div className="relative h-full grid grid-cols-2 text-left">
				<div className="space-y-2 m-32">
					<BoxReveal boxColor="#f97316" duration={0.6}>
						<h2 className="text-white text-5xl md:text-7xl font-semibold leading-tight tracking-tight">
							Kembara Dua <span className="text-kmtt-primary">Tanah Suci</span>
						</h2>
					</BoxReveal>

					<BoxReveal boxColor="#f97316" duration={0.7}>
						<p className="text-white text-lg md:text-2xl font-extralight">
							Menyingkap keindahan iman di{" "}
							<span className="bg-orange-600 px-4 rounded-md text-white">
								Tanah Suci
							</span>
						</p>
					</BoxReveal>

					<BoxReveal boxColor="#f97316" duration={0.8}>
						<p className="text-white text-sm md:text-base max-w-xl mx-auto font-extralight font-primary leading-relaxed">
							Sertai perjalanan rohani penuh makna ke Makkah dan Madinah, serta
							destinasi Islamik terpilih. Nikmati pakej umrah & pelancongan
							dengan bimbingan profesional dan keselesaan terjamin.
						</p>
					</BoxReveal>
				</div>
				<div className="h-1/2 self-end">
					<LayoutGrid cards={cards} />
				</div>
			</div>
		</motion.section>
	);
};

const Section2 = ({ scrollYProgress }) => {
	const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
	const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
	return (
		<motion.div
			style={{ scale, rotate }}
			className="relative bg-red-600 h-screen z-10"
		>
			<WorldMap
				dots={[
					{
						start: {
							lat: 64.2008,
							lng: -149.4937,
						}, // Alaska (Fairbanks)
						end: {
							lat: 34.0522,
							lng: -118.2437,
						}, // Los Angeles
					},
					{
						start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
						end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
					},
					{
						start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
						end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
					},
					{
						start: { lat: 51.5074, lng: -0.1278 }, // London
						end: { lat: 28.6139, lng: 77.209 }, // New Delhi
					},
					{
						start: { lat: 28.6139, lng: 77.209 }, // New Delhi
						end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
					},
					{
						start: { lat: 28.6139, lng: 77.209 }, // New Delhi
						end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
					},
				]}
			/>
			<div className="absolute bottom-8 left-20 min-w-[36rem] p-6 blur-3xl rounded-full h-48 bg-kmtt-text"></div>
			<div className="absolute bottom-10 left-20 max-w-xl p-6">
				<h1 className="text-kmtt-contrast text-3xl md:text-5xl font-semibold">
					Mengahayati Keajaiban di Seluruh Dunia
				</h1>
			</div>
		</motion.div>
	);
};

const partners = [
	{ name: "Al-Haram Travel", logo: "/Partners/kmtt.png" },
	{ name: "UmrahGo", logo: "/Partners/kmtt.png" },
	{ name: "Safa Marwah Tours", logo: "/Partners/kmtt.png" },
	{ name: "Makkah Express", logo: "/Partners/kmtt.png" },
	{ name: "Raudhah Travel", logo: "/Partners/kmtt.png" },
	{ name: "Zamzam Voyages", logo: "/Partners/kmtt.png" },
];

const Section3 = () => {
	return (
		<section className="relative h-screen bg-[url('/Facebook/6.jpg')] bg-cover bg-no-repeat text-white flex flex-col items-center justify-center px-6">
			<div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-blue-50/50 to-transparent from-0% via-35% to-50% backdrop-brightness-50"></div>
			<h2 className="absolute top-1/2 left-10 text-3xl md:text-5xl font-semibold mb-8 text-kmtt-text text-center">
				RAKAN PELANCONGAN KAMI
			</h2>
			<div className="absolute right-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
				{partners.map((partner, index) => (
					<div
						key={index}
						className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm p-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
					>
						<img
							src={partner.logo}
							alt={partner.name}
							className="h-20 object-contain mb-3"
						/>
						<p className="text-sm text-center text-white">{partner.name}</p>
					</div>
				))}
			</div>
		</section>
	);
};

const Pakej = () => {
	const container = useRef();
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end 100vh"],
	});
	return (
		<main>
			<div ref={container} className="relative min-h-[200vh] bg-black">
				<Section1 scrollYProgress={scrollYProgress} />
				<Section2 scrollYProgress={scrollYProgress} />
			</div>
			<Section3 />
		</main>
	);
};

export default Pakej;
