"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button, message, Table } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import axios from "axios";
import { RoomDetail } from "../../../../../../../lib/constants";

import Image from "next/image";
import Head from "next/head";

import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

const RoomDetails = (roomID) => {
	const room = RoomDetail.find((room) => room.RoomID == roomID);
	return room ? room.RoomDesc : "Unknown Room";
};

const CombinedInvoiceTable = ({ bookData }) => {
	const [selectedTrip, setSelectedTrip] = useState(null);
	const [hotelDetails, setHotelDetails] = useState([]);
	const [roomPrices, setRoomPrices] = useState([]);

	if (!bookData || bookData.length === 0) return null;

	const groupedByRoom = {};

	bookData.forEach((item) => {
		const details = item.AddOnCustDetails?.split(",") || [];
		const roomId = details[2]?.trim();

		if (!groupedByRoom[roomId]) {
			groupedByRoom[roomId] = [];
		}

		groupedByRoom[roomId].push({
			...item,
			AddOnCustomerName: details[0]?.trim() || item.CustomerName,
			AddOnICNumber: details[1]?.trim() || item.ICNumber,
			AddOnRoomID: roomId,
		});
	});

	useEffect(() => {
		const fetchPackageData = async () => {
			try {
				const response = await axios.get(
					`/api/Tetapan/ManagePackage?Operation=SEARCH&PakejID=${bookData[0].PakejID}`
				);

				const packageData = response.data;
				const foundTrip = packageData.find(
					(item) => item.TripID === bookData[0].TripID
				);

				if (foundTrip) {
					setSelectedTrip(foundTrip);
					console.log("foundTrip", foundTrip);
					setHotelDetails([
						{ city: "Madinah", hotelName: foundTrip.MadinahHotelName },
						{ city: "Makkah", hotelName: foundTrip.MakkahHotelName },
					]);

					const roomPriceKeys = Object.keys(foundTrip).filter((key) =>
						key.match(/_(Double|Triple|Quad)$/)
					);

					const prices = roomPriceKeys.map((key) => ({
						Price: parseFloat(foundTrip[key]),
						Category: key,
					}));

					setRoomPrices(prices);
				}
			} catch (error) {
				console.error("Failed to fetch package data:", error);
			}
		};

		fetchPackageData();
	}, [bookData]);

	return (
		<>
			<table className="w-full text-left border border-gray-300 mb-6 text-sm">
				<thead className="bg-gray-100">
					<tr>
						<th className="p-2 border">Description / Item</th>
						<th className="p-2 border text-right">Rate (RM)</th>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-gray-50">
						<td className="p-2 border">
							<strong>
								Pakej Umrah {bookData[0]?.PakejName} - {bookData[0]?.TripName}
							</strong>
							<br />
							Tarikh Berlepas:{" "}
							{dayjs(selectedTrip?.StartTravelDate).format(
								"DD MMM YYYY"
							)} - {dayjs(selectedTrip?.EndTravelDate).format("DD MMM YYYY")}
							<br />
							Hotel Madinah: {selectedTrip?.MadinahHotelName} @ Setaraf (~
							{selectedTrip?.MakkahDistance} meter) / Fullboard
							<br />
							Hotel Makkah: {selectedTrip?.MakkahHotelName} @ Setaraf (~
							{selectedTrip?.MadinahDistance} meter) / Fullboard
							<br />
						</td>
						<td className="p-2 border text-right">-</td>
					</tr>

					{Object.entries(groupedByRoom).map(
						([roomId, customers], groupIndex) => {
							const roomName = RoomDetails(roomId);

							const getAgeFromIC = (ic) => {
								if (!ic || ic.length < 6) return 0;
								const year = parseInt(ic.substring(0, 2), 10);
								const month = parseInt(ic.substring(2, 4), 10) - 1;
								const day = parseInt(ic.substring(4, 6), 10);
								const fullYear = year > 40 ? 1900 + year : 2000 + year;
								const birthDate = new Date(fullYear, month, day);
								const today = new Date();
								let age = today.getFullYear() - birthDate.getFullYear();
								const m = today.getMonth() - birthDate.getMonth();
								if (
									m < 0 ||
									(m === 0 && today.getDate() < birthDate.getDate())
								) {
									age--;
								}
								return age;
							};

							const RoomCategory = {
								1: "Double",
								2: "Triple",
								3: "Quad",
							};
							const total = customers.reduce((sum, cust) => {
								const age = getAgeFromIC(cust.AddOnICNumber);

								let category = "Adult";
								if (age >= 0 && age <= 2) category = "Infant";
								else if (age >= 3 && age <= 4) category = "ChildNoBed";
								else if (age >= 5 && age <= 12) category = "ChildWBed";

								const categoryKey = `${category}_${RoomCategory[roomId]}`;
								const matchedPrice = roomPrices.find(
									(rp) => rp.Category === categoryKey
								);

								const price = matchedPrice ? matchedPrice.Price : 0;
								cust.IndividualPrice = price;

								return sum + price;
							}, 0);

							return (
								<React.Fragment key={`group-${roomId}`}>
									<tr className="text-xs">
										<td className="pl-4 pr-2 py-2 border align-top" colSpan={2}>
											<strong className="block">{roomName}</strong>
										</td>
									</tr>
									{customers.map((cust, idx) => (
										<tr
											key={`cust-${cust.AddOnICNumber || idx}`}
											className="text-xs"
										>
											<td className="pl-6 pr-2 py-2 border">
												{cust.AddOnCustomerName} - {cust.AddOnICNumber}
											</td>
											<td className="p-2 border text-right">
												{cust.IndividualPrice?.toLocaleString(undefined, {
													style: "currency",
													currency: "MYR",
													minimumFractionDigits: 0,
												})}
											</td>
										</tr>
									))}
								</React.Fragment>
							);
						}
					)}
				</tbody>
			</table>
		</>
	);
};

