"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Whatsapp from "./Whatsapp";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import Tentang from "./Tentang";

export default function ClientWrapper({ children, className }) {
	const pathname = usePathname();
	const isAdminPage = pathname.includes("/Admin");
	const isSubPage = pathname.includes("/KembaraDuaTanahSuci");
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			{!isAdminPage && !isSubPage && (
				<>
					<Banner />
					<Header />
				</>
			)}
			<div>
				{children}
				{!isAdminPage && <Whatsapp />}
			</div>
			{!isAdminPage && !isSubPage ? (
				<>
					<Tentang />
					<Footer />
				</>
			) : null}
		</>
	);
}
