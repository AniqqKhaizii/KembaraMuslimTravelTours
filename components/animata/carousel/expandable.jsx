import { useEffect, useState } from "react";

import WaveReveal from "@/components/animata/text/wave-reveal";
import { cn } from "@/lib/utils";

const List = ({ item, className, index, activeItem, ...props }) => {
	return (
		<div
			className={cn(
				"relative flex h-full w-20 min-w-10 cursor-pointer overflow-hidden transition-all delay-0 duration-300 ease-in-out",
				{
					"flex-grow": index === activeItem,
				},
				className
			)}
			{...props}
		>
			<img
				src={item.image}
				alt={item.title}
				className={cn("h-full w-full object-cover brightness-75 rounded-3xl", {
					"blur-[1px] rounded-full": index !== activeItem,
				})}
			/>
			{index === activeItem && (
				<div className="absolute bottom-2 left-2 min-w-fit text-white md:bottom-4 md:left-4">
					<WaveReveal
						duration="1000ms"
						className="items-start justify-start text-xl sm:text-2xl md:text-3xl drop-shadow-2xl"
						text={item.title}
						direction="up"
					/>
				</div>
			)}
		</div>
	);
};

const items = [
	{
		image: "/Hero/HeroMain1.jpg",
		title: "Makkah",
	},
	{
		image: "/Hero/HeroMain2.jpg",
		title: "Madinah",
	},
	{
		image: "/Hero/HeroMain3.jpg",
		title: "Masjid Nabawi",
	},
];

export default function Expandable({
	list = items,
	autoPlay = true,
	className,
}) {
	const [activeItem, setActiveItem] = useState(0);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(() => {
		if (!autoPlay) {
			return;
		}

		const interval = setInterval(() => {
			if (!isHovering) {
				setActiveItem((prev) => (prev + 1) % list.length);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [autoPlay, list.length, isHovering]);

	return (
		<div className={cn("flex h-[45vh] w-full gap-1", className)}>
			{list.map((item, index) => (
				<List
					key={item.title}
					item={item}
					index={index}
					activeItem={activeItem}
					onMouseEnter={() => {
						setActiveItem(index);
						setIsHovering(true);
					}}
					onMouseLeave={() => {
						setIsHovering(false);
					}}
				/>
			))}
		</div>
	);
}
