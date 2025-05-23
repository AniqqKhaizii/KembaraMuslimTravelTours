import React from "react";
import * as motion from "framer-motion/client";
function Tentang() {
	const tajukVariants = {
		offscreen: {
			y: 100,
		},
		onscreen: {
			y: 0,
			transition: {
				type: "Linear",
				duration: 0.6,
			},
		},
	};

	return (
		<section className="relative bg-[url('https://images.unsplash.com/photo-1639574326077-6cc1d8749395?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-fixed bg-top sm:h-[60vh] h-[150vh] px-6 flex items-center text-slate-100 overflow-x-hidden">
			<div className="h-full absolute inset-0 bg-gradient-to-b from-gray-950/70 to-gray-950/80 "></div>

			<div className="relative mx-auto max-w-screen-2xl px-2 lg:px-8">
				<div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-0">
					<div
						data-aos="fade-right"
						className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left "
					>
						<p className="text-gray-300 font-reenie text-2xl my-2 font-semiregular">
							Journeys of Faith and Discovery
						</p>
						<h2 className="text-3xl font-bold sm:text-5xl">
							Kemudahan Yang Kami Sediakan
						</h2>

						<p className="mt-4 text-gray-300 font-primary">
							Jemaah akan diberikan kelengkapan dan kemudahan yang disediakan
							oleh pihak kami sepanjang perjalanan anda ke Tanah Suci.
						</p>

						<a
							href="/Pakej"
							className="mt-8 inline-block bg-orange-500 px-4 py-1.5 text-md font-medium text-white transition hover:bg-orange-600 focus:outline-none rounded-2xl"
						>
							Lihat Pakej Kami
						</a>
					</div>

					<div className="grid grid-cols-2 lg:gap-x-8 gap-x-4 gap-y-8 sm:grid-cols-3">
						<div
							data-aos="fade-left"
							className="flex flex-col rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 py-4 lg:px-8 px-2 shadow-sm justify-center items-center"
						>
							<span className="text-center inline-flex items-center justify-center h-12 w-12 rounded-lg">
								<img
									width="64"
									height="64"
									src="https://img.icons8.com/ios-filled/50/FFFFFF/open-book.png"
									alt="open-book"
								/>
							</span>

							<h2 className="mt-2 text-md text-center font-regular text-white">
								Kursus Umrah Percuma
							</h2>
						</div>
						<div
							data-aos="fade-left"
							className="flex flex-col rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 py-4 lg:px-8 px-2 shadow-sm justify-center items-center"
						>
							<span className="text-center inline-flex items-center justify-center h-12 w-12 rounded-lg">
								<img
									width="64"
									height="64"
									src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/FFFFFF/external-flight-ticket-airport-kmg-design-detailed-outline-kmg-design.png"
									alt="external-flight-ticket-airport-kmg-design-detailed-outline-kmg-design"
								/>
							</span>

							<h2 className="mt-2 text-md text-center font-regular text-white">
								Tiket Penerbangan
							</h2>
						</div>
						<div
							data-aos="fade-left"
							className="flex flex-col rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 py-4 lg:px-8 px-2 shadow-sm justify-center items-center"
						>
							<span className="text-center inline-flex items-center justify-center h-12 w-12 rounded-lg">
								<img
									width="64"
									height="64"
									src="https://img.icons8.com/external-nawicon-detailed-outline-nawicon/64/FFFFFF/external-luggage-summer-nawicon-detailed-outline-nawicon.png"
									alt="external-luggage-summer-nawicon-detailed-outline-nawicon"
								/>
							</span>

							<h2 className="mt-2 text-md text-center font-regular text-white">
								Kit Umrah Ekslusif
							</h2>
						</div>
						<div
							data-aos="fade-left"
							className="flex flex-col rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 py-4 lg:px-8 px-2 shadow-sm justify-center items-center"
						>
							<span className="text-center inline-flex items-center justify-center h-12 w-12 rounded-lg">
								<img
									width="64"
									height="64"
									src="https://img.icons8.com/isometric-line/50/FFFFFF/5-star-hotel.png"
									alt="5-star-hotel"
								/>
							</span>

							<h2 className="mt-2 text-md text-center font-regular text-white">
								Hotel Dekat & Selesa
							</h2>
						</div>
						<div
							data-aos="fade-left"
							className="flex flex-col rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 py-4 lg:px-8 px-2 shadow-sm justify-center items-center"
						>
							<span className="text-center inline-flex items-center justify-center h-12 w-12 rounded-lg">
								<img
									width="64"
									height="64"
									src="https://img.icons8.com/ios/50/FFFFFF/bus.png"
									alt="pengangkutan"
								/>
							</span>

							<h2 className="mt-2 text-md text-center font-regular text-white">
								Pengangkutan Selesa
							</h2>
						</div>
						<div
							data-aos="fade-left"
							className="flex flex-col rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 py-4 lg:px-8 px-2 shadow-sm justify-center items-center"
						>
							<span className="text-center inline-flex items-center justify-center h-12 w-12 rounded-lg">
								<img
									width="64"
									height="64"
									src="https://img.icons8.com/external-outline-berkahicon/64/FFFFFF/external-tour-linely-tourism-outline-berkahicon.png"
									alt="external-tour-linely-tourism-outline-berkahicon"
								/>
							</span>

							<h2 className="mt-2 text-md text-center font-regular text-white">
								Mutawwif Berpengalaman
							</h2>
						</div>
					</div>
				</div>
			</div>
			{/* <div
				data-aos="fade-right"
				className="absolute bottom-5 left-10 lg:h-[25vh] h-[15vh] flex items-end justify-end"
			>
				<img
					src="/2.png"
					alt="Logo"
					className="w-full h-full object-contain drop-shadow-2xl"
				/>
			</div> */}
		</section>
	);
}

export default Tentang;
