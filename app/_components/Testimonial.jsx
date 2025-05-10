"use client";
import React, { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
const Testimonial = () => {
	const [reviews, setReviews] = useState([]);
	const [expandedReviews, setExpandedReviews] = useState(new Set());
	const placeId = "ChIJQ8MnC_FgSzAR0DHPST0ERtM";

	useEffect(() => {
		if (!document.querySelector("#elfsight-platform-script")) {
			const script = document.createElement("script");
			script.src = "https://static.elfsight.com/platform/platform.js";
			script.async = true;
			script.id = "elfsight-platform-script";
			document.body.appendChild(script);
		}
	}, []);

	// useEffect(() => {
	// 	const fetchReviews = async () => {
	// 		try {
	// 			const response = await fetch(
	// 				`/api/getReviews?place_id=${placeId}&language=ms`
	// 			);
	// 			const data = await response.json();
	// 			setReviews(data.result.reviews || []);
	// 		} catch (error) {
	// 			console.error("Error fetching reviews:", error);
	// 		}
	// 	};

	// 	fetchReviews();
	// }, [placeId]);

	const toggleExpand = (index) => {
		const newExpandedReviews = new Set(expandedReviews);
		if (newExpandedReviews.has(index)) {
			newExpandedReviews.delete(index);
		} else {
			newExpandedReviews.add(index);
		}
		setExpandedReviews(newExpandedReviews);
	};

	const maxLength = 150;
	return (
		<section className="bg-kmtt-text overflow-x-hidden px-2">
			<div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
				<p className="text-center text-gray-700 font-reenie text-2xl font-semibold">
					Truly enriching journey!
				</p>
				<h2 className="text-center text-5xl font-bold tracking-tighter text-orange-600 sm:text-5xl mb-4">
					Testimoni Jemaah Kami
				</h2>
				{/* <p className="mt-4 text-center text-gray-500">
					Kami di Kembara Muslim Travel & Tours mengucapkan setinggi tinggi
					penghargaan kepada anda kerana memilih kami sebagai agen pengurusan
					umrah anda dan kami juga berasa bangga kerana dapat bekerjasama dengan
					anda.
				</p> */}
				<div
					className="elfsight-app-1b00d326-3288-48da-91fc-ddcc2fb87c62"
					data-elfsight-app-lazy
				></div>
				{/* <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-4 lg:columns-3 lg:gap-4">
					{reviews.map((review, index) => (
						<div key={index} className="mb-8 sm:break-inside-avoid">
							<motion.blockquote
								initial={{ scale: 0, opacity: 0 }}
								whileInView={{ scale: 1, opacity: 1 }}
								transition={{
									ease: "easeInOut",
									duration: 0.8,
									delay: index * 0.2,
								}}
								viewport={{ once: true, amount: 0.2 }}
								className="rounded-xl bg-gray-50 p-6 shadow-md sm:p-8"
							>
								<div className="flex items-center gap-2">
									<img
										alt={`${review.author_name}'s profile`}
										src={review.profile_photo_url}
										className="w-14 h-14 rounded-full object-cover"
										onError={(e) => {
											e.target.src = "/Placeholder1.png";
										}} // Fallback image
									/>
									<div>
										<div className="flex justify-start gap-0.5 text-green-500">
											{[...Array(review.rating)].map((_, starIndex) => (
												<svg
													key={starIndex}
													xmlns="http://www.w3.org/2000/svg"
													className="w-5 h-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											))}
										</div>
										<p className="mt-0.5 text-md font-medium text-gray-900">
											{review.author_name}
										</p>
									</div>
								</div>
								<p className="mt-4 text-gray-700 font-primary text-sm">
									{expandedReviews.has(index)
										? review.text
										: review.text.length > maxLength
										? `${review.text.substring(0, maxLength)}...`
										: review.text}
								</p>
								{review.text.length > maxLength && (
									<button
										onClick={() => toggleExpand(index)}
										className="mt-2 text-blue-600 hover:underline"
									>
										{expandedReviews.has(index) ? "See less" : "See more"}
									</button>
								)}
							</motion.blockquote>
						</div>
					))}
				</div> */}
			</div>
		</section>
	);
};

export default Testimonial;
