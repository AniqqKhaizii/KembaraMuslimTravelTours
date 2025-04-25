"use client";

import React from "react";
import Image from "next/image";

const ContactPage = () => {
	return (
		<div className="w-full">
			{/* Banner Section */}
			<div className="h-[50vh] relative overflow-hidden z-0">
				<video
					className="absolute top-0 left-0 w-full h-full object-cover"
					autoPlay
					loop
					muted
				>
					<source src="/Videos/Hero1.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<div className="relative z-1 flex flex-col items-center justify-center w-full h-full bg-black/80">
					<p className="text-center text-orange-600 font-reenie text-2xl my-2 font-semibold">
						"See the World, Stay True to Your Faith"
					</p>
					<h1 className="text-5xl font-bold  text-white">Hubungi Kami</h1>
				</div>
			</div>

			{/* Main Content Section */}
			<div className="shadow-lg bg-gradient-to-br from-white to-gray-100 max-w-screen-2xl lg:mx-auto mx-2 my-12 rounded-xl overflow-hidden">
				<div className="grid lg:grid-cols-2 gap-6">
					{/* Contact Information */}
					<div className="bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 p-12 text-white">
						<h2 className="text-4xl font-extrabold mb-4">Maklumat Kami</h2>
						<p className="text-lg font-light mb-8">
							Kami di <strong>Kembara Muslim Travel & Tours</strong> sentiasa
							bersedia membantu anda. Hubungi kami melalui maklumat di bawah.
						</p>
						<hr className="border-orange-200 mb-8" />
						<div className="space-y-8">
							<div>
								<h3 className="text-2xl font-semibold">Alamat Pejabat</h3>
								<p className="text-sm mt-2">
									Simpang Tiga Kemboja, Alor Setar Kedah, 48, Jalan Bawal 2,
									<br />
									Air Hitam, 06150 Ayer Hitam,
									<br />
									Kedah Darul Aman, Malaysia
								</p>
							</div>
							<div>
								<h3 className="text-2xl font-semibold">Nombor Telefon</h3>
								<p className="text-sm mt-2">04 - 794 6926</p>
							</div>
							<div>
								<h3 className="text-2xl font-semibold">Waktu Operasi</h3>
								<p className="text-sm mt-2">
									Ahad - Khamis: 9:00 AM - 5:00 PM
									<br />
									Jumaat - Sabtu: Tutup
								</p>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className="px-6 py-12  rounded-lg ">
						<h2 className="text-4xl font-extrabold text-orange-600 mb-6">
							Hantarkan Pesanan Anda
						</h2>
						<form className="space-y-6">
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Nama Penuh
								</label>
								<input
									type="text"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
									placeholder="Nama Anda"
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Alamat Emel
								</label>
								<input
									type="email"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
									placeholder="example@email.com"
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Nombor Telefon
								</label>
								<input
									type="tel"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
									placeholder="+60123456789"
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">
									Mesej
								</label>
								<textarea
									rows={4}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
									placeholder="Tulis mesej anda di sini"
								></textarea>
							</div>
							<button
								type="submit"
								className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 transition duration-300"
							>
								Hantar
							</button>
						</form>
					</div>
				</div>
			</div>

			{/* Google Maps Section */}
			<section className="w-full h-96 mt-12">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.051536147219!2d100.22771557581599!3d6.25694162620184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304b60f10b27c343%3A0xd346043d49cf31d0!2sKembara%20Muslim%20Travel%20%26%20Tours%20Sdn%20Bhd!5e0!3m2!1sen!2smy!4v1730721866139!5m2!1sen!2smy"
					className="w-full h-full shadow-lg"
					allowFullScreen=""
					loading="lazy"
					title="Google Maps Location"
				></iframe>
			</section>
		</div>
	);
};

export default ContactPage;
