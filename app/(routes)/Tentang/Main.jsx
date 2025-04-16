"use client";
import React from "react";
import Image from "next/image";
import * as motion from "framer-motion/client";
import CountUp from "react-countup";

const staffs = [
	{
		name: "Norlina Juhari",
		image: "/Tentang/CoFounder.png",
	},
	{
		name: "Rabiatul Adawiyah",
		image: "/Tentang/Staff1.png",
	},
	{
		name: "Hafiq Harun",
		image: "/Tentang/Staff2.png",
	},
	{
		name: "Afzal Azahar",
		image: "/Tentang/Staff3.png",
	},
	{
		name: "Syikin",
		image: "/Tentang/Staff4.png",
	},
];
const AboutUs = () => {
	return (
		<div className="bg-white text-gray-800">
			{/* Banner Section */}
			<div className="h-[60vh] relative overflow-hidden z-0 w-full">
				<video
					className="absolute top-0 left-0 w-full h-full object-cover"
					autoPlay
					loop
					muted
				>
					<source src="/Videos/Hero1.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<div className="absolute inset-0 h-full bg-gradient-to-t from-white via-black/50 to-black/90 from-0% via-40% to-100%"></div>
				{/* <div className="absolute inset-0 h-full bg-black/70"></div> */}

				<div
					data-aos="fade-right"
					className="relative z-1 max-w-screen-lg mx-auto flex flex-col lg:items-start items-center justify-center w-full h-full"
				>
					<h1 className="flex flex-col lg:text-left text-center lg:text-6xl text-4xl font-bold font-header text-white">
						<span className="text-white">Kembara Muslim</span>
						<span className="text-orange-600"> Travel & Tours</span>
					</h1>
				</div>
				{/* Image Row Between Sections */}
				<div
					data-aos="fade-left"
					className="absolute bottom-10 lg:right-40 right-0 z-10 flex justify-end w-full"
				>
					<img
						src="/Tentang/Staff.png"
						alt=""
						width={900}
						height={600}
						className="brightness-105"
					/>
				</div>
			</div>

			<section className="max-w-screen-2xl grid lg:grid-cols-2 grid-cols-1 gap-12 items-center mx-auto py-16">
				{/* Text Content */}
				<motion.div
					initial={{ x: -100 }}
					whileInView={{ x: 0 }}
					transition={{ ease: "easeInOut", duration: 1 }}
					viewport={{ once: true, amount: 0.2 }}
					className="mx-12 mt-10 lg:mt-0 text-center lg:text-left lg:order-1 order-2"
				>
					<span className="bg-red-100 text-red-600 px-4 py-1 text-sm rounded-full">
						Rakan Umrah Terbaik Anda
					</span>
					<h1 className="text-4xl font-bold mt-2 font-header">
						Kembara Muslim{" "}
						<span className="text-orange-600">Travel & Tours</span>
					</h1>
					<p className="mt-2 text-gray-600 flex items-center justify-center lg:justify-start">
						Google Rating:{" "}
						<span className="text-yellow-500 ml-2">★★★★★ 4.9</span>
					</p>
					<p className="mt-2 text-gray-700">
						Kepakaran kami adalah menguruskan dan memastikan umrah anda selesa
						dan sempurna.
					</p>

					{/* Stats with CountUp Animation */}
					<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
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

					<div className="mt-4 text-left">
						<p className="text-gray-600 text-justify text-sm font-primary">
							Kembara Muslim Travel & Tours Sdn Bhd ialah sebuah agensi
							pelancongan berlesen yang berpusat di Ayer Hitam, Kedah dan
							berdaftar di bawah Kementerian Pelancongan, Seni dan Budaya
							Malaysia (MOTAC). Syarikat ini terkenal dalam menguruskan pakej
							Umrah, serta menawarkan pelbagai pakej pelancongan domestik dan
							antarabangsa. Mereka dikenali dengan perkhidmatan yang berkualiti
							dan harga yang mampu milik, sesuai untuk pelbagai golongan. Antara
							tawaran mereka termasuklah pakej Umrah berkumpulan, percutian
							keluarga, serta program ziarah yang lengkap dan mesra Muslim.
						</p>
					</div>
				</motion.div>
				<motion.div
					className="order-1 lg:order-2 mx-6"
					initial={{ x: 100 }}
					whileInView={{ x: 0 }}
					transition={{ ease: "easeInOut", duration: 1 }}
					viewport={{ once: true, amount: 0.2 }}
				>
					<img
						src="/Tentang/Office.jpg"
						alt=""
						width={600}
						height={500}
						className="brightness-105 aspect-square rounded-md shadow-md"
					/>
				</motion.div>
			</section>

			{/* Sejarah Syarikat */}
			<div
				// data-aos="fade-up"
				className="max-w-screen-2xl mx-auto grid lg:grid-cols-5 grid-cols-1 gap-12 items-start py-8 px-6"
			>
				<div className="lg:col-span-2 lg:+sticky top-20 flex lg:flex-row flex-col items-center justify-center lg:border-r border-gray-200 lg:px-12 px-0">
					<img
						src="/Tentang/Founder.png"
						alt=""
						width={250}
						height={100}
						className="brightness-105 drop-shadow-xl"
					/>
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-bold font-header">
							Azahar Bin Abd Rahman
						</h1>
						<p className="text-gray-600 italic font-semibold">
							Pengerusi Eksekutif
						</p>
						<p className="text-gray-600 font-light font-primary text-justify text-xs">
							Kembara Muslim Travel & Tours Sdn Bhd diasaskan oleh Hj Azahar Bin
							Abd Rahman yang mengutamakan kemudahan dan keselesaan dalam
							beribadah. Kmtt menawarkan perkhidmatan Umrah, Muslim Tours,
							tempahan tiket penerbangan dan juga hotel. Pakej umrah VIP,
							Ekonomi dan umrah “Customise” juga ditawarkan kepada jemaah yang
							mempunyai keinginan atau keperluan khusus untuk para jemaah.
						</p>
					</div>
				</div>
				<div className="lg:col-span-3 flex flex-col gap-4 items-start justify-start">
					<h1 className="text-4xl font-bold font-header">Sejarah Syarikat</h1>
					<p className="flex flex-col gap-8 text-gray-600 font-primary text-justify text-sm">
						<span>
							Syarikat ini ditubuhkan dengan tujuan untuk menyahut seruan
							kerajaan dalam menggalakkan lebih ramai Bumiputera terlibat dalam
							industri pelancongan, selain menyumbang kepada pembangunan ekonomi
							negara, khususnya dalam sektor pelancongan.{" "}
						</span>
						<span>
							Walaupun syarikat ini terkenal dalam menyediakan perkhidmatan
							pelancongan ibadat, matlamat utama Kembara Muslim Travel & Tours
							adalah untuk membantu masyarakat menghayati dan mengamalkan ajaran
							Islam dengan cara yang sempurna, melalui ibadat haji dan umrah.
							Kami berusaha memberikan perkhidmatan berkualiti tinggi bagi
							memastikan setiap jemaah memperoleh haji yang makmur dan umrah
							yang makbul. Syarikat ini menawarkan pelbagai pakej haji dan umrah
							dengan harga yang kompetitif, lengkap dengan penginapan bertaraf
							empat hingga lima bintang serta kemudahan katering bagi memastikan
							keselesaan para jemaah.{" "}
						</span>
						<span>
							Selain itu, syarikat ini juga menyediakan pelbagai pakej
							pelancongan menarik di seluruh luar negara seperti Indonesia,
							Turkey, Switzerland dan sekitar Eropah. Pada tahun 2018, syarikat
							ini menetapkan misi baru untuk memperluaskan pengaruhnya dalam
							pelancongan antarabangsa, serta memperkenalkan jualan tiket
							sebagai sebahagian daripada perkhidmatan kami.
						</span>
					</p>
				</div>
			</div>

			{/* Staff KMTT */}
			<div
				data-aos="fade-up"
				className="max-w-screen-2xl mx-auto py-16 items-center"
			>
				<h1 className="col-span-5 text-4xl font-bold font-header text-center">
					Staff KMTT
				</h1>
				<div className="grid lg:grid-cols-5 grid-cols-1 gap-12 items-center my-12">
					{staffs.map((staff, index) => (
						<div
							key={index}
							data-aos="fade-up"
							className="col-span-1 flex flex-col items-center justify-center gap-4"
						>
							<img
								src={staff.image}
								alt={staff.name}
								className="brightness-105 drop-shadow-2xl rounded-full w-64 h-64 object-cover"
							/>
							<h1 className="text-2xl font-bold font-header">{staff.name}</h1>
							<p className="text-gray-600">{staff.position}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
