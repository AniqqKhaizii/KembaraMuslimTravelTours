"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbArrowAutofitLeft, TbArrowAutofitRight } from "react-icons/tb";
import AppearanceToggleTab from "@/components/ui/appearance-tabs";
const Navbar = ({ toggleSidebar, isCollapsed }) => {
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

	return (
		<div className="sm:px-4 px-4 py-4 h-fit w-full flex justify-between items-center z-10 border-b-2 dark:border-gray-100/40 border-gray-400/40 dark:text-white text-zinc-950">
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
			</div>
			<div className="flex items-center sm:gap-2 gap-2">
				<AppearanceToggleTab />
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
