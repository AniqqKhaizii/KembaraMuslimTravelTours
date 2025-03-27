"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Axios from "axios";
import { RiLogoutCircleRLine } from "react-icons/ri";
const Navbar = () => {
	const [userData, setUserData] = useState(null); // Initially set to null
	const [adminData, setAdminData] = useState(null); // Initially set to null (changed from [] to null to track loading state)

	useEffect(() => {
		// Check if we are in the browser before accessing sessionStorage or localStorage
		if (typeof window !== "undefined") {
			const storedUserData =
				sessionStorage.getItem("UserData") || localStorage.getItem("UserData");
			if (storedUserData) {
				setUserData(JSON.parse(storedUserData));
			}
		}
	}, []);
	useEffect(() => {
		// Fetch user data only if userData is set
		if (userData) {
			const fetchUserInfo = async () => {
				const params = {
					Username: userData.AdmUname,
					UserLevel: userData.AdmLevel,
					UserRole: userData.AdmRole,
				};
				try {
					const response = await Axios.get(
						`http://localhost:3000/api/Admin/AdminCarian`,
						{
							params: params,
						}
					);
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

	// Logout function
	const handleLogout = async () => {
		try {
			await Axios.post(`http://localhost:3000/api/Logout`);
			window.location.href = "/Admin";
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className="sticky top-0 left-0 sm:px-4 px-4 py-2 bg-[url('/AdminBg.png')] bg-cover h-fit w-full flex justify-between items-center z-10">
			<h1 className="ml-10 mt-1 text-white text-xl sm:flex hidden">ADMIN</h1>
			<div className="flex items-center sm:gap-6 gap-2">
				{/* User Info Button */}
				<button className="flex items-center justify-center gap-2 cursor-pointer">
					{adminData ? (
						<>
							<Image
								src={adminData[0].Image || "/Placeholder1.png"}
								alt="User Profile"
								width={30}
								height={30}
								className="rounded-full shadow-md"
							/>
							<div className="flex flex-col items-start leading-none">
								<span className="text-white text-sm font-medium">
									{adminData[0].AdmName || "Guest"}
								</span>
								<span className="text-white text-xs font-medium">
									{adminData[0].AdmEmail || "Guest@example.com"}
								</span>
							</div>
						</>
					) : (
						<span className="text-white">Loading...</span> // Show "Loading..." if adminData is not fetched yet
					)}
				</button>

				{/* Logout Button */}
				<button
					onClick={handleLogout}
					className="text-2xl drop-shadow-md hover:scale-105 text-white"
				>
					<RiLogoutCircleRLine />
				</button>
			</div>
		</div>
	);
};

export default Navbar;
