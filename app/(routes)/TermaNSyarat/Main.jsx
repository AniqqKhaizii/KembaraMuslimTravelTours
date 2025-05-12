"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
	const containerRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.utils.toArray(".section").forEach((section, i) => {
				gsap.fromTo(
					section,
					{ opacity: 0, y: 100, x: i % 2 === 0 ? -100 : 100 },
					{
						opacity: 1,
						y: 0,
						x: 0,
						duration: 1.2,
						ease: "power3.out",
						scrollTrigger: {
							trigger: section,
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
					}
				);
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={containerRef} className="bg-white py-24 px-4">
			<div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
				<div className="section space-y-6 border border-gray-200 rounded-xl shadow-xl">
					<h2 className="text-2xl font-semibold text-kmtt-text p-8 rounded-t-xl bg-kmtt-primary">
						DOKUMEN YANG PERLU DI SERAHKAN
					</h2>
					<ol className="list-decimal space-y-2 text-gray-700 py-4 px-12">
						<li>Pasport Antarabangsa yang sah lebih dari 6 bulan</li>
						<li>4 keping Gambar Visa Umrah berlatar putih</li>
						<li>Salinan kad pengenalan</li>
						<li>
							Dokumen tambahan mengikut status:
							<ul className="list-disc pl-5">
								<li>
									<strong>Lelaki &lt;18:</strong> Surat beranak & kebenaran bapa
								</li>
								<li>
									<strong>Lelaki ≤40:</strong> Tidak perlu mahram
								</li>
								<li>
									<strong>Wanita &lt;45:</strong> Wajib bersama mahram
								</li>
								<li>
									<strong>Wanita ≥45:</strong> Boleh tanpa mahram
								</li>
								<li>
									<strong>Muallaf:</strong> Kad pengenalan & pengesahan JPN
								</li>
								<li>
									<strong>Anak Angkat:</strong> Dokumen mahkamah & JPN
								</li>
							</ul>
						</li>
					</ol>
				</div>

				<div className="section space-y-6 border border-gray-200 rounded-xl shadow-xl">
					<h2 className="text-2xl font-semibold text-kmtt-text p-8 rounded-t-xl bg-kmtt-primary">
						MAKLUMAT PAKEJ
					</h2>
					<div className="grid lg:grid-cols-2 grid-cols-1  px-4 pb-4">
						<div>
							<p className="text-gray-700 px-8">Termasuk:</p>
							<ol className="list-decimal py-4 px-12 space-y-2 text-gray-700">
								<li>Tiket penerbangan pergi balik</li>
								<li>Visa Umrah</li>
								<li>Kursus Umrah</li>
								<li>Penginapan & ziarah</li>
								<li>Ziarah Dalam (Raudhah, Haji, Melontar)</li>
								<li>Makan 3x sehari</li>
								<li>Mutawwif berpengalaman</li>
								<li>Air Zam-Zam 5L</li>
								<li>Tag, Buku Nota, Buku Doa, Bag</li>
								<li>Tipping</li>
							</ol>
						</div>
						<div>
							<p className="text-gray-700 px-8">Tidak Termasuk:</p>
							<ol className="list-decimal py-4 px-12 space-y-2 text-gray-700">
								<li>Insurans</li>
								<li>Perbelanjaan peribadi</li>
								<li>Lebihan bagasi</li>
								<li>Ubah urusan semasa Umrah</li>
							</ol>
						</div>
					</div>
				</div>

				<div className="section space-y-6 border border-gray-200 rounded-xl shadow-xl">
					<h2 className="text-2xl font-semibold text-kmtt-text p-8 rounded-t-xl bg-kmtt-primary">
						SYARAT-SYARAT BAYARAN
					</h2>
					<p className="text-gray-700 px-8">Deposit: RM1,000 seorang</p>
					<p className="text-gray-700 px-8">Bank in ke:</p>
					<div className="flex flex-col justify-center items-center p-4 rounded-xl text-center">
						<strong>KEMBARA MUSLIM TRAVEL & TOURS SDN BHD</strong>
						<strong>AMBANK:</strong> 099-202-21014095
						<strong>MAYBANK:</strong> 552065106169
					</div>
				</div>

				<div className="section space-y-6 border border-gray-200 rounded-xl shadow-xl">
					<h2 className="text-2xl font-semibold text-kmtt-text p-8 rounded-t-xl bg-kmtt-primary">
						PEMBATALAN PAKEJ
					</h2>
					<ol className="list-decimal px-12 space-y-2 text-gray-700">
						<li>Deposit tidak dikembalikan selepas tempahan</li>
						<li>Bayaran penuh tidak dipulangkan (boleh cari pengganti)</li>
						<li>Pembatalan kerana kematian perlu dokumen rasmi</li>
						<li>Pemulangan bayaran dalam 30 hari bekerja</li>
					</ol>
				</div>
			</div>
		</div>
	);
};

export default Main;
