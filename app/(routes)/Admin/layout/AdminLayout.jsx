"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleSidebar = () => {
		setIsCollapsed((prev) => !prev);
	};

	return (
		<div className="overflow-clip bg-[url('/AdminMainBg.jpg')] dark:bg-[url('/AdminMainBg3.jpg')] bg-cover bg-fixed transition-all duration-300">
			<div className="flex min-h-screen overflow-y-clip dark:backdrop-blur-md backdrop-blur-xl backdrop-brightness-110 dark:backdrop-brightness-[0.25]">
				<Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

				<div className="flex flex-col w-full min-h-screen transition-all duration-300 overflow-clip">
					<Navbar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
					<div className="flex-1 overflow-auto">{children}</div>
					<footer className="flex items-center justify-between px-4 py-4 bottom-0 dark:text-white text-zinc-950 border-t-2 dark:border-gray-100/40 border-gray-400/40">
						<p className="text-sm">
							&copy; {new Date().getFullYear()} Kembara Muslim Travel & Tours
						</p>
						<p className="text-sm">
							Developed by{" "}
							<a
								href="https://github.com/AniqqKhaizii"
								target="_blank"
								rel="noopener noreferrer"
								className="dark:text-blue-200 text-blue-500 hover:underline"
							>
								Cucu Man Said
							</a>
						</p>
					</footer>
				</div>
			</div>
		</div>
	);
};

export default Layout;
