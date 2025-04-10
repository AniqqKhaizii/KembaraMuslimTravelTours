"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Whatsapp from "./Whatsapp";
import { ConfigProvider } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function ClientWrapper({ children }) {
	const pathname = usePathname();
	const isAdminPage = pathname.includes("/Admin"); // Check if the path includes /Admin
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);
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
