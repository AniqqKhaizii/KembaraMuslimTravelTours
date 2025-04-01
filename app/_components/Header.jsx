"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as motion from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { HiBars3 } from "react-icons/hi2";
import Axios from "axios";

function Header() {
	const [sticky, setSticky] = useState(false);
	const [showSubMenu, setShowSubMenu] = useState(false);
	const pathname = usePathname();
	const isMultiDirectory = pathname.split("/").filter(Boolean).length > 1;
	const isHomePage = pathname.split("/").filter(Boolean).length < 1;

	const isPakejPage = pathname.includes("/Pakej/Pakej-Umrah");
	const [packages, setPackages] = useState([]);
	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const response = await Axios.get(
					"http://localhost:3000/api/Tetapan/ManagePackage",
					{
						params: {
							Operation: "SEARCH",
							TripUnique: "Y",
						},
					}
				);

				setPackages(response.data);
			} catch (error) {
				console.error("Error fetching packages:", error);
			}
		};
		fetchPackages();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 50 ? setSticky(true) : setSticky(false);
		};

		window.addEventListener("scroll", handleScroll);

		// Clean up the event listener on component unmount
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
		<div className="flex justify-center">
			<motion.header
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.2 }}
				viewport={{ once: true }}
				className={`${
					isPakejPage ? "relative" : "fixed"
				} top-0 z-[9999] transition-all duration-900 shadow-xl  ${
					sticky || isMultiDirectory
						? "bg-gradient-to-br from-[#b7c21c] to-[#e76f21] w-full text-white lg:px-12 px-4"
						: "bg-[linear-gradient(120deg,_#fdfbfb_0%,_#ebedee_50%,_#fdfbfb_100%)] lg:w-1/2 w-4/5 mx-auto rounded-2xl mt-4 px-4"
				}`}
			>
				<div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
					<div className="flex items-center justify-between w-full">
						<div
							className={`md:flex md:items-center md:gap-12 transition-all ease-in-out duration-300`}
						>
							<a className="flex  drop-shadow-sm" href="/">
								<span className="sr-only">Home</span>
								<img
									src="/LOGOKMTT.png"
									alt="KMTT Logo"
									width={65}
									height={65}
									className="object-contain object-center mt-2"
								/>
							</a>
						</div>

						<div className="hidden lg:block">
							<nav aria-label="Global">
								<ul className="md:flex gap-2 hidden">
									{Menu.map((item, index) => (
										<li
											key={index}
											className={`relative group cursor-pointer text-sm py-2 px-4 rounded-md ${
												pathname === item.path && sticky
													? "bg-gray-100 text-black "
													: pathname === item.path && !sticky
													? "bg-orange-500 text-white"
													: pathname !== item.path && sticky
													? "hover:bg-gray-100 hover:text-black"
													: "hover:bg-orange-500 hover:text-white"
											}`}
										>
											<Link className="flex" href={item.path}>
												{item.name}
												{item.submenu && (
													<FaChevronDown className="ml-2 mt-1 text-sm" />
												)}
											</Link>
											{item.submenu && (
												<div className="relative">
													<ul
														className={`absolute -left-10 border-t-4 w-[32vw] border-zinc-800 top-0 opacity-0 scale-95 bg-orange-500 p-2 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg mt-5 grid grid-cols-1 lg:grid-cols-2`}
														onMouseEnter={() => setShowSubMenu(true)}
														onMouseLeave={() => setShowSubMenu(false)}
													>
														{item.submenu.map((subItem) => (
															<li
																key={subItem.id}
																className="flex justify-start items-center w-full text-left text-sm text-white hover:bg-orange-600 transition-all ease-in-out px-2 py-2 shadow-2xl"
															>
																<Link href={subItem.path} className="flex">
																	<FaPaperPlane className="mr-2" />
																	{subItem.name}
																</Link>
															</li>
														))}
													</ul>
												</div>
											)}
										</li>
									))}
								</ul>
							</nav>
						</div>

						<div className="lg:hidden block">
							<button
								type="button"
								className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900"
								aria-controls="mobile-menu"
								aria-expanded="false"
								onClick={() => setMobileMenuOpen(true)}
							>
								<HiBars3 className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
			</motion.header>
		</div>
	);
}

export default Header;
