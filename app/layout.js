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
	title: "Kembara Muslim Travel & Tours | Umrah Travel Agency",
	description:
		"Kembara Muslim Travel & Tours is a trusted Umrah travel agency offering affordable and comfortable pilgrimage packages with professional guidance and exceptional service.",
	keywords:
		"Umrah, Haji, Travel Agency, Muslim Tours, Islamic Travel, Kembara Muslim, Malaysia Umrah Package",
	robots: "index, follow",
	authors: [{ name: "Kembara Muslim Travel & Tours" }],
	creator: "Kembara Muslim Travel & Tours",
	openGraph: {
		title: "Kembara Muslim Travel & Tours | Trusted Umrah Travel Agency",
		description:
			"Join your spiritual journey with Kembara Muslim Travel & Tours. Discover affordable Umrah packages tailored for Malaysian Muslims with expert guidance.",
		url: "https://www.kembaramuslimtravel.com.my",
		siteName: "Kembara Muslim Travel & Tours",

		locale: "en_MY",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Kembara Muslim Travel & Tours | Umrah Packages",
		description:
			"Book your Umrah journey with Kembara Muslim Travel & Tours – affordable, professional, and spiritually fulfilling.",
		images: ["/images/og-image.jpg"],
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={instrument_sans.className}>
				<ClientWrapper>{children}</ClientWrapper>
			</body>
		</html>
	);
}
