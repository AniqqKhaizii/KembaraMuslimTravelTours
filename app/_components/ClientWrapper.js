"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Whatsapp from "./Whatsapp";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

export default function ClientWrapper({ children }) {
	const pathname = usePathname();
	const isAdminPage = pathname.includes("/Admin"); // Check if the path includes /Admin

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
