"use client";
import React, { useEffect } from "react";

import Hero from "./_components/Hero";
import Pakej from "./_components/Pakej";
import Kemudahan from "./_components/Kemudahan";
import Galeri from "./_components/Galeri";
import Testimonial from "./_components/Testimonial";

import PosterModal from "../components/poster-modal";
import FAQSection from "./_components/FAQSection";
import UpcomingDeparture from "./_components/UpcomingDeparture";
import ZoomParallax from "./_components/ZoomParallax";

export default function Home() {
	return (
		<main className="flex flex-col">
			<PosterModal />
			<Hero />
			<ZoomParallax />
			<Pakej />
			<Galeri />
			{/* <Kemudahan /> */}
			<Testimonial />
			<FAQSection />
		</main>
	);
}
