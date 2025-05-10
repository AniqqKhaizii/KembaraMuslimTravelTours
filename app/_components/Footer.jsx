import React, { useEffect, useState } from "react";
import Axios from "axios";
import Image from "next/image";
const Footer = () => {
	const [packages, setPackages] = useState([]);

	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const response = await Axios.get("/api/Tetapan/ManagePackage", {
					params: {
						Operation: "SEARCH",
						TripUnique: "Y",
					},
				});
				setPackages(response.data);
			} catch (error) {
				console.error("Error fetching packages:", error);
			}
		};
		fetchPackages();
	}, []);
	// from-[#090909] via-[#181818] to-[#090909]
	return (
		<footer className="bg-gradient-to-b from-kmtt-primary to-[#e93400] shadow-inner brightness-110">
			<div className="mx-auto max-w-screen-2xl px-4 pb-6 pt-16 lg:pt-24">
				<div className="grid grid-cols-1 gap-20 lg:grid-cols-3">
					<div>
						<div className="flex justify-center text-teal-200 sm:justify-start -my-6">
							<img src="/KMTT.png" alt="Logo" width={200} height={100} />
						</div>

						<p className="max-w-md text-center leading-relaxed text-gray-100 sm:max-w-xs sm:text-left">
							&quot;Bersama Anda Menyempurnakan{" "}
							<span className="text-kmtt-contrast">Umrah</span>&quot;
						</p>

						<ul className="mt-8 flex justify-center gap-2 sm:justify-start md:gap-4">
							<li>
								<a
									href="https://www.facebook.com/kembaramuslimtravel?locale=ms_MY"
									rel="noreferrer"
									target="_blank"
									className="text-teal-200 transition hover:text-kmtt-contrast/75"
								>
									<span className="sr-only">Facebook</span>
									<svg
										className="size-6"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</li>

							<li>
								<a
									href="https://www.instagram.com/kembaramuslim.travel/"
									rel="noreferrer"
									target="_blank"
									className="text-teal-200 transition hover:text-kmtt-contrast/75"
								>
									<span className="sr-only">Instagram</span>
									<svg
										className="size-6"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</li>

							<li>
								<a
									href="https://www.tiktok.com/@kembaramuslim"
									rel="noreferrer"
									target="_blank"
									className="text-teal-200 transition hover:text-kmtt-contrast/75"
								>
									<span className="sr-only">Tiktok</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										className="size-8 bi bi-tiktok"
										viewBox="0 0 24 24"
									>
										<path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
									</svg>
								</a>
							</li>
						</ul>
					</div>

					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
						<div className="text-center sm:text-left">
							<p className="text-lg font-medium text-kmtt-contrast">Syarikat</p>

							<ul className="mt-4 space-y-4 text-sm">
								<li>
									<a
										className="text-kmtt-text transition hover:text-kmtt-accent drop-shadow"
										href="/Tentang"
									>
										Tentang Kami
									</a>
								</li>

								<li>
									<a
										className="text-kmtt-text transition hover:text-kmtt-accent drop-shadow"
										href="/TermaNSyarat"
									>
										Terma & Syarat
									</a>
								</li>
							</ul>
						</div>

						<div className="text-center sm:text-left">
							<p className="text-lg font-medium text-kmtt-contrast">
								Pakej Umrah
							</p>

							<ul className="mt-4 space-y-4 text-sm">
								{packages.map((item, index) => (
									<li key={index}>
										<a
											className="text-kmtt-text transition hover:text-kmtt-accent drop-shadow"
											href={`/Pakej/Pakej-Umrah?kategori=${item.PakejName}`}
										>
											Pakej Umrah {item.PakejName}
										</a>
									</li>
								))}
							</ul>
						</div>

						<div className="text-center sm:text-left">
							<p className="text-lg font-medium text-kmtt-contrast">
								Hubungi Kami
							</p>

							<ul className="mt-4 space-y-4 text-sm">
								<li>
									<a
										className="text-kmtt-text transition hover:text-kmtt-accent drop-shadow"
										href="#"
									>
										{" "}
										FAQs{" "}
									</a>
								</li>

								<li>
									<a
										className="text-kmtt-text transition hover:text-kmtt-accent drop-shadow"
										href="#"
									>
										Testimoni
									</a>
								</li>

								<li>
									<a
										className="group flex justify-center gap-1.5 sm:justify-start "
										href="#"
									>
										<span className="text-kmtt-text transition group-hover:text-kmtt-accent">
											Live Chat
										</span>

										<span className="relative flex size-2">
											<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-200 opacity-75"></span>
											<span className="relative inline-flex size-2 rounded-full bg-kmtt-accent"></span>
										</span>
									</a>
								</li>
							</ul>
						</div>

						<div className="text-center sm:text-left">
							<p className="text-lg font-medium text-kmtt-contrast">
								Lokasi Kami
							</p>

							<ul className="mt-4 space-y-4 text-sm">
								<li>
									<a
										className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
										href="#"
									>
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.051536147219!2d100.22771557581599!3d6.25694162620184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304b60f10b27c343%3A0xd346043d49cf31d0!2sKembara%20Muslim%20Travel%20%26%20Tours%20Sdn%20Bhd!5e0!3m2!1sen!2smy!4v1730721866139!5m2!1sen!2smy"
											width="600"
											height="250"
											allowFullScreen=""
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
										></iframe>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-12 border-t border-gray-100 pt-6">
					<div className="text-center sm:flex sm:justify-between sm:text-left">
						<p className="text-sm text-gray-100">
							<span className="block sm:inline mx-2">
								Hak Cipta Terpelihara.
							</span>
							{/* 
							<a
								className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
								href="#"
							>
								Terms & Conditions
							</a>

							<span>&middot;</span>

							<a
								className="inline-block text-teal-600 underline transition hover:text-teal-600/75  mx-2"
								href="#"
							>
								Privacy Policy
							</a> */}
						</p>

						<p className="mt-4 text-sm text-gray-100 sm:order-first sm:mt-0">
							Kembara Muslim Travels & Tours 2024 &copy; AniqKhaizi
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
