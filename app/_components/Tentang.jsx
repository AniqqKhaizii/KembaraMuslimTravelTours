"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
	FaPlaneDeparture,
	FaUsers,
	FaCalendarAlt,
	FaMapMarkedAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const targetDate = new Date("2025-06-05T00:00:00");

export default function AgencyInfoShowcase() {
	const [timeLeft, setTimeLeft] = useState({});

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const difference = targetDate - now;
			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((difference / 1000 / 60) % 60);
			const seconds = Math.floor((difference / 1000) % 60);
			setTimeLeft({ days, hours, minutes, seconds });
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative bg-[url('https://images.unsplash.com/photo-1639574326077-6cc1d8749395?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-fixed bg-top lg:h-[60vh] h-[120vh] px-6 flex items-center text-slate-100 overflow-hidden">
			<div className="h-full absolute inset-0 bg-gradient-to-b from-gray-950/70 to-gray-950/80 "></div>
			<div className="absolute inset-0 lg:max-w-7xl lg:m-auto md:m-24 sm:m-12 xs:m-12 grid lg:grid-cols-2 grid-cols-1 gap-24 items-center">
				<div className="flex flex-col lg:items-start items-center">
					<h2 className="lg:text-left text-center text-3xl md:text-4xl font-bold text-kmtt-text mb-4">
						Kembara Muslim{" "}
						<span className="text-kmtt-primary">Travel & Tours</span>
					</h2>
					<p className="lg:text-left text-center text-kmtt-text text-base mb-6">
						Agensi pelancongan berlesen berpusat di Ayer Hitam, Kedah.
						Menyediakan pakej Umrah dan percutian mesra Muslim dengan harga
						berpatutan.
					</p>

					<div className="grid grid-cols-2 sm:grid-cols-4 gap-5 lg:divide-x divide-kmtt-text mb-4 border-t border-kmtt-text/40 pt-2">
						{[
							{ icon: <FaUsers />, value: 5000, label: "Pelanggan" },
							{ icon: <FaPlaneDeparture />, value: 1000, label: "Penerbangan" },
							{ icon: <FaCalendarAlt />, value: 10, label: "Tahun" },
							{ icon: <FaMapMarkedAlt />, value: 25, label: "Pakej" },
						].map((item, i) => (
							<div
								key={i}
								className="flex lg:flex-row flex-col gap-4 items-center lg:justify-center justify-start lg:text-center text-left"
							>
								<div className="text-2xl text-orange-500 h-full flex items-center ml-2">
									{item.icon}
								</div>
								<div className="flex flex-col lg:items-start items-center justify-center ">
									<h3 className="text-xl font-semibold text-kmtt-text">
										<CountUp end={item.value} duration={2} separator="," />+
									</h3>
									<p className="text-sm text-kmtt-accent">{item.label}</p>
								</div>
							</div>
						))}
					</div>

					<Link href="/KembaraDuaTanahSuci" className="lg:mx-0 mx-auto">
						<button className="mt-4 px-6 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm md:text-base shadow-lg">
							Kembara Dua Tanah Suci
						</button>
					</Link>
				</div>

				<div className="relative overflow-hidden rounded-xl shadow-lg bg-white p-6 sm:p-8 lg:mb-0 mb-8">
					<form className="w-full max-w-xl space-y-3">
						<div className="space-y-2">
							<h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
								Borang Maklumat Jemaah
							</h2>

							<div className="space-y-1">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Nama Penuh
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									placeholder="Contoh: Ahmad bin Ali"
									className="mt-1 block w-full rounded-md text-gray-800 border border-gray-300 px-4 py-2 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
								/>
							</div>

							<div className="space-y-1">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Emel
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									placeholder="Contoh: ahmad@email.com"
									className="mt-1 block w-full rounded-md text-gray-800 border border-gray-300 px-4 py-2 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
								/>
							</div>

							<div className="space-y-1">
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-gray-700"
								>
									No Telefon
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									required
									placeholder="Contoh: 012-3456789"
									className="mt-1 block w-full rounded-md text-gray-800 border border-gray-300 px-4 py-2 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl text-sm font-semibold transition duration-300"
							>
								Hantar Maklumat
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
