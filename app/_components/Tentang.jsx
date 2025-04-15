"use client";
import Image from "next/image";
import CountUp from "react-countup";
import * as motion from "framer-motion/client";
export default function HeroSection() {
	return (
		<section className="lg:px-48 px-12 flex flex-col lg:flex-row lg:items-center justify-center lg:justify-around lg:py-24 py-12">
			{/* Image Grid */}
			<motion.div
				className="grid lg:grid-cols-2 grid-cols-1 items-start gap-4 w-1/2 lg:w-1/3"
				initial={{ x: -100 }}
				whileInView={{ x: 0 }}
				transition={{ ease: "easeInOut", duration: 1 }}
				viewport={{ once: true, amount: 0.2 }}
			>
				<div className="flex lg:flex-col flex-row gap-4">
					<Image
						src="/Tentang/1.jpg"
						alt="Train in Switzerland"
						width={300}
						height={200}
						className="rounded-ss-full h-[35vh]"
					/>
					<Image
						src="/Tentang/2.jpg"
						alt="Street View"
						width={300}
						height={200}
						className="lg:rounded-es-lg rounded-se-lg"
					/>
				</div>
				<div className="flex lg:flex-col flex-row gap-4">
					<Image
						src="/Tentang/3.jpg"
						alt="Hot Air Balloons"
						width={300}
						height={200}
						className="h-[35vh] lg:rounded-se-lg rounded-es-lg"
					/>
					<Image
						src="/Tentang/4.jpg"
						alt="Lake View"
						width={300}
						height={200}
						className="rounded-ee-full"
					/>
				</div>
			</motion.div>

			{/* Text Content */}
			<motion.div
				initial={{ x: 100 }}
				whileInView={{ x: 0 }}
				transition={{ ease: "easeInOut", duration: 1 }}
				viewport={{ once: true, amount: 0.2 }}
				className="lg:w-1/2 mt-10 lg:mt-0 text-center lg:text-left"
			>
				<span className="bg-red-100 text-red-600 px-4 py-1 text-sm rounded-full">
					Rakan Umrah Terbaik Anda
				</span>
				<h1 className="text-4xl font-bold mt-4">
					Kembara Muslim <span className="text-orange-600">Travel & Tours</span>
				</h1>
				<p className="mt-2 text-gray-600 flex items-center justify-center lg:justify-start">
					Google Rating: <span className="text-yellow-500 ml-2">★★★★★ 4.9</span>
				</p>
				<p className="mt-4 text-gray-700">
					Kepakaran kami adalah menguruskan dan memastikan umrah anda selesa dan
					sempurna.
				</p>
				{/* <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
					Semua Pakej
				</button> */}

				{/* Stats with CountUp Animation */}
				<div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
					<div>
						<h3 className="text-2xl font-bold text-red-600 lg:text-left text-center">
							<CountUp start={0} end={10000} duration={2.5} separator="," />+
						</h3>
						<p className="text-gray-600 text-sm lg:text-left text-center">
							Pelanggan sudah melancong bersama kami
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold text-red-600 lg:text-left text-center">
							<CountUp start={0} end={2000} duration={2.5} separator="," />+
						</h3>
						<p className="text-gray-600 text-sm lg:text-left text-center">
							Penerbangan telah kami uruskan
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold text-red-600 lg:text-left text-center">
							<CountUp start={0} end={10} duration={2} />+
						</h3>
						<p className="text-gray-600 text-sm lg:text-left text-center">
							Tahun pengalaman di dalam industri
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold text-red-600 lg:text-left text-center">
							<CountUp start={0} end={50} duration={2} />+
						</h3>
						<p className="text-gray-600 text-sm lg:text-left text-center">
							Jenis pakej yang berbeza
						</p>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
