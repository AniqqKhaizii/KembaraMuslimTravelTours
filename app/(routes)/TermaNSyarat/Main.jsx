import React from "react";

const Main = () => {
	return (
		<div className="max-w-screen-lg mx-auto min-h-screen py-24 px-4 text-sm space-y-6">
			<h2 className="text-xl font-medium px-4 py-2 bg-orange-500 text-white rounded-full">
				DOKUMEN YANG PERLU DI SERAHKAN:
			</h2>
			<div className="px-8">
				<ol className="list-decimal pl-6 space-y-1 font-primary">
					<li>
						Pasport Antarabangsa yang masih belum &amp; boleh di guna dari
						tarikh berangkat sehingga 6 bulan/sekatan kosong
					</li>
					<li>
						4 keping Gambar Visa Umrah (berlatarbelakang putih - saiz 4cm x 6cm
						dan tidak memakai spek mata)
					</li>
					<li>Salinan kad pengenalan</li>
					<li>
						Dokumen tambahan mengikut status/ciri-ciri jemaah seperti berikut:
						<ul className="list-disc pl-4">
							<li>
								<strong>Untuk Lelaki yang berumur 18 tahun ke bawah:</strong> -
								SALINAN SURAT BERANAK - Jika tidak ditemani oleh bapa kandung,
								WAJIB ada surat kebenaran dari bapa kandung berserta surat nikah
								ibu &amp; sijil masuk Islam
							</li>
							<li>
								<strong>Untuk Lelaki berumur 40 tahun ke bawah:</strong> - Tidak
								memerlukan mahram
							</li>
							<li>
								<strong>Untuk Wanita berumur bawah 45 tahun:</strong> - WAJIB
								BERSAMA MAHRAM - Salinan surat nikah diakui sah oleh Jabatan
								Agama Islam
							</li>
							<li>
								<strong>Untuk Wanita berumur 45 tahun ke atas:</strong> - Boleh
								berangkat tanpa mahram
							</li>
							<li>
								<strong>Untuk Muallaf:</strong> - Salinan kad pengenalan,
								salinan kad pengislaman, &amp; pengesahan keislaman oleh JPN
							</li>
							<li>
								<strong>Untuk Anak Angkat:</strong> - Surat akuan sumpah
								penjagaan sah dari Mahkamah &amp; surat pengangkatan JPN
							</li>
						</ul>
					</li>
				</ol>
			</div>

			<h2 className="text-xl font-medium px-4 py-2 bg-orange-500 text-white rounded-full">
				MAKLUMAT PAKEJ
			</h2>
			<div className="px-8 flex flex-col gap-4 font-primary">
				<p>Pakej Umrah yang di tawarkan adalah termasuk:</p>
				<ol className="list-decimal pl-6 space-y-1">
					<li>
						Tiket penerbangan pergi balik dari Kuala Lumpur ke Madinah atau
						Jeddah mengikut jadual penerbangan yang di pilih
					</li>
					<li>Visa Umrah</li>
					<li>Kursus Umrah Percuma</li>
					<li>
						Penginapan pergi balik ke hotel dari Airport dan Ziarah 1x Madinah,
						2x Mekah
					</li>
					<li>Ziarah Dalam - Raudhah dan Haji &amp; Melontar</li>
					<li>Makan 3x sehari</li>
					<li>Mutawwif berpengalaman</li>
					<li>Air Zam-Zam 5 liter</li>
					<li>
						Tag Diri, 1 tag Gelang, 1 stangbag, 1 non-woven bag, 1 Buku Nota
						Kursus Umrah, 1 Buku Doa &amp; Panduan Umrah
					</li>
					<li>Tipping dan Tag Bag</li>
				</ol>
				<p>
					<strong>Pakej Umrah tidak termasuk (tidak termasuk):</strong>
				</p>
				<ol className="list-decimal pl-6 space-y-1">
					<li>Insurans</li>
					<li>Perbelanjaan Peribadi</li>
					<li>Tambahan Personal down kos lebihan bagasi</li>
					<li>Kos Tambahan ubah urusan semasa umrah</li>
				</ol>
			</div>

			<h2 className="text-xl font-medium px-4 py-2 bg-orange-500 text-white rounded-full">
				SYARAT-SYARAT BAYARAN
			</h2>
			<div className="px-8 flex flex-col gap-4 font-primary">
				<h3 className="font-medium">1) BAYARAN DEPOSIT</h3>
				<p>Jumlah Bayaran Deposit adalah RM 1,000.00 seorang</p>
				<p>
					Bayaran Deposit boleh di buat dengan Bank in ke dalam Bank seperti di
					bawah:
				</p>
				<p>
					<strong>Nama Akaun:</strong> KEMBARA MUSLIM TRAVEL &amp; TOURS SDN BHD
				</p>
				<p>
					<strong>AMBANK:</strong> 099-202-21014095
				</p>
				<p>
					<strong>MAYBANK:</strong> 552065106169
				</p>

				<h3 className="font-medium">2) BAYARAN PENUH</h3>
				<p>
					Bukti Bayaran hendaklah di serahkan kepada pihak KMTT melalui email :
					m196296@gmail.com / whatsapp talian pejabat: 03-79674236 atau ke
					pejabat.
					<br />
					<b>**MUSTAHAK:</b> Bayaran hendaklah di selesaikan sekurang-kurangnya
					45 hari sebelum tarikh pelepasan. KMTT tidak akan bertanggungjawab
					sekiranya bayaran tidak dibuat dalam tempoh yang ditetapkan atau
					kelewatan oleh pihak Kembara Muslim Travel &amp; Tours (KMTT)
				</p>

				<h3 className="font-medium">3) BAYARAN TAMBAHAN LEWAT DAFTAR</h3>
				<table className="table-auto border mt-2">
					<thead>
						<tr>
							<th className="border px-2 py-1">Hari</th>
							<th className="border px-2 py-1">Cuti Sekolah</th>
							<th className="border px-2 py-1">Normal</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border px-2 py-1">&lt; 50</td>
							<td className="border px-2 py-1">RM250/pax</td>
							<td className="border px-2 py-1">RM150/pax</td>
						</tr>
						<tr>
							<td className="border px-2 py-1">&lt; 45</td>
							<td className="border px-2 py-1">RM350/pax</td>
							<td className="border px-2 py-1">RM250/pax</td>
						</tr>
						<tr>
							<td className="border px-2 py-1">&lt; 40</td>
							<td className="border px-2 py-1">RM400/pax</td>
							<td className="border px-2 py-1">RM300/pax</td>
						</tr>
						<tr>
							<td className="border px-2 py-1">&lt; 30</td>
							<td className="border px-2 py-1">RM500/pax</td>
							<td className="border px-2 py-1">RM350/pax</td>
						</tr>
						<tr>
							<td className="border px-2 py-1">&lt; 20</td>
							<td className="border px-2 py-1">RM600/pax</td>
							<td className="border px-2 py-1">RM450/pax</td>
						</tr>
					</tbody>
				</table>
			</div>
			<h2 className="text-xl font-medium px-4 py-2 bg-orange-500 text-white rounded-full">
				PEMBATALAN PAKEJ
			</h2>
			<div className="px-8 flex flex-col gap-4 font-primary">
				<ol className="list-decimal pl-6 space-y-1">
					<li>
						Jemaah boleh membatalkan Pakej setelah di buat tempahan. Caj
						pembatalan adalah seperti berikut:
						<ul className="list-disc pl-4">
							<li>
								Jika pembatalan di buat selepas pembayaran deposit: Deposit
								TIDAK DIKEMBALIKAN
							</li>
							<li>
								Jika pembatalan dibuat selepas bayaran penuh: TIADA PEMULANGAN
								WANG, TETAPI boleh cari pengganti yang sesuai dan layak sahaja
							</li>
							<li>
								Jika pembatalan disebabkan kematian pasangan/ibu bapa/anak:
								WAJIB bawa sijil asal, laporan doktor &amp; surat dari bapa
							</li>
						</ul>
					</li>
					<li>
						Pemulangan bayaran oleh pihak KMTT adalah selama tempoh 30 hari
						bekerja.
					</li>
				</ol>
			</div>
		</div>
	);
};

export default Main;
