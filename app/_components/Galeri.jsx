"use client";
import React, { useEffect, useRef, useState } from "react";
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
];

const Galeri = () => {
	gsap.registerPlugin(ScrollTrigger);

	const [index, setIndex] = useState(-1);
	const galleryRefs = useRef([]);

	const rows = [0, 1, 2].map((row) =>
		imagesArray.filter((_, i) => i % 3 === row)
	);

	useEffect(() => {
		galleryRefs.current.forEach((row, index) => {
			if (!row) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: row,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			});

			const distance = row.scrollWidth - row.clientWidth;

			const direction = index % 2 === 0 ? -distance : distance || -300;
			tl.to(row, {
				x: direction,
				ease: "none",
			});
		});
	}, [rows]);

	return (
		<>
			<section className="relative bg-[url('/Hero/PakejBg1.jpg')] bg-cover bg-fixed px-2 py-8 sm:pb-40 text-slate-900">
				<div className="absolute inset-0 h-full bg-gradient-to-b from-[#E8F1FE] via-blue-100/90 to-blue-100/80"></div>
				<div className="relative mx-auto max-w-screen-2xl px-2 overflow-clip">
					<div className="flex lg:flex-row flex-col lg:gap-0 gap-4 lg:justify-between justify-center items-center lg:items-end py-2 w-full">
						<div className="flex flex-col lg:justify-between lg:items-start items-center">
							<p className="text-gray-700 font-reenie text-2xl font-semibold">
								Where Adventure Meets Faith
							</p>
							<h2 className="text-3xl max-w-7xl font-medium tracking-tighter sm:text-5xl text-orange-600">
								Galeri Kembara Muslim
							</h2>
						</div>

						<button className="group border border-orange-500 rounded-lg lg:px-4 lg:py-3 px-3 py-1 lg:w-auto w-32 text-orange-600 group">
							<a href="/Galeri" className="flex items-center gap-2">
								<span className="shrink-0 text-xs group-hover:translate-x-1 transition-all duration-200">
									Lihat semua
								</span>
								<FaPaperPlane className="text-xs group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-200" />
							</a>
						</button>
					</div>
					<hr className="w-full h-[2px] bg-gradient-to-r from-orange-600 to-transparent mb-4" />
					<div className="space-y-4">
						{rows.map((rowImages, rowIndex) => (
							<div
								key={rowIndex}
								ref={(el) => (galleryRefs.current[rowIndex] = el)}
								className="flex space-x-4 whitespace-nowrap"
							>
								{rowImages.map((item, i) => (
									<motion.div
										key={i}
										onClick={() => setIndex(rowIndex * 4 + i)} // adjust index calculation
										className="shrink-0 gallery-item"
										initial={{ scale: 0.8 }}
										whileInView={{ scale: 1 }}
										viewport={{ once: true, amount: 0.2 }}
										transition={{ duration: 0.6 }}
									>
										<Image
											src={item.src}
											className="shadow-lg"
											alt={`Gallery Image ${rowIndex * 4 + i + 1}`}
											width={400}
											height={300}
										/>
									</motion.div>
								))}
							</div>
						))}
					</div>
				</div>
			</section>
			<Lightbox
				plugins={[Thumbnails]}
				slides={imagesArray}
				index={index}
				open={index >= 0}
				close={() => setIndex(-1)}
			/>
		</>
	);
};

export default Galeri;
