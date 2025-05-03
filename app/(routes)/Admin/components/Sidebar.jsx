import { usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Axios from "axios";
import {
	MdOutlineDashboard,
	MdOutlineBookmarks,
	MdOutlineModeOfTravel,
	MdOutlineAddAPhoto,
} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { RiAdminLine, RiSettings3Line } from "react-icons/ri";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { PiUsersThree } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsSuitcaseLg } from "react-icons/bs";
import { LiaUserTieSolid } from "react-icons/lia";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
	const [userData, setUserData] = useState(null);
	const [adminData, setAdminData] = useState(null);
	const [initials, setInitials] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedUserData =
				sessionStorage.getItem("UserData") || localStorage.getItem("UserData");
			if (storedUserData) {
				setUserData(JSON.parse(storedUserData));
			}
		}
	}, []);

	useEffect(() => {
		if (userData) {
			const fetchUserInfo = async () => {
				const params = {
					Username: userData.AdmUname,
					UserLevel: userData.AdmLevel,
					UserRole: userData.AdmRole,
				};
				try {
					const response = await Axios.get(`/api/Admin/AdminCarian`, {
						params: params,
					});
					if (response.data.message) {
						alert(response.data.message);
					} else {
						const queryData = response.data;
						const names = queryData[0]?.AdmName.trim().split(" ");

						if (names.length === 0) return "";
						if (names.length === 1) return names[0].charAt(0).toUpperCase();

						const firstInitial = names[0].charAt(0);
						const lastInitial = names[names.length - 1].charAt(0);
						setInitials(`${firstInitial}${lastInitial}`);
						setAdminData(queryData);
					}
				} catch (error) {
					console.error("Error fetching user info", error);
				}
			};
			fetchUserInfo();
		}
	}, [userData]);

	const currentPage = usePathname().split("/")[2];
	const currentPageSubmenu = usePathname().split("/")[3];

	const [showUsersSubmenu, setShowUsersSubmenu] = useState(false);
	const [showTetapanSubmenu, setShowTetapanSubmenu] = useState(false);

	const sidebarData = [
		{ text: "Dashboard", icon: MdOutlineDashboard, href: "/Admin/Dashboard" },
		{ text: "Destination", icon: SlLocationPin, href: "/Admin/Destination" },
		{
			text: "Users",
			icon: AiOutlineUser,
			href: "#",
			submenu: [
				{ text: "Admin", icon: RiAdminLine, href: "/Admin/Users/AdminKMTT" },
				{ text: "Agent", icon: LiaUserTieSolid, href: "/Admin/Users/Agent" },
			],
		},
		{ text: "Customers", icon: PiUsersThree, href: "/Admin/Customers" },
		{ text: "Booking", icon: MdOutlineBookmarks, href: "/Admin/Booking" },
		{ text: "Payment", icon: LiaFileInvoiceSolid, href: "/Admin/Invoices" },
		{
			text: "Settings",
			icon: RiSettings3Line,
			href: "#",
			submenu: [
				{ text: "Pakej", icon: BsSuitcaseLg, href: "/Admin/Tetapan/Pakej" },
				{
					text: "Umrah Trip",
					icon: MdOutlineModeOfTravel,
					href: "/Admin/Tetapan/Trip",
				},
				{
					text: "Hotel",
					icon: HiOutlineBuildingOffice2,
					href: "/Admin/Tetapan/Hotel",
				},
				{
					text: "Galeri",
					icon: MdOutlineAddAPhoto,
					href: "/Admin/Tetapan/Galeri",
				},
			],
		},
	];

	const toggleUsersSubmenu = () => setShowUsersSubmenu(!showUsersSubmenu);
	const toggleTetapanSubmenu = () => setShowTetapanSubmenu(!showTetapanSubmenu);
	return (
		<div
			className={`${
				isCollapsed ? "w-16" : "w-48"
			} flex-col  bg-white/20 dark:bg-white/10 transition-all duration-300 hidden sm:flex z-50 sticky top-6 h-[95vh] py-6 ml-4 shadow-xl rounded-3xl`}
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
			<div className="flex flex-col justify-between h-full ">
				<ul className="pt-2 space-y-1 text-sm">
					{sidebarData.map((item) => (
						<li key={item.text}>
							{item.submenu ? (
								<div>
									<button
										className={`flex items-center justify-between w-full px-4 py-2 dark:text-gray-200 text-zinc-950 hover:bg-slate-50/60 hover:text-gray-700 rounded-ss-2xl transition-all duration-300 ${
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
											className={`flex items-center dark:dark:text-white text-zinc-950  ${
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
													(subItem) =>
														currentPage === subItem.href.split("/")[3]
												) ? (
													<BiChevronUp
														size={20}
														className="dark:dark:text-white text-zinc-950"
													/>
												) : (
													<BiChevronDown
														size={20}
														className="dark:text-white text-zinc-950"
													/>
												)
											) : showTetapanSubmenu ||
											  item.submenu?.some(
													(subItem) =>
														currentPage === subItem.href.split("/")[3]
											  ) ? (
												<BiChevronUp
													size={20}
													className="dark:text-white text-zinc-950"
												/>
											) : (
												<BiChevronDown
													size={20}
													className="dark:text-white text-zinc-950"
												/>
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
													} py-2 dark:text-white text-zinc-950 hover:bg-slate-100 hover:text-slate-900 dark:hover:text-slate-900 rounded-es-2xl transition-all duration-300 ${
														currentPageSubmenu === subItem.href.split("/")[3]
															? "bg-slate-100 text-gray-700 dark:text-slate-900 shadow-inner"
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
									className={`flex items-center gap-4 px-4 py-2 dark:text-gray-200 text-zinc-950 hover:bg-slate-100 dark:hover:text-gray-700 rounded-ss-2xl transition-all duration-300 ${
										currentPage === item.href.split("/")[2]
											? "bg-slate-50 dark:text-gray-700 shadow-inner"
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

				{/* User Info Button */}
				<button className="flex items-center justify-center gap-2 cursor-pointer dark:text-white text-zinc-950 hover:bg-white/10 transition-all duration-300 pt-4 mx-2 border-t dark:border-gray-100/40 border-gray-400/40">
					{adminData ? (
						<>
							<Avatar>
								<AvatarImage src={adminData[0].AdmImage} />
								<AvatarFallback>{initials}</AvatarFallback>
							</Avatar>
							{!isCollapsed && (
								<div className="flex flex-col items-start leading-none">
									<span className="text-xs font-bold whitespace-nowrap">
										{adminData[0]?.AdmName?.split(" ").slice(0, 2).join(" ") ||
											"Guest"}
									</span>
									<span className="text-xs font-light">
										{adminData[0].AdmRole || "Admin"}
									</span>
								</div>
							)}
						</>
					) : (
						<span>Loading...</span>
					)}
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
