import React from "react";
import Image from "next/image";
const AboutUs = () => {
	return (
		<div className="bg-gray-100 text-gray-800">
			{/* Header Section */}
			<header className="bg-[url('/Hero/KembaraDuaTanahSuci.jpg')] bg-center bg-cover relative text-white h-[45vh]">
				<div className="w-full h-[45vh] text-center backdrop-blur-md py-40 bg-black/50">
					<h1 className="text-4xl font-bold mb-4">Tentang Kami</h1>
					<p className="text-lg">
						Kenali lebih dekat Kembara Muslim Travel & Tours
					</p>
				</div>
			</header>

			{/* Image Row Between Sections */}
			<div className="relative z-10 flex justify-center -mt-16 w-full">
				<div className="mx-auto max-w-screen-xl px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
					<Image
						src="/Galeri/Galeri1.jpg"
						alt=""
						width={400}
						height={100}
						className="rounded-lg shadow-lg"
					/>
					<Image
						src="/Galeri/Galeri2.jpg"
						alt=""
						width={500}
						height={400}
						className="rounded-lg shadow-lg"
					/>
					<Image
						src="/Galeri/Galeri3.jpg"
						alt=""
						width={300}
						height={300}
						className="rounded-lg shadow-lg"
					/>
					<Image
						src="/Galeri/Galeri4.jpg"
						alt=""
						width={300}
						height={200}
						className="rounded-lg shadow-lg"
					/>
				</div>
			</div>

			{/* Sejarah Syarikat */}
			<section className="container flex flex-row items-center mx-auto px-6 py-16">
				<div>
					<h2 className="text-3xl font-bold text-orange-600 mb-6">
						Sejarah Syarikat
					</h2>
					<div className="lg:w-1/2">
						<p className="text-lg leading-relaxed">
							Kembara Muslim Travel & Tours bermula dengan impian untuk
							menyediakan pakej pelancongan yang sesuai dengan gaya hidup
							Muslim. Dengan pengalaman lebih dari 10 tahun, syarikat ini telah
							membawa ribuan pelanggan menikmati perjalanan yang diberkati dan
							penuh makna.
						</p>
					</div>
				</div>

				<img
					src="https://via.placeholder.com/600x400"
					alt="Sejarah Syarikat"
					className="rounded-lg shadow-lg"
				/>
			</section>

			{/* Licenses */}
			<section className="py-16">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-orange-600 mb-6">
						Lesen-Lesen
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white shadow-lg rounded-lg p-6 text-center">
							<img
								src="https://via.placeholder.com/150"
								alt="License Icon"
								className="w-16 h-16 mx-auto mb-4"
							/>
							<p className="font-semibold">Lesen KPK/LN: 1234</p>
							<p className="text-sm text-gray-600">
								Berdaftar dengan Kementerian Pelancongan
							</p>
						</div>
						<div className="bg-white shadow-lg rounded-lg p-6 text-center">
							<img
								src="https://via.placeholder.com/150"
								alt="License Icon"
								className="w-16 h-16 mx-auto mb-4"
							/>
							<p className="font-semibold">Diiktiraf Tabung Haji</p>
							<p className="text-sm text-gray-600">
								Pengelola Jemaah Haji yang diiktiraf
							</p>
						</div>
						<div className="bg-white shadow-lg rounded-lg p-6 text-center">
							<img
								src="https://via.placeholder.com/150"
								alt="License Icon"
								className="w-16 h-16 mx-auto mb-4"
							/>
							<p className="font-semibold">Penerbangan & Pelancongan</p>
							<p className="text-sm text-gray-600">
								Berdaftar dengan pengendalian tiket
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Team */}
			<section className="py-16">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-orange-600 mb-6">
						Pasukan Kami
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								name: "Dato’ Ahmad Faiz",
								role: "Pengarah Urusan",
								img: "https://via.placeholder.com/200",
							},
							{
								name: "Cik Siti Aishah",
								role: "Ketua Operasi",
								img: "https://via.placeholder.com/200",
							},
							{
								name: "Encik Ali Bin Harun",
								role: "Pengurus Pemasaran",
								img: "https://via.placeholder.com/200",
							},
							{
								name: "Puan Laila Binti Mansor",
								role: "Ketua Mutawwif",
								img: "https://via.placeholder.com/200",
							},
						].map((teamMember, index) => (
							<div
								key={index}
								className="bg-white shadow-lg rounded-lg p-6 text-center"
							>
								<img
									src={teamMember.img}
									alt={teamMember.name}
									className="w-24 h-24 mx-auto rounded-full mb-4"
								/>
								<h3 className="font-semibold text-lg">{teamMember.name}</h3>
								<p className="text-sm text-gray-600">{teamMember.role}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutUs;
