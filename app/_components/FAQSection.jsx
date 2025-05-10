"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
	{
		question: "Bagaimana cara mendaftar?",
		answer:
			"Pendaftaran boleh dibuat melalui laman web rasmi kami atau terus hubungi wakil jualan kami.",
	},
	{
		question: "Adakah vaksin diperlukan?",
		answer:
			"Ya, suntikan vaksin meningokokus wajib untuk semua jemaah Umrah yang ingin memasuki Arab Saudi.",
	},
	{
		question: "Dokumen apa yang perlu disediakan?",
		answer:
			"Anda perlu sediakan salinan pasport, kad pengenalan, gambar berukuran passport dan sijil vaksinasi.",
	},
];

export default function FAQSection() {
	const [openIndex, setOpenIndex] = useState(null);
	const faqContainerRef = useRef(null);

	useEffect(() => {
		const elements = faqContainerRef.current.querySelectorAll(".faq-item");

		elements.forEach((el, i) => {
			gsap.fromTo(
				el,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					delay: i * 0.1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: el,
						start: "top 90%",
					},
				}
			);
		});
	}, []);

	return (
		<section className="max-w-screen-2xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
			<div ref={faqContainerRef}>
				<h2 className="text-4xl lg:text-left text-center font-bold mb-8 text-gray-800">
					Soalan Lazim
				</h2>
				<div className="space-y-5">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="faq-item border border-gray-200 rounded-xl p-6 bg-white shadow-sm transition-all duration-300"
						>
							<button
								onClick={() => setOpenIndex(openIndex === index ? null : index)}
								className="flex justify-between items-center w-full text-left lg:text-lg text-md font-medium text-gray-800"
							>
								<span>{faq.question}</span>
								{openIndex === index ? (
									<FaChevronUp className="text-yellow-600" />
								) : (
									<FaChevronDown className="text-gray-500" />
								)}
							</button>
							<div
								className={`grid transition-all duration-300 text-gray-600 lg:text-sm text-xs overflow-hidden ${
									openIndex === index
										? "grid-rows-[1fr] mt-4"
										: "grid-rows-[0fr]"
								}`}
							>
								<div className="overflow-hidden">{faq.answer}</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="lg:flex hidden items-center justify-center">
				<div className="relative w-full max-w-md aspect-square">
					<img
						src="/images/masjid-illustration.png"
						alt="Islamic Illustration"
						className="w-full h-full object-contain animate-float"
					/>
					<div className="absolute inset-0 rounded-full bg-yellow-100 opacity-30 blur-3xl"></div>
				</div>
			</div>
		</section>
	);
}
