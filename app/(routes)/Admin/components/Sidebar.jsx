"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { MdDashboard, MdHotel } from "react-icons/md";
import { AiOutlineUser, AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import {
	FaUserTie,
	FaUsers,
	FaBuilding,
	FaSuitcase,
	FaCamera,
} from "react-icons/fa";
import { MdOutlineModeOfTravel } from "react-icons/md";
import { RiAdminLine, RiSettings3Line } from "react-icons/ri";
import { CgMenu } from "react-icons/cg";
import { CgMenuLeftAlt } from "react-icons/cg";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
	const currentPage = usePathname().split("/")[2];
	const currentPageSubmenu = usePathname().split("/")[3];

	// State to manage submenu visibility
	const [showUsersSubmenu, setShowUsersSubmenu] = useState(false);
	const [showTetapanSubmenu, setShowTetapanSubmenu] = useState(false);

	// Sidebar main menu
	const sidebarData = [
		{ text: "Dashboard", icon: MdDashboard, href: "/Admin/Dashboard" },
		{
			text: "Users",
			icon: AiOutlineUser,
			href: "#",
			submenu: [
				{ text: "Admin", icon: RiAdminLine, href: "/Admin/Users/AdminKMTT" },
				{ text: "Agent", icon: FaUserTie, href: "/Admin/Users/Agent" },
				{ text: "Customers", icon: FaUsers, href: "/Admin/Users/Customers" },
			],
		},
		{ text: "Booking", icon: AiOutlineHome, href: "/Admin/Booking" },
		{
			text: "Tetapan",
			icon: RiSettings3Line,
			href: "#",
			submenu: [
				{ text: "Pakej", icon: FaSuitcase, href: "/Admin/Tetapan/Pakej" },
				{
					text: "Umrah Trip",
					icon: MdOutlineModeOfTravel,
					href: "/Admin/Tetapan/Trip",
				},
				{ text: "Hotel", icon: FaBuilding, href: "/Admin/Tetapan/Hotel" },
				{ text: "Galeri", icon: FaCamera, href: "/Admin/Tetapan/Galeri" },
			],
		},
	];

	// Toggle submenu functions
	const toggleUsersSubmenu = () => setShowUsersSubmenu(!showUsersSubmenu);
	const toggleTetapanSubmenu = () => setShowTetapanSubmenu(!showTetapanSubmenu);

	return (
		<div
			className={`${
				isCollapsed ? "w-16" : "w-64"
			} flex-col bg-[url('/AdminBg.png')] bg-cover bg-top shadow-lg transition-all duration-300 hidden sm:flex z-50 sticky top-0 h-screen`}
		>
			<div className="flex items-start justify-center pt-2 border-b border-gray-200 bg-transparent">
				<Image
					src="/LogoKMTT.png"
					alt="Logo"
					width={isCollapsed ? 200 : 160}
					height={isCollapsed ? 240 : 160}
					className={`${
						isCollapsed ? "w-auto h-auto" : "w-40 h-24"
					} mx-auto py-0.5`}
				/>
				<button
					onClick={toggleSidebar}
					className={`absolute ${
						isCollapsed ? "left-20" : "left-60"
					} text-white border-solid border-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 mt-1`}
				>
					{isCollapsed ? <CgMenuLeftAlt size={26} /> : <CgMenu size={26} />}
				</button>
			</div>

			<ul className="pt-2 space-y-1 text-sm">
				{sidebarData.map((item) => (
					<li key={item.text}>
						{item.submenu ? (
							<div>
								<button
									className={`flex items-center justify-between w-full px-4 py-2 text-gray-200 hover:bg-slate-100 hover:text-gray-700 rounded-ss-2xl transition-all duration-300 ${
										// Check if currentPage matches the main menu link or any submenu link
										item.submenu?.some(
											(subItem) => currentPage === subItem.href.split("/")[2]
										)
											? "bg-slate-100 text-gray-700"
											: ""
									}`}
									onClick={() =>
										item.text === "Users"
											? toggleUsersSubmenu()
											: toggleTetapanSubmenu()
									}
								>
									<div className="flex items-center gap-4">
										<item.icon size={24} />
										{!isCollapsed && <span>{item.text}</span>}
									</div>
									{!isCollapsed &&
										(item.text === "Users" ? (
											showUsersSubmenu ||
											item.submenu?.some(
												(subItem) => currentPage === subItem.href.split("/")[3]
											) ? (
												<BiChevronUp size={20} />
											) : (
												<BiChevronDown size={20} />
											)
										) : showTetapanSubmenu ||
										  item.submenu?.some(
												(subItem) => currentPage === subItem.href.split("/")[3]
										  ) ? (
											<BiChevronUp size={20} />
										) : (
											<BiChevronDown size={20} />
										))}
								</button>

								<ul
									className={`${
										isCollapsed ? "pl-2" : "pl-6"
									} space-y-1 bg-orange-400/30 rounded-es-2xl ${
										(item.text === "Users" &&
											(showUsersSubmenu ||
												item.submenu?.some(
													(subItem) =>
														currentPageSubmenu === subItem.href.split("/")[3]
												))) ||
										(item.text === "Tetapan" &&
											(showTetapanSubmenu ||
												item.submenu?.some(
													(subItem) =>
														currentPageSubmenu === subItem.href.split("/")[3]
												)))
											? "block"
											: "hidden"
									}`}
								>
									{item.submenu?.map((subItem) => (
										<li key={subItem.text}>
											<Link
												href={subItem.href}
												className={`flex items-center ${
													isCollapsed ? "gap-0 px-2" : "gap-4 px-4"
												} py-2 text-gray-100 hover:bg-slate-100 hover:text-gray-700 rounded-es-2xl transition-all duration-300 ${
													currentPageSubmenu === subItem.href.split("/")[3]
														? "bg-slate-100 text-gray-700"
														: ""
												}`}
											>
												{subItem.icon && <subItem.icon size={20} />}
												{/* Render text only when sidebar is not collapsed */}
												{!isCollapsed && <span>{subItem.text}</span>}
											</Link>
										</li>
									))}
								</ul>
							</div>
						) : (
							<Link
								href={item.href}
								className={`flex items-center gap-4 px-4 py-2 text-gray-200 hover:bg-slate-100 hover:text-gray-700 rounded-ss-2xl transition-all duration-300 ${
									currentPage === item.href.split("/")[2]
										? "bg-slate-100 text-gray-700"
										: ""
								}`}
							>
								<item.icon size={24} />
								{!isCollapsed && <span>{item.text}</span>}
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
