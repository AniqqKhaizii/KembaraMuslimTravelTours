"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Axios from "axios";
import { GiBed } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import { FaWhatsapp } from "react-icons/fa";
import { Skeleton } from "antd";
import { FaUsers } from "react-icons/fa";
const CustomAlert = ({ message, onClose, show }) => (
	<div
		className={`fixed bottom-10 left-5 w-80 bg-red-500 text-white py-3 px-6 rounded-md shadow-lg transition-all duration-500 transform ${
			show
				? "opacity-100 translate-x-0"
				: "opacity-0 translate-x-10 pointer-events-none"
		}`}
	>
		<div className="flex justify-between items-center">
			<span>{message}</span>
			<button onClick={onClose} className="text-white text-3xl">
				&times;
			</button>
		</div>
	</div>
);

const places = [
	{
		imgSrc:
			"https://maghfirahtravel.com.my/wp-content/uploads/2024/03/arafat-1024x683.jpg",
		title: "Jabal Rahmah",
		description: "Tempat suci yang kerap dikunjungi oleh jemaah haji dan umrah",
	},
	{
		imgSrc:
			"https://maghfirahtravel.com.my/wp-content/uploads/2024/03/kota-taif-1024x686.jpg",
		title: "Kota Taif",
		description:
			"Bandar di Arab Saudi, dikelilingi bukit-bukit, destinasi pelancongan utama",
	},
	{
		imgSrc:
			"https://maghfirahtravel.com.my/wp-content/uploads/2024/03/jabal-nur.jpg",
		title: "Jabal Nur",
		description:
			"Lokasi Gua Hira, tempat Nabi Muhammad menerima wahyu pertama.",
	},
	{
		imgSrc:
			"https://maghfirahtravel.com.my/wp-content/uploads/2024/03/mina.jpg",
		title: "Mina",
		description:
			"Tempat untuk melaksanakan lemparan jumrah semasa ibadah haji.",
	},
	{
		imgSrc:
			"https://maghfirahtravel.com.my/wp-content/uploads/2024/03/muzdalifa-1024x637.jpg",
		title: "Muzdalifah",
		description:
			"Tempat pengumpulan bagi jemaah haji semasa perjalanan dari Arafah ke Mina.",
	},
	{
		imgSrc:
			"https://maghfirahtravel.com.my/wp-content/uploads/2024/03/jabal-uhud-1024x657.jpg",
		title: "Jabal Uhud",
		description:
			"Bukit yang penting dalam sejarah Islam, terutama dalam Pertempuran Uhud",
	},
	{
		imgSrc:
			"https://maghfirahtravel.com.my/wp-content/uploads/2024/03/makam-rasulullah.jpg",
		title: "Makam Rasulullah",
		description:
			"Tempat dimana Nabi Muhammad dimakamkan, terletak di dalam Masjid Nabawi di Madinah",
	},
	{
		imgSrc:
			"https://maghfirahtravel.com.my/wp-content/uploads/2024/03/masjid-quba.jpg",
		title: "Masjid Quba",
		description:
			"Masjid pertama yang dibangun oleh Nabi Muhammad SAW di Madinah",
	},
	{
		imgSrc:
			"https://maghfirahtravel.com.my/wp-content/uploads/2024/03/masjid-qiblatain-1024x702.jpg",
		title: "Masjid Dua Kiblat",
		description:
			"Masjid bersejarah kerana memiliki dua arah kiblat yang berbeza dalam sejarah Islam",
	},
	{
		imgSrc:
			"https://maghfirahtravel.com.my/wp-content/uploads/2024/03/perkuburan-baqi.jpg",
		title: "Perkuburan Baqi",
		description:
			"Kawasan pemakaman para sahabat dan ahli keluarga Nabi Muhammad SAW",
	},
];

