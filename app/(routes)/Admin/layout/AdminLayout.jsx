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
		<div className="overflow-clip bg-[url('/AdminMainBg3.jpg')] bg-cover bg-fixed">
			<div className="flex min-h-screen overflow-y-clip backdrop-blur-md backdrop-brightness-[0.25]">
				<Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

				<div className="flex flex-col w-full min-h-screen transition-all duration-300 overflow-clip">
					<Navbar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
					<div className="flex-1 overflow-auto">{children}</div>
					<footer className="flex items-center justify-between px-4 py-4 bottom-0 text-white border-t-2 border-gray-100/40">
						<p className="text-sm text-white">
							&copy; {new Date().getFullYear()} Kembara Muslim Travel & Tours
						</p>
						<p className="text-sm text-white">
							Developed by{" "}
							<a
								href="https://github.com/AniqqKhaizii"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-200 hover:underline"
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
