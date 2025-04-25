import { Inter } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { Manrope } from "next/font/google";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

import ClientWrapper from "./_components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });
const DMSans = DM_Sans({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const instrument_sans = Instrument_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata = {
	title: "Kembara Muslim Travel & Tours",
	description: "KMTT Official Website",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={instrument_sans.className}>
				<ClientWrapper>
					<main>{children}</main>
				</ClientWrapper>
			</body>
		</html>
	);
}
