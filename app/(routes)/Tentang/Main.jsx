"use client";
import React from "react";
import Image from "next/image";
import * as motion from "framer-motion/client";
import CountUp from "react-countup";

const staffs = [
	{
		name: "Norlina Juhari",
		image: "/Tentang/CoFounder1.png",
	},
	{
		name: "Rabiatul Adawiyah",
		image: "/Tentang/StaffBorder1.png",
	},
	{
		name: "Hafiq Harun",
		image: "/Tentang/StaffBorder2.png",
	},
	{
		name: "Afzal Azahar",
		image: "/Tentang/StaffBorder3.png",
	},
	{
		name: "Syikin",
		image: "/Tentang/StaffBorder4.png",
	},
];
const AboutUs = () => {
	return (
		<div className="bg-kmtt-text">
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
				<div className="absolute inset-0 h-full bg-gradient-to-t from-kmtt-text via-black/60 to-black/90 from-0% via-40% to-100%"></div>
				{/* <div className="absolute inset-0 h-full bg-black/70"></div> */}

				<div
					data-aos="fade-right"
					className="relative z-1 max-w-screen-lg mx-auto flex flex-col lg:items-start items-center justify-center w-full h-full"
				>
					<h1 className="flex flex-col lg:text-left text-center lg:text-6xl text-4xl font-bold  text-white">
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
				<div
					data-aos="fade-right"
					className="mt-10 lg:mt-0 text-center lg:text-left"
				>
					<span className="bg-orange-500 text-white px-4 py-2 text-md rounded-full shadow">
						Rakan Umrah Terbaik Anda
					</span>
					<h1 className="text-4xl font-bold mt-4">
						Kembara Muslim{" "}
						<span className="text-orange-600">Travel & Tours</span>
					</h1>
					<p className="mt-4 text-gray-600 flex items-center justify-center lg:justify-start font-primary">
						Google Rating:{" "}
						<span className="text-yellow-500 ml-2">★★★★★ 4.9</span>
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
							Kembara MuslimTravel & Tours Sdn Bhd ialah sebuah agensi
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
				</div>
				<div data-aos="fade-left" className="order-1 lg:order-2 mx-6">
					<img
						src="/Tentang/Office.jpg"
						alt=""
						width={600}
						height={500}
						className="brightness-105 aspect-square rounded-md shadow-custom-orange"
					/>
				</div>
			</section>

			{/* Sejarah Syarikat */}
			<div className="bg-[url('/Tentang/Background.png')] bg-cover bg-fixed px-16 grid lg:grid-cols-5 grid-cols-1 gap-12 items-start py-24">
				<div
					data-aos="fade-up"
					className="max-w-screen-2xl mx-auto lg:col-span-2 lg:sticky top-20 flex lg:flex-row flex-col items-center justify-center lg:border-r border-gray-200 lg:px-12 px-0"
				>
					<img
						src="/Tentang/Founder1.png"
						alt=""
						width={350}
						height={150}
						className="brightness-105 drop-shadow-2xl"
					/>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col">
							<h1 className="text-2xl font-bold text-white">
								Azahar Bin Abd Rahman
							</h1>
							<p className="text-orange-500  font-semibold">Pengerusi Urusan</p>
						</div>
						<p className="text-gray-100 font-primary text-justify text-sm">
							Kembara Muslim Travel & Tours Sdn Bhd diasaskan oleh Hj Azahar Bin
							Abd Rahman yang mengutamakan kemudahan dan keselesaan dalam
							beribadah. Kmtt menawarkan perkhidmatan Umrah, Muslim Tours,
							tempahan tiket penerbangan dan juga hotel. Pakej umrah VIP,
							Ekonomi dan umrah “Customise” juga ditawarkan kepada jemaah yang
							mempunyai keinginan atau keperluan khusus untuk para jemaah.
						</p>
					</div>
				</div>
				<div
					data-aos="fade-up"
					className="lg:col-span-3 flex flex-col gap-10 items-start justify-start py-6"
				>
					<h1 className="text-4xl font-bold text-white">Sejarah Syarikat</h1>
					<p className="flex flex-col gap-8 text-gray-100 font-primary text-justify text-sm">
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
			<div className="bg-[url('/Tentang/Background.png')] bg-cover bg-fixed px-32 py-16 items-center">
				<h1 className="col-span-5 text-4xl font-bold text-white text-center">
					Staff KMTT
				</h1>
				<div className="grid lg:grid-cols-5 grid-cols-1 gap-12 items-center my-12">
					{staffs.map((staff, index) => (
						<div
							key={index}
							data-aos="fade-up"
							className="col-span-1 flex flex-col items-center justify-center gap-2"
						>
							<img
								src={staff.image}
								alt={staff.name}
								className="brightness-105 drop-shadow-2xl rounded-full w-100 h-100 object-cover"
							/>
							<h1 className="text-2xl font-bold text-white">{staff.name}</h1>
							<p className="text-gray-200">{staff.position}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
