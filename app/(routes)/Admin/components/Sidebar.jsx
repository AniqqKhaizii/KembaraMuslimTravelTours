import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
	MdDashboard,
	MdOutlineBookmarks,
	MdOutlineModeOfTravel,
} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import {
	FaUserTie,
	FaUsers,
	FaBuilding,
	FaSuitcase,
	FaCamera,
} from "react-icons/fa";
import { RiAdminLine, RiSettings3Line } from "react-icons/ri";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
	const currentPage = usePathname().split("/")[2];
	const currentPageSubmenu = usePathname().split("/")[3];

	const [showUsersSubmenu, setShowUsersSubmenu] = useState(false);
	const [showTetapanSubmenu, setShowTetapanSubmenu] = useState(false);

	const sidebarData = [
		{ text: "Dashboard", icon: MdDashboard, href: "/Admin/Dashboard" },
		{
			text: "Users",
			icon: AiOutlineUser,
			href: "#",
			submenu: [
				{ text: "Admin", icon: RiAdminLine, href: "/Admin/Users/AdminKMTT" },
				{ text: "Agent", icon: FaUserTie, href: "/Admin/Users/Agent" },
			],
		},
		{ text: "Customers", icon: FaUsers, href: "/Admin/Customers" },
		{ text: "Booking", icon: MdOutlineBookmarks, href: "/Admin/Booking" },
		{ text: "Invoices", icon: LiaFileInvoiceSolid, href: "/Admin/Invoices" },
		{
			text: "Settings",
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

	const toggleUsersSubmenu = () => setShowUsersSubmenu(!showUsersSubmenu);
	const toggleTetapanSubmenu = () => setShowTetapanSubmenu(!showTetapanSubmenu);
	// bg-[url('/AdminBg.png')] bg-cover bg-top
	return (
		<div
			className={`${
				isCollapsed ? "w-16" : "w-48"
			} flex-col bg-white/10 transition-all duration-300 hidden sm:flex z-50 sticky top-6 h-[95vh] py-10 ml-4 shadow-xl rounded-3xl`}
		>
			<div className="flex items-start justify-center pt-2 bg-transparent">
				<Image
					src="/LOGOKMTT.png"
					alt="Logo"
					width={isCollapsed ? 100 : 150}
					height={isCollapsed ? 100 : 150}
					className="mx-auto p-2"
				/>
			</div>

			<ul className="pt-2 space-y-1 text-sm">
				{sidebarData.map((item) => (
					<li key={item.text}>
						{item.submenu ? (
							<div>
								<button
									className={`flex items-center justify-between w-full px-4 py-2 text-gray-200 hover:bg-slate-50/60 hover:text-gray-700 rounded-ss-2xl transition-all duration-300 ${
										item.submenu?.some(
											(subItem) => currentPage === subItem.href.split("/")[2]
										)
											? "bg-slate-50/10 text-gray-700 shadow-inner"
											: ""
									}`}
									onClick={() =>
										item.text === "Users"
											? toggleUsersSubmenu()
											: toggleTetapanSubmenu()
									}
								>
									<div
										className={`flex items-center text-white  ${
											isCollapsed ? "gap-0 pl-1" : "gap-4"
										}`}
									>
										<item.icon size={isCollapsed ? 20 : 24} />{" "}
										{!isCollapsed && <span>{item.text}</span>}
									</div>
									{!isCollapsed &&
										(item.text === "Users" ? (
											showUsersSubmenu ||
											item.submenu?.some(
												(subItem) => currentPage === subItem.href.split("/")[3]
											) ? (
												<BiChevronUp size={20} className="text-white" />
											) : (
												<BiChevronDown size={20} className="text-white" />
											)
										) : showTetapanSubmenu ||
										  item.submenu?.some(
												(subItem) => currentPage === subItem.href.split("/")[3]
										  ) ? (
											<BiChevronUp size={20} className="text-white" />
										) : (
											<BiChevronDown size={20} className="text-white" />
										))}
								</button>

								<ul
									className={`${
										isCollapsed ? "pl-3" : "pl-6"
									} space-y-1 bg-white/10 rounded-es-2xl ${
										(item.text === "Users" &&
											(showUsersSubmenu ||
												item.submenu?.some(
													(subItem) =>
														currentPageSubmenu === subItem.href.split("/")[3]
												))) ||
										(item.text === "Settings" &&
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
														? "bg-slate-100 text-gray-700 shadow-inner"
														: ""
												}`}
											>
												{subItem.icon && (
													<subItem.icon size={isCollapsed ? 20 : 20} />
												)}{" "}
												{/* Adjust icon size here */}
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
										? "bg-slate-50 text-gray-700 shadow-inner"
										: ""
								}`}
							>
								<div
									className={`flex items-center ${
										isCollapsed ? "gap-0 pl-1" : "gap-4"
									}`}
								>
									<item.icon size={isCollapsed ? 20 : 24} />{" "}
									{!isCollapsed && <span>{item.text}</span>}
								</div>
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
