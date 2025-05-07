import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import { Instrument_Sans } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";

import ClientWrapper from "./_components/ClientWrapper";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const instrument_sans = Instrument_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
	title: "Kembara Muslim Travel & Tours",
	description: "KMTT Official Website",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<ClientWrapper>{children}</ClientWrapper>
			</body>
		</html>
	);
}
