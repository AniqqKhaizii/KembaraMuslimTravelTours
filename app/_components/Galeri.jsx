"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as motion from "framer-motion/client";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { FaPaperPlane } from "react-icons/fa";

const imagesArray = [
	{
		src: "/Galeri/Galeri1.jpg",
	},
	{
		src: "/Galeri/Galeri2.jpg",
	},
	{
		src: "/Galeri/Galeri3.jpg",
	},
	{
		src: "/Galeri/Galeri4.jpg",
	},
	{
		src: "/Galeri/Galeri5.jpg",
	},
	{
		src: "/Galeri/Galeri6.jpg",
	},
	{
		src: "/Galeri/Galeri7.jpg",
	},
	{
		src: "/Galeri/Galeri8.jpg",
	},
	{
		src: "/Galeri/Galeri9.jpg",
	},
	{
		src: "/Galeri/Galeri10.jpg",
	},
	{
		src: "/Galeri/Galeri11.jpg",
	},
	{
		src: "/Galeri/Galeri12.jpg",
	},
	{
		src: "/Galeri/Galeri4.jpg",
	},
	{
		src: "/Galeri/Galeri5.jpg",
	},
	{
		src: "/Galeri/Galeri6.jpg",
	},
	{
		src: "/Galeri/Galeri7.jpg",
	},
	{
		src: "/Galeri/Galeri8.jpg",
	},
	{
		src: "/Galeri/Galeri9.jpg",
	},
	{
		src: "/Galeri/Galeri10.jpg",
	},
	{
		src: "/Galeri/Galeri11.jpg",
	},
	{
		src: "/Galeri/Galeri12.jpg",
	},
];
const Galeri = () => {
	gsap.registerPlugin(ScrollTrigger);

	const [index, setIndex] = useState(-1);
	const galleryRefs = useRef([]);

	const rows = [];
	const imagesPerRow = 7;
	for (let i = 0; i < imagesArray.length; i += imagesPerRow) {
		rows.push(imagesArray.slice(i, i + imagesPerRow));
	}

	useLayoutEffect(() => {
		const isDesktop = window.innerWidth >= 768;
		if (!isDesktop) return;

		const gallerySection = galleryRefs.current;
		if (!gallerySection) return;

		galleryRefs.current.forEach((row, index) => {
			if (!row) return;
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: gallerySection,
					start: "top-=250 bottom",
					end: "bottom+=1080 top",
					scrub: true,
				},
			});
			const direction = index % 2 === 0 ? row.scrollWidth : -row.scrollWidth;
			tl.to(row, {
				x: -direction / 5,
				ease: "none",
				duration: 10,
			});
		});
	}, []);

	return (
		<section className="relative bg-kmtt-text px-2 py-8 sm:pb-40 text-slate-900  overflow-x-hidden">
			<div className="mx-auto max-w-screen-2xl flex lg:flex-row  flex-col lg:gap-0 gap-4 lg:justify-between justify-center items-center lg:items-end py-2 w-full">
				<div className="px-2 flex flex-col lg:justify-between lg:items-start items-center">
					<p className="text-gray-700 font-reenie text-2xl font-semibold">
						Where Adventure Meets Faith
					</p>
					<h2 className="text-3xl max-w-7xl font-bold tracking-tighter sm:text-5xl text-orange-600">
						Galeri Kembara Muslim
					</h2>
				</div>

				<button className="group border border-orange-500 rounded-lg lg:px-4 lg:py-3 px-3 py-1 lg:w-auto w-32 text-orange-600 group">
					<a href="/Galeri" className="flex items-center gap-2 font-semibold">
						<span className="shrink-0 text-base group-hover:translate-x-1 transition-all duration-200 font-primary">
							Lihat semua
						</span>
						<FaPaperPlane className="text-sm group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-200" />
					</a>
				</button>
			</div>
			<hr className="mx-auto max-w-screen-2xl w-full h-[2px] bg-gradient-to-r from-orange-600 to-transparent mb-4" />
			<div className="space-y-4">
				{rows.map((rowImages, rowIndex) => (
					<div
						key={rowIndex}
						ref={(el) => (galleryRefs.current[rowIndex] = el)}
						className={`flex lg:flex-row sm:flex-row flex-col gap-4 whitespace-nowrap ${
							rowIndex % 2 !== 0
								? "lg:-translate-x-1/2 md:-translate-x-1/2"
								: ""
						}`}
					>
						{rowImages.map((item, i) => (
							<motion.div
								key={i}
								onClick={() => setIndex(rowIndex * 4 + i)}
								className="shrink-0 gallery-item"
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								transition={{ duration: 0.2 }}
							>
								<Image
									src={item.src}
									alt={`Gallery Image ${rowIndex * 4 + i + 1}`}
									width={400}
									height={300}
									className="shadow-lg w-auto h-auto object-cover rounded-lg"
								/>
							</motion.div>
						))}
					</div>
				))}
			</div>
			<Lightbox
				plugins={[Thumbnails]}
				slides={imagesArray}
				index={index}
				open={index >= 0}
				close={() => setIndex(-1)}
			/>
		</section>
	);
};

export default Galeri;