const formatDateToYYYYMMDD = (dateString) => {
	const [day, month, year] = dateString.split(" ");
	const monthMap = {
		Jan: "01",
		Feb: "02",
		Mar: "03",
		Apr: "04",
		May: "05",
		Jun: "06",
		Jul: "07",
		Aug: "08",
		Sept: "09",
		Oct: "10",
		Nov: "11",
		Dec: "12",
	};
	return `${year}${monthMap[month]}${day.padStart(2, "0")}`;
};

const MainPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [kategori, setKategori] = useState(null);
	const [selectedDate, setSelectedDate] = useState([]);
	const [selectedTrip, setSelectedTrip] = useState(null);
	const [selectedTripName, setSelectedTripName] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [loadingPackages, setLoadingPackages] = useState(true);
	const [loadingTrips, setLoadingTrips] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const kategoriValue = searchParams.get("kategori");
			setKategori(kategoriValue);
		}
	}, [searchParams]);

	const handleCheckboxChange = async (event) => {
		const dateRange = event.target.value;
		const [startTravelDateRaw, endTravelDateRaw] = dateRange.split(" - ");

		const startTravelDate = formatDateToYYYYMMDD(startTravelDateRaw);
		const endTravelDate = formatDateToYYYYMMDD(endTravelDateRaw);
		setSelectedDate(dateRange);
		setLoadingTrips(true);
		try {
			const response = await Axios.get("/api/Tetapan/ManageTrip", {
				params: {
					Operation: "SEARCH",
					StartTravelDate: startTravelDate,
					EndTravelDate: endTravelDate,
				},
			});
			setLoadingTrips(false);
			setSelectedTrip(response.data[0].TripID);
			setSelectedTripName(response.data[0].TripName);
		} catch (error) {
			console.error("API Error:", error);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedDate.length === 0) {
			setActiveTab(1);
			tabs[1].ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
			setShowAlert(true);
		} else {
			const query = `kategori=${encodeURIComponent(
				kategori
			)}&tarikh=${encodeURIComponent(selectedDate)}&trip=${encodeURIComponent(
				selectedTrip
			)}`;
			router.push(`Pakej-Umrah/TempahPakej?${query}`);
		}
	};

	useEffect(() => {
		if (showAlert) {
			const timer = setTimeout(() => {
				setShowAlert(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [showAlert]);

	const [packages, setPackages] = useState([]);

	useEffect(() => {
		const fetchPackages = async () => {
			setLoadingPackages(true);
			try {
				const response = await Axios.get("/api/Tetapan/ManagePackage", {
					params: {
						Operation: "SEARCH",
						PakejName: kategori,
						TripUnique: "",
					},
				});
				const packagesData = response.data;
				setLoadingPackages(false);
				setPackages(packagesData);
			} catch (error) {
				console.error("Error fetching packages:", error);
			}
		};
		if (kategori !== null) {
			fetchPackages();
		}
	}, [kategori]);

	const tabs = [
		{ title: "Room Pricing", ref: useRef(null) },
		{ title: "Travel Dates", ref: useRef(null) },
		{ title: "Hotels", ref: useRef(null) },
	];

	const [activeTab, setActiveTab] = useState(0);

	const handleScroll = (index) => {
		setActiveTab(index);
		tabs[index].ref.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	return (
		<div className="flex flex-col min-h-screen pb-12 bg-gray-100">
			<div
				className="relative lg:h-[55vh] h-[90vh] bg-cover bg-center bg-no-repeat overflow-hidden z-0"
				style={{
					backgroundImage: "url('/Pakej/1.JPG')",
				}}
			>
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-gray-100"></div>

				{/* Content */}
				<div className="relative z-10 flex flex-col items-start justify-start w-full h-full bg-gradient-to-b from-black/70 via-transparent to-gray-100 py-14 px-12">
					<h1 className="lg:text-7xl text-5xl font-semibold text-white text-center uppercase text-shadow-2xl">
						Pakej Umrah {kategori}
					</h1>
					<p className="text-center text-orange-600 font-reenie text-3xl my-2 font-semibold drop-shadow-white">
						"Discover Cultures, Embrace Your Beliefs"
					</p>
				</div>
			</div>
			{showAlert && (
				<CustomAlert
					message="Sila pilih tarikh perjalanan"
					onClose={() => setShowAlert(false)}
					show={showAlert}
				/>
			)}
			<div className="flex flex-col">
				<div className="mx-auto grid sm:grid-cols-1 lg:grid-cols-3 grid-rows-[auto,auto,1fr] max-w-screen-2xl gap-2">
					<div className="lg:col-span-2 sm:col-span-1 overflow-hidden sm:order-second lg:order-first border-r border-gray-200 px-4">
						<div className="p-2">
							{/* Tabs Navigation */}
							<div className="border-b border-gray-300 flex overflow-x-auto">
								{tabs.map((tab, index) => (
									<button
										key={index}
										className={`py-3 px-6 text-sm font-medium transition-all duration-300 ${
											activeTab === index
												? "text-orange-700 border-b-2 border-orange-600"
												: "text-gray-500 hover:text-orange-600"
										}`}
										onClick={() => handleScroll(index)}
									>
										{tab.title}
									</button>
								))}
							</div>

							{/* Sections */}
							<div className="mt-4">
								{/* Pricing & Date */}
								<section ref={tabs[0].ref} className="py-6">
									<h2 className="text-2xl font-medium p-4 bg-orange-500 text-white text-left">
										Room Pricing
									</h2>

									{/* Categories */}
									{[
										{
											title: "Adult",
											keys: ["Adult_Quad", "Adult_Triple", "Adult_Double"],
										},
										{
											title: "Child With Bed",
											keys: [
												"ChildWBed_Quad",
												"ChildWBed_Triple",
												"ChildWBed_Double",
											],
										},
										{
											title: "Child Without Bed",
											keys: [
												"ChildNoBed_Quad",
												"ChildNoBed_Triple",
												"ChildNoBed_Double",
											],
										},
										{
											title: "Infant",
											keys: ["Infant_Quad", "Infant_Triple", "Infant_Double"],
										},
									].map((category, catIdx) => (
										<div key={catIdx} className="border-b-2 border-gray-500">
											<div className="grid sm:grid-cols-1 lg:grid-cols-4 text-center lg:divide-y-0 sm:divide-x-0 sm:divide-y divide-gray-300 bg-gray-50 p-2 gap-2">
												<h3 className="flex items-center text-xl font-semibold text-gray-500 px-4 sm:py-4 py-0">
													{category.title}
												</h3>

												{category.keys.map((type, idx) => {
													const personCount = type.includes("Double")
														? 2
														: type.includes("Triple")
														? 3
														: type.includes("Quad")
														? 4
														: 1;

													return (
														<div key={idx}>
															{loadingPackages ? (
																<Skeleton height={50} />
															) : (
																<div className="flex flex-col items-end p-4 rounded-md border border-gray-300">
																	<div className="flex items-center justify-between gap-2 text-gray-600">
																		<div className="flex items-center gap-1">
																			<GiBed className="text-xl" />
																			{[...Array(personCount)].map(
																				(_, index) => (
																					<GoPerson
																						key={index}
																						className="text-lg"
																					/>
																				)
																			)}
																		</div>
																		<span className="text-lg font-semibold text-gray-700">
																			{type.split("_").pop().toUpperCase()}
																		</span>
																	</div>
																	<div className="flex items-end justify-center gap-2 text-4xl font-bold text-gray-800 mt-2">
																		<span className="text-lg text-gray-500">
																			RM
																		</span>
																		{packages[0]?.[type]?.toLocaleString() ||
																			"N/A"}
																	</div>
																</div>
															)}
														</div>
													);
												})}
											</div>
										</div>
									))}
								</section>

								{/* Travel Dates */}
								<section ref={tabs[1].ref} className="py-2">
									<h2 className="text-2xl font-medium p-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-left">
										Select Your Travel Dates
									</h2>

									<form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border border-gray-300 p-4 bg-gray-50">
										{packages.map((pkg, index) => {
											const formattedStartDate = new Intl.DateTimeFormat(
												"en-GB",
												{
													day: "2-digit",
													month: "short",
													year: "numeric",
												}
											).format(new Date(pkg.StartTravelDate));

											const formattedEndDate = new Intl.DateTimeFormat(
												"en-GB",
												{
													day: "2-digit",
													month: "short",
													year: "numeric",
												}
											).format(new Date(pkg.EndTravelDate));

											const travelDate = `${formattedStartDate} - ${formattedEndDate}`;
											const isSelected = selectedDate === travelDate;

											return (
												<label
													key={index}
													className={`relative block border rounded-md p-6 text-center  transition-all duration-200 overflow-hidden 
                        ${
													pkg.Status === "Full"
														? "opacity-40 cursor-not-allowed"
														: "hover:shadow-xl cursor-pointer"
												}
                        ${
													isSelected
														? "border-green-500 bg-green-500 shadow-xl ring-1 ring-green-600 text-white"
														: "border-gray-300 text-gray-800"
												}`}
												>
													<input
														type="checkbox"
														name="travel_date"
														value={travelDate}
														className="absolute top-0 left-0 w-5 h-5 opacity-100 shadow-md"
														checked={isSelected}
														onChange={handleCheckboxChange}
														disabled={pkg.Status === "Full"}
													/>

													<h3 className="text-xl font-semibold border-b border-gray-200 pb-2">
														{pkg.TripName}
													</h3>

													<p className="text-md py-1 rounded-full inline-block mt-2">
														{formattedStartDate} → {formattedEndDate}
													</p>

													<div className="flex w-full justify-center items-center gap-1">
														<FaUsers />
														<span>{pkg.SeatBalance} Left</span>
													</div>

													<div
														className={`absolute top-0 right-0 px-6 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 shadow-lg
                            ${
															pkg.Status === "Full"
																? "bg-red-500 text-white"
																: "bg-green-500 text-white"
														}`}
													>
														{pkg.Status === "Full"
															? "FULLY BOOKED"
															: "AVAILABLE"}
													</div>
												</label>
											);
										})}
									</form>
								</section>

								{/* Hotels */}
								<section ref={tabs[2].ref} className="py-2">
									<h2 className="text-2xl font-medium p-4 bg-orange-500 text-white text-left">
										Hotels
									</h2>

									<div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 border border-gray-300 p-4 bg-gray-50">
										{/* Makkah Hotel */}
										<div className="grid grid-cols-1 gap-6 items-center bg-gray-50 shadow-inner p-6 rounded-lg">
											{/* Hotel Image */}
											<div className="w-full">
												<img
													src={
														packages[0]?.MakkahHotelImage || "/placeholder.jpg"
													}
													alt="Makkah Hotel"
													className="w-full h-60 object-cover rounded-lg shadow"
												/>
											</div>

											{/* Hotel Info */}
											<div className="text-lg space-y-2">
												<h3 className="text-xl font-semibold text-green-700">
													Makkah Hotel
												</h3>
												<p className="text-gray-700">
													<strong>Name:</strong>{" "}
													{packages[0]?.MakkahHotelName || "N/A"}
												</p>
												<p className="text-gray-700">
													<strong>Distance:</strong>{" "}
													{packages[0]?.MakkahHotelDistance || "N/A"}m from
													Masjid al-Haram
												</p>
											</div>
										</div>

										{/* Madinah Hotel */}
										<div className="grid grid-cols-1 gap-6 items-center bg-gray-50 shadow-inner p-6 rounded-lg">
											{/* Hotel Image */}
											<div className="w-full">
												<img
													src={
														packages[0]?.MadinahHotelImage || "/placeholder.jpg"
													}
													alt="Madinah Hotel"
													className="w-full h-60 object-cover rounded-lg shadow"
												/>
											</div>

											{/* Hotel Info */}
											<div className="text-lg space-y-2">
												<h3 className="text-xl font-semibold text-green-700">
													Madinah Hotel
												</h3>
												<p className="text-gray-700">
													<strong>Name:</strong>{" "}
													{packages[0]?.MadinahHotelName || "N/A"}
												</p>
												<p className="text-gray-700">
													<strong>Distance:</strong>{" "}
													{packages[0]?.MadinahHotelDistance || "N/A"}m from
													Al-Masjid An-Nabawi
												</p>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>

					{/* Sticky Product Information Section */}
					<div className="relative xs:-mt-[50vh] sm:-mt-[60vh] xs:mx-6 sm:mx-12 mt-0 lg:sticky lg:top-40 xs:order-first sm:order-first lg:order-second p-6 rounded-sm text-center bg-gray-50 min-h-80 max-h-96 border border-gray-200 shadow-lg overflow-hidden">
						{/* Background Image Overlay */}

						<div className="absolute inset-0 flex flex-col justify-center p-4 bg-gray-50/20">
							{/* Package Title */}
							<h2 className="text-xl font-semibold text-green-700 tracking-wide">
								Pakej Umrah {kategori}
							</h2>

							{/* Price Display */}

							<div className="flex flex-col items-start mx-auto text-gray-900 text-6xl  mt-6 tracking-none">
								<span className="text-gray-500 text-sm text-left">
									Starting From
								</span>
								<div className="flex items-start">
									<span className="text-xl text-gray-500">RM</span>
									<span className="text-black font-bold">
										{packages[0]?.Adult_Quad
											? Number(packages[0].Adult_Quad).toLocaleString()
											: "N/A"}
									</span>
									<span className="text-xl text-gray-500">/Adult</span>
								</div>
							</div>

							{/* Room Type Display */}
							<p className="font-regular text-gray-600 mt-3 text-sm">
								Quad Sharing Room
							</p>
							{/* Travel Name */}
							{loadingTrips ? (
								<Skeleton active title={true} paragraph={false} />
							) : (
								<p className="font-semibold text-gray-600 text-sm">
									{selectedTripName ? `Trip ` + selectedTripName : ""}
								</p>
							)}

							{/* Travel Date */}
							<p className="font-semibold text-gray-600 text-sm">
								{selectedDate ? selectedDate : ""}
							</p>

							{/* Action Buttons */}
							<div className="mt-6 flex flex-col gap-3 border-t border-gray-300 pt-6 ">
								{/* WhatsApp Button */}
								<a
									href={`https://wa.me/60123456789?text=Saya%20berminat%20dengan%20Pakej%20Umrah%20${kategori}`} // Change number accordingly
									target="_blank"
									rel="noopener noreferrer"
									className="bg-green-600 text-white py-2 px-5 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-green-700 transition"
								>
									<FaWhatsapp className="text-xl" /> Enquire Now
								</a>

								{/* Book Now Button */}
								<button
									className="border border-gray-300 text-gray-900 py-2 px-5 rounded-lg shadow-md bg-white hover:bg-gray-100 transition"
									onClick={handleSubmit}
								>
									Book Now
								</button>
							</div>
						</div>
					</div>

					<div className="lg:col-span-2 sm:col-span-1 px-4 py-12">
						<h1 className="text-center text-3xl font-semibold mb-8 border-b-2 border-gray-300 py-4">
							Tempat - Tempat Ziarah
						</h1>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-8">
							{places.map((place, index) => (
								<div key={index}>
									<div className="px-4 border-b-8 border-orange-400">
										<img
											src={place.imgSrc}
											alt={place.title}
											className="w-full h-48 object-cover rounded-t-md bg-custom-gradient shadow-2xl"
										/>
									</div>
									<div className="p-4">
										<h2 className="text-lg font-bold text-gray-800 text-center">
											{place.title}
										</h2>
										<p className="text-sm text-gray-600 mt-2 text-center">
											{place.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
