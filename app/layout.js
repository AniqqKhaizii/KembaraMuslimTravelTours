import { Inter } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { Manrope } from "next/font/google";
import { Protest_Riot } from "next/font/google";
import "./globals.css";

import ClientWrapper from "./_components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });
const DMSans = DM_Sans({ subsets: ["latin"] });
const ProtestRiot = Protest_Riot({
	subsets: ["latin"],
	weight: ["400"],
});
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
	title: "Kembara Muslim Travel & Tours",
	description: "KMTT Official Website",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={DMSans.className}>
				<ClientWrapper>
					<main>{children}</main>
				</ClientWrapper>
			</body>
		</html>
	);
}
