"use client";
import React, { useState } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const Main = () => {
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);

	const categories = [
		{
			name: "Umrah Februari 2024",
			images: [
				{ src: "/Galeri/Galeri1.jpg", alt: "Mekah Image 1" },
				{ src: "/Galeri/Galeri2.jpg", alt: "Mekah Image 2" },
				{ src: "/Galeri/Galeri3.jpg", alt: "Mekah Image 3" },
				{ src: "/Galeri/Galeri4.jpg", alt: "Madinah Image 1" },
				{ src: "/Galeri/Galeri5.jpg", alt: "Madinah Image 2" },
			],
		},
		{
			name: "Umrah Syawal 2024",
			images: [
				{ src: "/Galeri/Galeri1.jpg", alt: "Mekah Image 1" },
				{ src: "/Galeri/Galeri2.jpg", alt: "Mekah Image 2" },
				{ src: "/Galeri/Galeri4.jpg", alt: "Madinah Image 1" },
				{ src: "/Galeri/Galeri5.jpg", alt: "Madinah Image 2" },
				{ src: "/Galeri/Galeri6.jpg", alt: "Madinah Image 3" },
			],
		},
		{
			name: "Umrah Ogos 2024",
			images: [
				{ src: "/Galeri/Galeri1.jpg", alt: "Mekah Image 1" },
				{ src: "/Galeri/Galeri2.jpg", alt: "Mekah Image 2" },
				{ src: "/Galeri/Galeri7.jpg", alt: "Jeddah Image 1" },
				{ src: "/Galeri/Galeri8.jpg", alt: "Jeddah Image 2" },
				{ src: "/Galeri/Galeri9.jpg", alt: "Jeddah Image 3" },
			],
		},
	];

	// Combine all images into a single array for Lightbox
	const imagesArray = categories.flatMap((category) => category.images);

	const videos = [
		{
			src: "/Videos/Tips1.mp4",
			title: "How to Prepare for Umrah",
			description:
				"Tips on what to pack and prepare before starting your journey.",
		},
		{
			src: "/Videos/Tips2.mp4",
			title: "Best Practices During Umrah",
			description: "Important guidelines to follow while performing Umrah.",
		},
		{
			src: "/Videos/Tips3.mp4",
			title: "Common Mistakes During Umrah",
			description: "Learn how to avoid common mistakes while performing Umrah.",
		},
	];

	return (
		<div className="w-full h-full bg-gray-50">
			<div className="grid grid-cols-1 gap-12 max-w-screen-xl mx-auto py-12 px-6">
				{/* Gallery Section */}
				<section className="mb-16">
					<h2 className="text-5xl text-orange-600 font-extrabold mb-8 text-center">
						Galeri Kembara Muslim
					</h2>
					{categories.map((category, index) => (
						<div key={index} className="mb-10">
							<h3 className="text-2xl font-bold text-gray-800 mb-5 uppercase">
								{category.name}
							</h3>
							<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
								{category.images.map((image, idx) => (
									<div
										key={idx}
										className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform transform"
										onClick={() => {
											setLightboxIndex(
												imagesArray.findIndex((img) => img.src === image.src)
											);
											setLightboxOpen(true);
										}}
									>
										<img
											src={image.src}
											alt={image.alt || `Gallery Image ${idx + 1}`}
											className="rounded-md w-full h-48 object-cover"
										/>
										<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center text-white text-lg font-bold">
											{image.alt}
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</section>

				{/* Lightbox */}
				<Lightbox
					open={lightboxOpen}
					close={() => setLightboxOpen(false)}
					index={lightboxIndex}
					slides={imagesArray.map((image) => ({
						src: image.src,
						title: image.alt,
					}))}
					plugins={[Thumbnails]}
				/>

				{/* Umrah Tips Section */}
				<section className=" p-2">
					<h2 className="text-4xl text-orange-600 font-extrabold mb-8 text-center">
						Tips Mengerjakan Umrah
					</h2>
					<Carousel
						plugins={[Autoplay({ delay: 4000 })]}
						opts={{
							align: "start",
							slidesToScroll: 1,
							slidesToShow: 3,
							draggable: true,
						}}
					>
						<CarouselContent className="flex gap-6">
							{videos.map((video, index) => (
								<CarouselItem key={index} className="flex-[1_0_30%]">
									<article className="rounded-lg transform transition-transform">
										<video
											controls
											controlsList="nofullscreen"
											src={video.src}
											className="w-full aspect-[4/5] object-cover rounded-t-lg"
										></video>
										<div className="p-4">
											<h3 className="text-lg font-bold text-orange-700 mb-1">
												{video.title}
											</h3>
											<p className="text-sm text-gray-700">
												{video.description}
											</p>
										</div>
									</article>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</section>
			</div>
		</div>
	);
};

export default Main;
