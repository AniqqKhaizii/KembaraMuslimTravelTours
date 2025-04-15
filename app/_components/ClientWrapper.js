"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Whatsapp from "./Whatsapp";
import { ConfigProvider } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

export default function ClientWrapper({ children }) {
	const pathname = usePathname();
	const isAdminPage = pathname.includes("/Admin");

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
		setIsMounted(true);
	}, []);

	if (!isMounted) return null; // Prevent hydration issues

	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: isAdminPage ? "Poppins, sans-serif" : "Arial, sans-serif",
				},
			}}
		>
			<div className={isAdminPage ? "font-primary" : ""}>
				{!isAdminPage && <Header />}
				<div>
					{children}
					{!isAdminPage && <Whatsapp />}
				</div>
				{!isAdminPage && <Footer />}
			</div>
		</ConfigProvider>
	);
}
