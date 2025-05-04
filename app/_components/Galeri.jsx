"use client";
import React, { useState } from "react";
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
	const [index, setIndex] = useState(-1);

	return (
		<>
			<section className="relative bg-[url('/Hero/PakejBg1.jpg')] bg-cover bg-fixed px-2 py-8 sm:pb-40 text-slate-900">
				<div className="absolute inset-0 h-full bg-gradient-to-b from-white to-white/60"></div>
				<div className="relative mx-auto max-w-screen-xl px-2">
					<div className="flex flex-row justify-between items-end py-2 w-full">
						<div className="flex flex-col justify-between">
							<p className="text-gray-700 font-reenie text-2xl font-semibold">
								Where Adventure Meets Faith
							</p>
							<h2 className="text-3xl max-w-7xl font-bold sm:text-5xl text-orange-600">
								Galeri Kembara Muslim
							</h2>
						</div>

						<button className="group bg-orange-500 rounded-full px-4 py-1.5 text-white group hover:bg-orange-600 hover:border-none">
							<a
								href="/Galeri"
								className="flex items-center gap-2 group-hover:text-white"
							>
								<span className="shrink-0">Lihat semua</span>
								<FaPaperPlane className="text-sm group-hover:-translate-y-1 transition-all duration-200" />
							</a>
						</button>
					</div>
					<hr className="w-full h-[2px] bg-gradient-to-r from-orange-600 to-transparent mb-8" />
					<div className="gallery">
						{imagesArray.map((item, index) => (
							<motion.div
								key={index}
								onClick={() => setIndex(index)}
								className="gallery-item"
								initial={{ opacity: 0, scale: 0.2 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{ duration: 0.8 }}
							>
								<Image
									src={item.src}
									alt={`Gallery Image ${index + 1}`}
									width={600}
									height={450}
								/>
							</motion.div>
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
