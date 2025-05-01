"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Axios from "axios";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbArrowAutofitLeft, TbArrowAutofitRight } from "react-icons/tb";

const Navbar = ({ toggleSidebar, isCollapsed }) => {
	const [userData, setUserData] = useState(null);
	const [adminData, setAdminData] = useState(null);

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
						setAdminData(queryData);
					}
				} catch (error) {
					console.error("Error fetching user info", error);
				}
			};
			fetchUserInfo();
		}
	}, [userData]);

	const handleLogout = async () => {
		try {
			await Axios.post(`/api/Logout`);
			window.location.href = "/Admin";
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const toCamelCase = (str) => {
		const words = str.split(" ");
		const firstThreeWords = words
			.slice(0, 3)
			.map(
				(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
			);
		const remainingWords = words.slice(3).join(" ");
		return [...firstThreeWords].join(" ");
	};

	//  bg-[url('/AdminBg.png')] bg-cover
	return (
		<div className="sm:px-4 px-4 py-4 h-fit w-full flex justify-between items-center z-10 border-b-2 border-gray-100/40 text-white">
			<div className="flex items-center justify-start gap-4">
				<button
					onClick={toggleSidebar}
					className="bg-white/20 p-1 rounded-full border border-gray-100/50 hover:scale-105"
				>
					{isCollapsed ? (
						<TbArrowAutofitRight size={20} className="font-light" />
					) : (
						<TbArrowAutofitLeft size={20} className="font-light" />
					)}
				</button>
				{/* <h1 className="text-lg sm:flex hidden font-medium">
					{adminData && adminData.length > 0
						? toCamelCase(adminData[0]?.AdmName)
						: "Guest"}
				</h1> */}
			</div>
			<div className="flex items-center sm:gap-2 gap-2">
				{/* User Info Button */}
				<button className="flex items-center justify-center gap-2 cursor-pointer">
					{adminData ? (
						<>
							<Image
								src={adminData[0].Image || "/Placeholder1.png"}
								alt="User Profile"
								width={30}
								height={30}
								className="rounded-full shadow-md border border-gray-100/40"
							/>
							{/* <div className="flex flex-col items-start leading-none">
								<span className="text-sm font-regular">
									{adminData[0].AdmName || "Guest"}
								</span>
								<span className="text-xs font-regular">
									{adminData[0].AdmEmail || "Guest@example.com"}
								</span>
							</div> */}
						</>
					) : (
						<span>Loading...</span>
					)}
				</button>

				<button
					onClick={handleLogout}
					className="bg-white/20 border border-gray-100/40 p-1 rounded-full font-light drop-shadow-md hover:scale-105"
				>
					<RiLogoutCircleRLine size={20} />
				</button>
			</div>
		</div>
	);
};

export default Navbar;
