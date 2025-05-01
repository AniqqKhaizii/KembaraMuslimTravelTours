"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button, message, Table } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import axios from "axios";
import { RoomDetail } from "../../../../../../../lib/constants";
import html2pdf from "html2pdf.js";
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
							Pakej Umrah {bookData[0]?.PakejName} - {bookData[0]?.TripName} (
							{dayjs(bookData[0]?.TravelDate).format("DD MMM YYYY")})
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

								return sum + (matchedPrice ? matchedPrice.Price : 0);
							}, 0);

							return (
								<tr key={groupIndex}>
									<td className="p-2 border align-top">
										<strong className="block mb-1">{roomName}</strong>
										<ul className="list-disc list-inside">
											{customers.map((cust, idx) => (
												<li key={idx}>
													{cust.AddOnCustomerName} - {cust.AddOnICNumber}
												</li>
											))}
										</ul>
									</td>
									<td className="p-2 border text-right align-top">
										{total.toLocaleString(undefined, {
											style: "currency",
											currency: "MYR",
											minimumFractionDigits: 0,
										})}
									</td>
								</tr>
							);
						}
					)}
				</tbody>
			</table>
		</>
	);
};

const Invoice = () => {
	const ref = React.useRef();
	const searchParams = useSearchParams();
	const id = searchParams.get("BookID");
	const [loading, setLoading] = useState(false);
	const [bookData, setBookData] = useState(null);

	const [userData, setUserData] = useState(null);
	const [adminData, setAdminData] = useState(null);

	const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedUserData =
				sessionStorage.getItem("UserData") || localStorage.getItem("UserData");
			if (storedUserData) {
				setUserData(JSON.parse(storedUserData));
			}
		}
	}, []);

	useEffect(() => {
		if (userData) {
			const fetchUserInfo = async () => {
				const params = {
					Username: userData.AdmUname,
					UserLevel: userData.AdmLevel,
					UserRole: userData.AdmRole,
				};
				try {
					const response = await axios.get(`/api/Admin/AdminCarian`, {
						params: params,
					});
					if (response.data.message) {
						alert(response.data.message);
					} else {
						const queryData = response.data;
						setAdminData(queryData);
					}
				} catch (error) {
					console.error("Error fetching user info", error);
				}
			};
			fetchUserInfo();
		}
	}, [userData]);

	useEffect(() => {
		const fetchPackageDetails = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(
					`/api/Booking?Operation=SEARCH&BookID=${id}`
				);
				console.log("data", data);
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

	useEffect(() => {
		const handleContextMenu = (e) => e.preventDefault();
		document.addEventListener("contextmenu", handleContextMenu);
		return () => document.removeEventListener("contextmenu", handleContextMenu);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (
				e.key === "F12" ||
				(e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) ||
				(e.ctrlKey && e.key === "U")
			) {
				e.preventDefault();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	const generateInvoiceNumber = () => {
		const prefix = "INV";

		// Create date and add 8 hours
		const date = new Date();
		date.setHours(date.getHours() + 8);

		const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
		const randomNum = Math.floor(1000 + Math.random() * 9000);

		return `${prefix}${formattedDate}-${randomNum}`;
	};

	const handleDownloadPDF = () => {
		setIsGeneratingPDF(true);

		setTimeout(() => {
			const element = document.getElementById("invoice");
			html2pdf()
				.set({
					margin: 0,
					filename: "invoice.pdf",
					image: { type: "jpeg", quality: 0.98 },
					html2canvas: { scale: 4 },
					jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
				})
				.from(element)
				.save();
		}, 300);
	};

	return (
		<div className="bg-gray-50 min-h-screen p-8 flex flex-col justify-center items-center gap-4">
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
											<p>48, Jalan Bawal 2, Taman Bawal Ria</p>
											<p>Simpang Tiga Kemboja, Air Hitam</p>
											<p>06150 Ayer Hitam</p>
											<p>Kedah, Malaysia</p>
										</span>
										<div className="flex flex-col gap-8 items-end">
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
									<span className="text-sm text-right font-semibold">
										Bill To:
									</span>
									<span className="text-sm text-right font-weight600 text-gray-700">
										{bookData[0]?.CustName}
									</span>
									<span className="text-sm text-right font-weight600 text-gray-700">
										{bookData[0]?.CustEmail}
									</span>
									<span className="text-sm text-right font-weight600 text-gray-700">
										{bookData[0]?.CustPhone}
									</span>
									<span className="text-sm text-right font-weight600 text-gray-700">
										{bookData[0]?.CustAddress}
									</span>
								</div>
								<div className="flex flex-col justify-start items-end">
									<div className="flex justify-center items-baseline gap-2">
										<span className="text-sm text-right font-semibold">
											Date:
										</span>
										<span className="text-sm text-right font-weight600 text-gray-700">
											{dayjs().format("DD MMM YYYY")}
										</span>
									</div>
									<div className="flex justify-center items-baseline gap-2">
										<span className="text-sm text-right font-semibold">
											Sales ID:
										</span>
										<span className="text-sm text-right font-weight600 text-gray-700">
											{userData?.AdmUname}
										</span>
									</div>
									<div className="text-sm whitespace-nowrap text-gray-700">
										<strong>Booking Number:</strong> {bookData[0]?.BookID}
									</div>
									<div className="text-sm whitespace-nowrap text-gray-700">
										<strong>Booking Date:</strong>{" "}
										{dayjs(bookData[0]?.BookDate).format("DD MMM YYYY hh:mm A")}
									</div>
									<div className="text-xs whitespace-nowrap text-gray-700">
										<strong>Status:</strong>{" "}
										{bookData[0]?.Status === "PAID" ? "PAID" : "UNPAID"}
									</div>
								</div>
							</div>
						</div>
						<div className="px-8 pt-12">
							<div className="border-t pt-4">
								<CombinedInvoiceTable bookData={bookData} />
							</div>

							<div className="mt-24 border-t">
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
							<hr className="w-full h-0.5 my-4 bg-gray-200 border-" />
						</div>
						<div className="max-w-screen-xl mx-auto flex flex-row items-center justify-between py-2 px-2 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-400 text-white">
							{/* Social Media Section */}
							<div className="flex items-center space-x-2 text-xs">
								<a
									href="https://www.instagram.com/elixsolution"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-1 hover:text-gray-200"
								>
									<FaInstagram size={15} />
									<span className={`text-xs ${isGeneratingPDF ? "-mt-3" : ""}`}>
										@kembaramuslim.travel
									</span>
								</a>
								<a
									href="https://www.tiktok.com/@elixsolution"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-1 hover:text-gray-200"
								>
									<FaTiktok size={15} />
									<span className={`text-xs ${isGeneratingPDF ? "-mt-3" : ""}`}>
										@kembaramuslim.travel
									</span>
								</a>
								<a
									href="https://wa.me/60124296462"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-1 hover:text-gray-200"
								>
									<FaWhatsapp size={15} />
									<span className={`text-xs ${isGeneratingPDF ? "-mt-3" : ""}`}>
										+6012-429 6462
									</span>
								</a>
							</div>

							{/* Company Address */}
							<div className="text-right text-xs">
								<p className={`text-xs ${isGeneratingPDF ? "-mt-3" : ""}`}>
									&copy; {new Date().getFullYear()} Kembara Muslim Travel &
									Tours. All rights reserved.
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<Button type="primary" onClick={() => handleDownloadPDF()}>
				Download
			</Button>
			<div className="mt-6 text-center text-sm text-gray-500 print:hidden">
				Thank you for your booking.
			</div>
		</div>
	);
};

export default Invoice;
