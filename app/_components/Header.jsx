"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as motion from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaPaperPlane } from "react-icons/fa";
import { HiBars3 } from "react-icons/hi2";
import { fetchPackages } from "../../hooks/callPackages";

const useIsLargeScreen = () => {
	const [isLargeScreen, setIsLargeScreen] = useState(false);

	useEffect(() => {
		// Avoids SSR issue
		if (typeof window === "undefined") return;

		const mediaQuery = window.matchMedia("(min-width: 1024px)");
		setIsLargeScreen(mediaQuery.matches);

		const handler = (e) => setIsLargeScreen(e.matches);
		mediaQuery.addEventListener("change", handler);

		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	return isLargeScreen;
};

function Header() {
	const [sticky, setSticky] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeSubMenu, setActiveSubMenu] = useState(null);
	const pathname = usePathname();
	const isMultiDirectory = pathname.split("/").filter(Boolean).length > 1;
	const isHomePage = pathname.split("/").filter(Boolean).length < 1;
	const isLargeScreen = useIsLargeScreen();
	const isPakejPage = pathname.includes("/Pakej/Pakej-Umrah");
	const [packages, setPackages] = useState([]);
	const handleGetPackages = async () => {
		try {
			const data = await fetchPackages();
			setPackages(data);
		} catch (error) {}
	};

	useEffect(() => {
		handleGetPackages();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 50 ? setSticky(true) : setSticky(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const Menu = [
		{
			id: 1,
			name: "Utama",
			path: "/",
		},
		{
			id: 2,
			name: "Pakej Umrah",
			path: "/Pakej",
			submenu: packages.map((pkg) => ({
				id: pkg.PakejID,
				name: `Umrah ${pkg.PakejName}` || "",
				path: `/Pakej/Pakej-Umrah?kategori=${encodeURIComponent(
					pkg.PakejName || ""
				)}`,
			})),
		},
		{
			id: 3,
			name: "Tips & Galeri",
			path: "/Galeri",
		},
		{
			id: 4,
			name: "Hubungi",
			path: "/Hubungi",
		},
		{
			id: 5,
			name: "Tentang Kami",
			path: "/Tentang",
		},
		{
			id: 6,
			name: "Portal Admin",
			path: "/Admin",
		},
	];

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.2 }}
			viewport={{ once: true }}
			className={`${
				isPakejPage ? "relative" : "fixed"
			} top-0 z-[999] transition-all duration-200 ease-minor-spring text-[14px] font-medium tracking-wide w-full text-white ${
				(sticky || isMultiDirectory) && isLargeScreen
					? "bg-gradient-to-r from-kmtt-primary to-orange-400 shadow-xl lg:px-64 px-4 py-2"
					: isHomePage && isLargeScreen
					? "mx-auto rounded-2xl py-2 px-64 top-10"
					: !isLargeScreen && !sticky
					? "bg-gradient-to-r from-kmtt-primary to-orange-400 shadow-xl lg:px-64 px-4 py-2 top-10"
					: !isLargeScreen && sticky
					? "bg-gradient-to-r from-kmtt-primary to-orange-400 shadow-xl lg:px-64 px-4 py-2 top-0"
					: "mx-auto rounded-2xl mt-2 px-64 top-10"
			}`}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-between w-full">
					<div className="md:flex md:items-center md:gap-12">
						<a className="flex drop-shadow-sm" href="/">
							<img
								src="/LOGOKMTT.png"
								alt="KMTT Logo"
								className={`object-center object-fill ${
									sticky || isMultiDirectory || !isLargeScreen
										? "w-32 h-14 mb-1 "
										: "w-48 h-20"
								} mt-2`}
							/>
						</a>
					</div>

					{/* Desktop Menu */}
					<div
						className={`hidden lg:block ${
							sticky || isMultiDirectory || !isLargeScreen ? "mt-1" : "-mt-4"
						}`}
					>
						<nav aria-label="Global">
							<ul className="md:flex gap-2 hidden">
								{Menu.map((item, index) => (
									<li
										key={index}
										className={`relative group cursor-pointer py-2 my-0 px-4 border-b-2 border-transparent ${
											pathname === item.path && sticky
												? "border-white"
												: pathname === item.path && !sticky
												? "border-white hover:border-white"
												: pathname !== item.path && sticky
												? "hover:border-white"
												: "hover:border-white"
										}`}
									>
										<Link className="flex shadow-2xl" href={item.path}>
											{item.name}
											{item.submenu && (
												<FaChevronDown className="ml-2 mt-1 text-xs" />
											)}
										</Link>
										{item.submenu && (
											<ul className="absolute left-0 w-[12vw] top-8 opacity-0 scale-95 bg-orange-500 rounded-b-sm group-hover:opacity-100 divide-y divide-kmtt-contrast/30 group-hover:scale-100 transition-all duration-300 shadow-2xl mt-6 grid grid-cols-1">
												{item.submenu.map((subItem) => (
													<li
														key={subItem.id}
														className="flex justify-start items-center w-full text-left text-sm text-white hover:bg-orange-600 py-2 px-4"
													>
														<Link
															href={subItem.path}
															className="flex items-center justify-start"
														>
															<FaPaperPlane className="mr-2" />
															{subItem.name}
														</Link>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
						</nav>
					</div>

					{/* Mobile Menu Toggle */}
					<div className="lg:hidden block">
						<button
							onClick={() => {
								setMobileMenuOpen(!mobileMenuOpen);
								if (!mobileMenuOpen) {
									setTimeout(() => {
										document
											.getElementById("mobile-menu-anchor")
											?.scrollIntoView({ behavior: "smooth" });
									}, 50); // Slight delay to ensure DOM update
								}
							}}
						>
							<HiBars3
								className={`h-6 w-6 ${
									sticky || isPakejPage || !isLargeScreen
										? "text-white"
										: "text-black"
								}`}
							/>
						</button>
					</div>
				</div>
			</div>

			{/* ✅ Mobile Menu Dropdown */}
			{mobileMenuOpen && (
				<motion.div
					initial={{ height: 0, y: "-100%" }}
					animate={{ height: "auto", y: "0%" }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				>
					<ul
						className={`${
							sticky || isPakejPage || !isLargeScreen
								? "text-white border-gray-50"
								: "text-black border-black"
						} space-y-2`}
					>
						{Menu.map((item) => (
							<li key={item.id} className="text-sm border-b border-l p-2">
								{/* Main menu item */}
								<div
									className="flex justify-between items-center cursor-pointer"
									onClick={() =>
										activeSubMenu === item.id
											? setActiveSubMenu(null)
											: setActiveSubMenu(item.id)
									}
								>
									<Link
										href={item.path}
										onClick={() => setMobileMenuOpen(false)}
										className="hover:underline"
									>
										{item.name}
									</Link>

									{item.submenu && (
										<FaChevronDown
											className={`text-xs ml-2 transform transition-transform duration-300 ${
												activeSubMenu === item.id ? "rotate-180" : ""
											}`}
										/>
									)}
								</div>

								{/* Submenu (shown when clicked) */}
								{item.submenu && activeSubMenu === item.id && (
									<motion.ul
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="ml-4 mt-2 space-y-2 text-xs"
									>
										{item.submenu.map((subItem) => (
											<li key={subItem.id} className="border-l border-b p-2">
												<Link
													href={subItem.path}
													className="flex items-center gap-2 hover:underline"
													onClick={() => setMobileMenuOpen(false)}
												>
													<FaPaperPlane className="text-sm" />
													{subItem.name}
												</Link>
											</li>
										))}
									</motion.ul>
								)}
							</li>
						))}
					</ul>
				</motion.div>
			)}
		</motion.header>
	);
}

export default Header;
