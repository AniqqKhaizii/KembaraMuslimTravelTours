import React from "react";

const Banner = () => {
	return (
		<div className="bg-gradient-to-r from-amber-600 to-orange-400 px-6 py-2 text-white sm:flex sm:items-center sm:justify-between sm:px-10 lg:px-16 ">
			{/* Left Section: Contact Info */}
			<div className="text-sm">
				<p className="font-medium">
					📧 <span className="opacity-90">Email:</span>
					<a
						href="mailto:support@example.com"
						className="hover:text-yellow-400 underline underline-offset-2 transition duration-200"
					>
						support@example.com
					</a>
				</p>
			</div>

			{/* Right Section: Agent Login */}
			<a
				href="/Admin"
				className="flex items-center gap-2 text-sm font-semibold underline underline-offset-4 transition duration-200 group hover:text-orange-400"
			>
				<span>Agent Login &gt;</span>
			</a>
		</div>
	);
};

export default Banner;
