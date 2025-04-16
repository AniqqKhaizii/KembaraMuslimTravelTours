import React from "react";
import { ArrowRight } from "lucide-react";

export default function SlideArrowButton({
	text = "Lihat Pakej",
	primaryColor = "#E5E7EB",
	className = "",
	...props
}) {
	return (
		<button
			className={`group relative rounded-full w-full border border-white bg-orange-600 px-2 py-2  ${className}`}
			{...props}
		>
			<div
				className="absolute left-0 top-0 flex h-full w-10 border border-white items-center justify-end rounded-full transition-all duration-400 ease-in-out group-hover:w-full"
				style={{ backgroundColor: primaryColor }}
			>
				<span className="mr-2.5 text-black transition-all duration-200 ease-in-out">
					<ArrowRight size={18} />
				</span>
			</div>
			<span className="relative left-4 z-10 whitespace-nowrap px-8  text-md text-white transition-all duration-400 ease-in-out group-hover:-left-3 group-hover:text-black">
				{text}
			</span>
		</button>
	);
}
