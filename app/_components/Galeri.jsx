"use client";
import React, { useState } from "react";
import * as motion from "framer-motion/client";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
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
			<section className="bg-slate-50 bg-cover bg-no-repeat bg-blend-lighten px-6 py-16 sm:py-24 text-slate-900">
				<div className="mx-auto max-w-screen-xl px-6 sm:px-2 ">
					<div className="flex flex-row justify-between items-center">
						<div className="flex flex-col">
							<p className="text-gray-700 font-reenie text-2xl my-2 font-semibold">
								Where Adventure Meets Faith
							</p>
							<h2 className="text-3xl max-w-7xl font-regular sm:text-5xl text-orange-600 mb-2">
								Galeri Kembara Muslim
							</h2>
						</div>

						<button className="border border-gray-700 rounded-full px-3 py-1.5 text-gray-700 group hover:bg-orange-600 hover:border-none">
							<a
								href="/Galeri"
								className="flex items-center  group-hover:text-white"
							>
								Lihat semua
								<svg
									className="w-6 h-6 text-gray-700 group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m10 16 4-4-4-4"
									/>
								</svg>
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
