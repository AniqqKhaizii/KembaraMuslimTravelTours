import Image from "next/image";

export default function Loading() {
	return (
		<div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-orange-600 via-orange-400 to-orange-600 overflow-hidden">
			<div className="text-center overflow-hidden">
				{/* Logo */}
				<div className="mb-6">
					<Image
						src="/LOGOKMTT.png" // Replace with your logo path
						alt="Kembara Muslim Travel & Tours Logo"
						width={200}
						height={200}
						className="mx-auto animate-spin-slow"
					/>
				</div>
				{/* Animated Loading Text */}
				<div className="flex items-center justify-center overflow-hidden">
					<span className="text-white text-xl mr-2">Loading</span>
					<div className="flex space-x-1">
						<div className="h-1 w-1 bg-white rounded-full animate-bounce delay-75"></div>
						<div className="h-1 w-1 bg-white rounded-full animate-bounce delay-150"></div>
						<div className="h-1 w-1 bg-white rounded-full animate-bounce delay-300"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