const Invoice = () => {
	useEffect(() => {
		document.title = "Booking " + id + " Invoice";
	}, []);

	const ref = React.useRef();
	const searchParams = useSearchParams();
	const id = searchParams.get("BookID");
	const [loading, setLoading] = useState(false);
	const [bookData, setBookData] = useState(null);

	const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

	useEffect(() => {
		const fetchPackageDetails = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(
					`/api/Booking?Operation=SEARCH&BookID=${id}`
				);
				setBookData(data);
			} catch (error) {
				message.error("Failed to fetch package details");
			} finally {
				setLoading(false);
			}
		};

		fetchPackageDetails();
	}, [id]);

	const airlineLogos = {
		Emirates: "/flight/Emirates.svg",
		AirAsia: "/flight/AirAsia.svg",
	};

	// useEffect(() => {
	// 	const handleContextMenu = (e) => e.preventDefault();
	// 	document.addEventListener("contextmenu", handleContextMenu);
	// 	return () => document.removeEventListener("contextmenu", handleContextMenu);
	// }, []);

	// useEffect(() => {
	// 	const handleKeyDown = (e) => {
	// 		if (
	// 			e.key === "F12" ||
	// 			(e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) ||
	// 			(e.ctrlKey && e.key === "U")
	// 		) {
	// 			e.preventDefault();
	// 		}
	// 	};
	// 	document.addEventListener("keydown", handleKeyDown);
	// 	return () => document.removeEventListener("keydown", handleKeyDown);
	// }, []);

	const generateInvoiceNumber = () => {
		const prefix = "INV";

		const date = new Date();
		date.setHours(date.getHours() + 8);

		const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
		const randomNum = Math.floor(1000 + Math.random() * 9000);

		return `${prefix}${formattedDate}-${randomNum}`;
	};

	const handleDownloadPDF = async () => {
		setIsGeneratingPDF(true);

		const html2pdf = (await import("html2pdf.js")).default;

		setTimeout(() => {
			// Select all invoice elements starting with ID "invoice"
			const invoiceElements = document.querySelectorAll("[id^='invoice']");

			// Create a wrapper div to hold all invoice content
			const combinedContent = document.createElement("div");

			invoiceElements.forEach((el) => {
				const clone = el.cloneNode(true);
				combinedContent.appendChild(clone);
			});

			html2pdf()
				.set({
					margin: 0,
					filename: "invoice.pdf",
					image: { type: "jpeg", quality: 0.98 },
					html2canvas: { scale: 4 },
					jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
				})
				.from(combinedContent)
				.save()
				.then(() => {
					setIsGeneratingPDF(false);
				});
		}, 300);
	};

	return (
		<>
			<Head>
				<title>{document.title}</title>
				<meta name="description" content="example description" />
			</Head>
			<div className="bg-gray-50 min-h-screen p-8 flex flex-col justify-center items-center gap-4">
				<div className="flex items-center gap-4">
					{bookData && (
						<div
							id="invoice"
							ref={ref}
							className="relative bg-white px-4 pt-6 w-[21cm] h-[29.4cm] border border-gray-200 shadow-md mx-auto"
						>
							<img
								className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto object-contain opacity-10 px-8"
								src="/KMTT.png"
								alt="Watermark"
							/>
							<div className="absolute">
								<div className="flex justify-between items-center">
									<div className="grid grid-cols-4 gap-4 pb-2 px-8 gap-y-4">
										<img src="/KMTT.png" alt="Logo" className="w-full" />
										<div className="col-span-3 flex flex-col justify-center items-baseline">
											<h1 className="font-bold text-lg text-center uppercase tracking-widest whitespace-nowrap">
												Kembara Muslim Travel & Tours Sdn Bhd
											</h1>
											<div className="flex items-start justify-between w-full">
												<span className="text-sm text-left">
													<p>48, Jalan Bawal 2, Taman Bawal</p>
													<p>Simpang Tiga Kemboja, Air Hitam</p>
													<p>06150 Ayer Hitam</p>
													<p>Kedah, Malaysia</p>
													<p>Tel: 04-794 6926 | Fax: 04-794 7926</p>
												</span>
												<div className="flex flex-col gap-14 items-end">
													<span className="text-sm text-right font-semibold">
														(1064218-U/KPL7520)
													</span>
													<span className="text-xl text-right font-semibold">
														{generateInvoiceNumber()}
													</span>
												</div>
											</div>
										</div>
										<hr className="col-span-4 w-full h-[3px] bg-gradient-to-r from-orange-600 to-transparent" />
										<div className="col-span-3 flex flex-col justify-center items-baseline">
											<span className="text-sm text-left font-semibold">
												Bill To:
											</span>
											<span className="text-sm text-left font-weight600 text-gray-700">
												{bookData[0]?.CustName}
											</span>
											<span className="text-sm text-left font-weight600 text-gray-700">
												{bookData[0]?.CustEmail}
											</span>
											<span className="text-sm text-left font-weight600 text-gray-700">
												{bookData[0]?.CustPhone}
											</span>
											<span className="text-sm text-left font-weight600 text-gray-700 max-w-[10rem] break-words">
												{bookData[0]?.CustAddress}
											</span>
										</div>
										<div className="flex flex-col justify-start items-end">
											<div className="flex justify-center items-baseline gap-2">
												<span className="text-sm text-right font-semibold whitespace-nowrap">
													Date:
												</span>
												<span className="text-sm text-right font-weight600 text-gray-700 whitespace-nowrap">
													{dayjs().format("DD MMM YYYY")}
												</span>
											</div>
											<div className="flex justify-center items-baseline gap-2">
												<span className="text-sm text-right font-semibold whitespace-nowrap">
													Sales ID:
												</span>
												<span className="text-sm text-right font-weight600 text-gray-700 whitespace-nowrap">
													{bookData[0]?.SalesName
														? bookData[0]?.SalesName
														: "Online"}
												</span>
											</div>
											<div className="text-sm whitespace-nowrap text-gray-700">
												<strong>Booking Number:</strong> {bookData[0]?.BookID}
											</div>
											<div className="text-sm whitespace-nowrap text-gray-700">
												<strong>Booking Date:</strong>{" "}
												{dayjs(bookData[0]?.BookDate).format(
													"DD MMM YYYY hh:mm A"
												)}
											</div>
											<div className="text-xs whitespace-nowrap text-gray-700">
												<strong>Status:</strong>{" "}
												{bookData[0]?.Status === "PAID" ? "PAID" : "UNPAID"}
											</div>
										</div>
									</div>
								</div>
								<div className="px-8 pt-6">
									<div className="border-t pt-4">
										<CombinedInvoiceTable bookData={bookData} />
									</div>

									{bookData.length < 10 && (
										<div className="mt-12 border-t">
											<h2 className="text-lg font-semibold">Payment Summary</h2>
											<table className="w-full table-auto text-sm border mt-2">
												<thead className="bg-gray-100">
													<tr>
														<th className="text-left py-2 px-3 border-b">
															Description
														</th>
														<th className="text-right py-2 px-3 border-b">
															Amount (RM)
														</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="py-2 px-3 border-b">Total Amount</td>
														<td className="text-right py-2 px-3 border-b">
															{Number(bookData[0]?.TotalAmt || 0).toFixed(2)}
														</td>
													</tr>
													<tr>
														<td className="py-2 px-3 border-b">Deposits</td>
														<td className="text-right py-2 px-3 border-b">
															{Number(bookData[0]?.Deposits || 0).toFixed(2)}
														</td>
													</tr>
													<tr>
														<td className="py-2 px-3 border-b">Discount</td>
														<td className="text-right py-2 px-3 border-b">
															{Number(bookData[0]?.Discount || 0).toFixed(2)}
														</td>
													</tr>
													<tr className="font-semibold bg-gray-50 border-t">
														<td className="py-2 px-3">Amount Due</td>
														<td className="text-right py-2 px-3">
															{(
																(bookData[0]?.TotalAmt || 0) -
																(bookData[0]?.Deposits || 0) -
																(bookData[0]?.Discount || 0)
															).toFixed(2)}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									)}
								</div>
							</div>

							{/* Footer */}
							<div className="absolute bottom-0 left-0 right-0">
								<div className="col-span-4 flex items-center justify-center gap-2 px-4 w-full h-6 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-500 mb-1">
									<hr className="w-full h-0.5 my-4 bg-gray-200 border-" />
									<span
										className={`whitespace-nowrap text-sm text-center text-white font-medium ${
											isGeneratingPDF ? "-mt-3" : ""
										}`}
									>
										Bersama Anda Menyempurnakan Umrah
									</span>
									<hr className="w-full h-0.5 my-4 bg-gray-200" />
								</div>
								<div className="max-w-screen-xl mx-auto flex flex-row items-center justify-between px-1 py-2 divide-x-2 divide-gray-100 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-400 text-white">
									{/* Social Media Section */}
									<div className="flex items-center space-x-1 text-xs">
										<a
											href="https://www.instagram.com/elixsolution"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center space-x-1 hover:text-gray-200"
										>
											<FaInstagram size={15} />
											<span
												className={`text-xs ${isGeneratingPDF ? "-mt-3" : ""}`}
											>
												kembaramuslim.travel
											</span>
										</a>
										<a
											href="https://www.tiktok.com/@elixsolution"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center space-x-1 hover:text-gray-200"
										>
											<FaTiktok size={15} />
											<span
												className={`text-xs ${isGeneratingPDF ? "-mt-3" : ""}`}
											>
												kembaramuslim.travel
											</span>
										</a>
										<a
											href="https://wa.me/60124296462"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center space-x-1 hover:text-gray-200"
										>
											<FaWhatsapp size={15} />
											<span
												className={`text-xs whitespace-nowrap ${
													isGeneratingPDF ? "-mt-3" : ""
												}`}
											>
												+6012-4296462
											</span>
										</a>
									</div>

									{/* Company Address */}
									<div className="text-right pl-1 text-xs">
										<p
											className={`text-xs whitespace-nowrap ${
												isGeneratingPDF ? "-mt-3" : ""
											}`}
										>
											&copy; {new Date().getFullYear()} Kembara Muslim Travel &
											Tours. All rights reserved.
										</p>
									</div>
								</div>
							</div>
						</div>
					)}
					{bookData && (
						<div
							id="invoice1"
							ref={ref}
							className="relative bg-white px-4 pt-6 w-[21cm] h-[29.4cm] border border-gray-200 shadow-md mx-auto"
						>
							<img
								className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto object-contain opacity-10 px-8"
								src="/KMTT.png"
								alt="Watermark"
							/>
							<div className="absolute w-full">
								<div className="pl-8 pr-12 pt-6">
									{bookData.length >= 10 && (
										<div className="mt-4 border-t">
											<h2 className="text-lg font-semibold">Payment Summary</h2>
											<table className="w-full table-auto text-sm border mt-2">
												<thead className="bg-gray-100">
													<tr>
														<th className="text-left py-2 px-3 border-b">
															Description
														</th>
														<th className="text-right py-2 px-3 border-b">
															Amount (RM)
														</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="py-2 px-3 border-b">Total Amount</td>
														<td className="text-right py-2 px-3 border-b">
															{Number(bookData[0]?.TotalAmt || 0).toFixed(2)}
														</td>
													</tr>
													<tr>
														<td className="py-2 px-3 border-b">Deposits</td>
														<td className="text-right py-2 px-3 border-b">
															{Number(bookData[0]?.Deposits || 0).toFixed(2)}
														</td>
													</tr>
													<tr>
														<td className="py-2 px-3 border-b">Discount</td>
														<td className="text-right py-2 px-3 border-b">
															{Number(bookData[0]?.Discount || 0).toFixed(2)}
														</td>
													</tr>
													<tr className="font-semibold bg-gray-50 border-t">
														<td className="py-2 px-3">Amount Due</td>
														<td className="text-right py-2 px-3">
															{(
																(bookData[0]?.TotalAmt || 0) -
																(bookData[0]?.Deposits || 0) -
																(bookData[0]?.Discount || 0)
															).toFixed(2)}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									)}

									<div className="mt-6 border-t">
										<span className="text-lg font-semibold">
											Harga Pakej Asal Termasuk :-
										</span>
										<ul className="list-disc list-inside pl-6">
											<li className="text-xs">
												Penerbangan premium Emirates kelas Ekonomi pergi balik +
												30 kg bagasi pergi balik
											</li>
											<li className="text-xs">
												Penginapan di Mekah, Madinah dan Taif
											</li>
											<li className="text-xs">Umrah 3 kali dibimbing penuh</li>
											<li className="text-xs">Visa Ziarah</li>
											<li className="text-xs">Insuran Takaful Perjalanan</li>
											<li className="text-xs">Pengangkutan ke:ka ziarah</li>
											<li className="text-xs">
												Akviti ziarah ke:ka di Mekah dan Madinah
											</li>
											<li className="text-xs">
												Ustaz berpengalaman untuk membimbing ibadah umrah
											</li>
											<li className="text-xs">
												1 Mutawif yang akan ikut serta dari Malaysia sepanjang
												Program.
											</li>
											<li className="text-xs">Air Zam2 5liter</li>
											<li className="text-xs">PERCUMA makan penuh di taif</li>
											<li className="text-xs">
												PERCUMA buku nota umrah dan buku doa
											</li>
											<li className="text-xs">
												PERCUMA kursus online dan offline
											</li>
										</ul>

										<div className="mt-6 text-lg font-semibold">
											Terma & Syarat Bayaran :-
										</div>
										<ul className="list-disc list-inside pl-6">
											<li className="text-xs">
												Bayaran Deposit RM 500/org, bayaran kedua RM 1000 (60
												hari sebelum berlepas) dan baki bayaran penuh 45 hari
												sebelum berlepas
											</li>
											<li className="text-xs">
												Mempunyai Passport yang masih sah laku 6 bln sebelum
												terbang
											</li>
											<li className="text-xs">
												Gambar berukuran passport 2 kpg
											</li>
											<li className="text-xs">Suntikan meningococcal</li>
										</ul>

										<ol className="list-decimal list-inside pl-6 mt-6">
											<li className="text-xs">
												Total payment must be settled 60 days before Departure
											</li>
											<li className="text-xs">
												All payment by cheque or T/T only valid upon clearance
											</li>
											<li className="text-xs">
												Please email or fax us the bank-in slip or T/T slip if
												payment made by online via internet banking.
											</li>
											<li className="text-xs">
												Payment payable to details below:
											</li>
											<li className="text-xs">
												PLEASE REQUEST FOR AN OFFICAL RECEIPT FOR EVERY PAYMENT
												MADE.
											</li>
										</ol>

										<div className="text-center mt-6 text-lg font-semibold mx-auto max-w-lg">
											<p>KEMBARA MUSLIM TRAVEL & TOURS SDN BHD</p>
											<p>MAYBANK A/C : 552068510619</p>
										</div>

										<div className="flex flex-col justify-start items-c">
											<Image
												src="/Invoice/Signature.png"
												alt="Signature"
												width={100}
												height={50}
												className={`mt-6 ${isGeneratingPDF ? "-mt-3" : ""}`}
											/>
											<span className="text-xs">Adawiyah Azahar</span>
											<span className="text-xs">
												(Ticketing and Sales Manager)
											</span>
											<span className="text-xs font-semibold">
												Kembara Muslim Travel & Tours Sdn Bhd
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Footer */}
							<div className="absolute bottom-0 left-0 right-0">
								<div className="col-span-4 flex items-center justify-center gap-2 px-4 w-full h-6 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-500 mb-1">
									<hr className="w-full h-0.5 my-4 bg-gray-200 border-" />
									<span
										className={`whitespace-nowrap text-sm text-center text-white font-medium ${
											isGeneratingPDF ? "-mt-3" : ""
										}`}
									>
										Bersama Anda Menyempurnakan Umrah
									</span>
									<hr className="w-full h-0.5 my-4 bg-gray-200" />
								</div>
								<div className="max-w-screen-xl mx-auto flex flex-row items-center justify-between px-1 py-2 divide-x-2 divide-gray-100 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-400 text-white">
									{/* Social Media Section */}
									<div className="flex items-center space-x-1 text-xs">
										<a
											href="https://www.instagram.com/elixsolution"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center space-x-1 hover:text-gray-200"
										>
											<FaInstagram size={15} />
											<span
												className={`text-xs ${isGeneratingPDF ? "-mt-3" : ""}`}
											>
												kembaramuslim.travel
											</span>
										</a>
										<a
											href="https://www.tiktok.com/@elixsolution"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center space-x-1 hover:text-gray-200"
										>
											<FaTiktok size={15} />
											<span
												className={`text-xs ${isGeneratingPDF ? "-mt-3" : ""}`}
											>
												kembaramuslim.travel
											</span>
										</a>
										<a
											href="https://wa.me/60124296462"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center space-x-1 hover:text-gray-200"
										>
											<FaWhatsapp size={15} />
											<span
												className={`text-xs whitespace-nowrap ${
													isGeneratingPDF ? "-mt-3" : ""
												}`}
											>
												+6012-4296462
											</span>
										</a>
									</div>

									{/* Company Address */}
									<div className="text-right pl-1 text-xs">
										<p
											className={`text-xs whitespace-nowrap ${
												isGeneratingPDF ? "-mt-3" : ""
											}`}
										>
											&copy; {new Date().getFullYear()} Kembara Muslim Travel &
											Tours. All rights reserved.
										</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<Button type="primary" onClick={() => handleDownloadPDF()}>
					Download
				</Button>
				<div className="mt-6 text-center text-sm text-gray-500 print:hidden">
					Thank you for your booking.
				</div>
			</div>
		</>
	);
};

export default Invoice;
