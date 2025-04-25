"use client";
import Image from "next/image";
import CountUp from "react-countup";
import * as motion from "framer-motion/client";
export default function HeroSection() {
	return (
		<section className="lg:px-48 px-12 flex flex-col lg:flex-row lg:items-center justify-center lg:justify-around lg:py-16 py-8">
			{/* Image Grid */}
			<div
				data-aos="fade-right"
				className="grid lg:grid-cols-2 grid-cols-1 items-start gap-4 w-1/2 lg:w-1/3"
			>
				<div className="flex lg:flex-col flex-row gap-4">
					<Image
						src="/Tentang/1.jpg"
						alt="Train in Switzerland"
						width={300}
						height={200}
						className="rounded-ss-full rounded-ee-lg h-[35vh] shadow-md"
					/>
					<Image
						src="/Tentang/2.jpg"
						alt="Street View"
						width={300}
						height={200}
						className="lg:rounded-es-lg rounded-se-lg shadow-md"
					/>
				</div>
				<div className="flex lg:flex-col flex-row gap-4">
					<Image
						src="/Tentang/3.jpg"
						alt="Hot Air Balloons"
						width={300}
						height={200}
						className="h-[35vh] lg:rounded-se-lg rounded-es-lg shadow-md"
					/>
					<Image
						src="/Tentang/4.jpg"
						alt="Lake View"
						width={300}
						height={200}
						className="rounded-ee-full rounded-ss-lg shadow-md"
					/>
				</div>
			</div>

			{/* Text Content */}
			<div
				data-aos="fade-left"
				className="lg:w-1/2 mt-10 lg:mt-0 text-center lg:text-left"
			>
				<span className="bg-orange-500 text-white px-4 py-2 text-md rounded-full shadow">
					Rakan Umrah Terbaik Anda
				</span>
				<h1 className="text-4xl font-bold mt-4">
					Kembara Muslim <span className="text-orange-600">Travel & Tours</span>
				</h1>
				<p className="mt-4 text-gray-600 flex items-center justify-center lg:justify-start font-primary">
					Google Rating: <span className="text-yellow-500 ml-2">★★★★★ 4.9</span>
				</p>
				{/* <p className="mt-2 text-gray-700">
					Kepakaran kami adalah menguruskan dan memastikan umrah anda selesa dan
					sempurna.
				</p> */}

				<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
					<div>
						<h3 className="text-2xl font-bold text-orange-600 lg:text-left text-center">
							<CountUp start={0} end={10000} duration={2.5} separator="," />+
						</h3>
						<p className="text-gray-900 text-md lg:text-left text-center font-primary text-sm">
							Pelanggan sudah melancong bersama kami
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold text-orange-600 lg:text-left text-center">
							<CountUp start={0} end={2000} duration={2.5} separator="," />+
						</h3>
						<p className="text-gray-900 text-md lg:text-left text-center font-primary text-sm">
							Penerbangan telah kami uruskan
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold text-orange-600 lg:text-left text-center">
							<CountUp start={0} end={10} duration={2} />+
						</h3>
						<p className="text-gray-900 text-md lg:text-left text-center font-primary text-sm">
							Tahun pengalaman di dalam industri
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-bold text-orange-600 lg:text-left text-center">
							<CountUp start={0} end={50} duration={2} />+
						</h3>
						<p className="text-gray-900 text-md lg:text-left text-center font-primary text-sm">
							Jenis pakej yang berbeza
						</p>
					</div>
				</div>

				<div className="mt-4 text-left">
					<p className="text-gray-800 text-md text-justify font-primary text-sm">
						Kembara MuslimTravel & Tours Sdn Bhd ialah sebuah agensi pelancongan
						berlesen yang berpusat di Ayer Hitam, Kedah dan berdaftar di bawah
						Kementerian Pelancongan, Seni dan Budaya Malaysia (MOTAC). Syarikat
						ini terkenal dalam menguruskan pakej Umrah, serta menawarkan
						pelbagai pakej pelancongan domestik dan antarabangsa. Mereka
						dikenali dengan perkhidmatan yang berkualiti dan harga yang mampu
						milik, sesuai untuk pelbagai golongan. Antara tawaran mereka
						termasuklah pakej Umrah berkumpulan, percutian keluarga, serta
						program ziarah yang lengkap dan mesra Muslim.
					</p>
				</div>
			</div>
		</section>
	);
}
