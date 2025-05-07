"use client";
import React, { useEffect } from "react";

import Hero from "./_components/Hero";
import Banner from "./_components/Banner";
import Pakej from "./_components/Pakej";
import Kemudahan from "./_components/Kemudahan";
import Galeri from "./_components/Galeri";
import Testimonial from "./_components/Testimonial";

import PosterModal from "../components/poster-modal";

export default function Home() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);
	return (
		<main className="flex flex-col gap-5">
			<div className="overflow-hidden">
				<Hero />
				<Pakej />
				<Galeri />
				<Kemudahan />
				<Testimonial />
			</div>
		</main>
	);
}
