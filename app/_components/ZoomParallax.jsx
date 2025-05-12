import React, { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ZoomParallax() {
	const container = useRef();
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});
	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const Images = [
		{
			src: "/Parallax/9.jpg",
			scale: scale4,
		},
		{
			src: "/Parallax/11.jpg",
			scale: scale5,
		},
		{
			src: "/Parallax/10.jpg",
			scale: scale6,
		},
		{
			src: "/Parallax/12.jpg",
			scale: scale5,
		},
		{
			src: "/Parallax/5.jpg",
			scale: scale6,
		},
		{
			src: "/Parallax/8.jpg",
			scale: scale8,
		},
		{
			src: "/Parallax/13.jpg",
			scale: scale9,
		},
	];

	return (
		<div ref={container} className="lg:h-[300vh] lg:block hidden relative">
			<div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-white via-kmtt-primary/50 to-kmtt-primary">
				{Images.map((image, index) => {
					const baseClasses =
						"w-screen lg:h-full h-1 absolute inset-0 flex items-center justify-center";
					const imageBase = "absolute";

					let customPosition = "";
					switch (index) {
						case 1:
							customPosition = "top-[-35vh] left-[5vw] w-[15vw] h-[15vh]";
							break;
						case 2:
							customPosition = "top-[-20vh] left-[-25vw] w-[20vw] h-[45vh]";
							break;
						case 3:
							customPosition = "top-[-10vh] left-[27.5vw] w-[25vw] h-[25vh]";
							break;
						case 4:
							customPosition = "top-[37.5vh] left-[5vw] w-[20vw] h-[25vh]";
							break;
						case 5:
							customPosition = "top-[37.5vh] left-[-22.5vw] w-[30vw] h-[25vh]";
							break;
						case 6:
							customPosition = "top-[27.5vh] left-[25vw] w-[15vw] h-[15vh]";
							break;
						default:
							customPosition = "w-[25vw] h-[35vh]";
					}

					return (
						<motion.div
							style={{ scale: image.scale }}
							key={index}
							className={baseClasses}
						>
							<div className={`relative ${imageBase} ${customPosition} `}>
								<img
									src={image.src}
									alt={`Image ${index}`}
									className="object-cover shadow-2xl"
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
