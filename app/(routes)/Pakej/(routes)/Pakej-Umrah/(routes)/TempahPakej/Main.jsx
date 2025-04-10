"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Select } from "antd";

import { CiCircleMinus } from "react-icons/ci";

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

const Main = () => {
	const [paymentOption, setPaymentOption] = useState("full");
	const [paymentChannel, setPaymentChannel] = useState("");
	const totalCost = 1000.0; // Example total cost
	const [tarikh, setTarikh] = useState(null);
	const [kategori, setKategori] = useState("");
	const [loadingTrips, setLoadingTrips] = useState(false);
	const [tripDetails, setTripDetails] = useState(null);
	const [packages, setPackages] = useState([]);
	const [roomPrices, setRoomPrices] = useState({});
	const [showAlert, setShowAlert] = useState(false);
	const [maklumatJemaah, setMaklumatJemaah] = useState({});

	useEffect(() => {
		if (showAlert) {
			const timer = setTimeout(() => {
				setShowAlert(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [showAlert]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const kategoriFromUrl = params.get("kategori");
		const tarikhFromUrl = params.get("tarikh");
		const tripId = params.get("trip");

		const fetchTrip = async () => {
			setLoadingTrips(true);
			try {
				const response = await Axios.get("/api/Tetapan/ManageTrip", {
					params: {
						Operation: "SEARCH",
						TripID: tripId,
					},
				});
				const tripData = response.data;
				setLoadingTrips(false);
				setTripDetails(tripData);
			} catch (error) {
				console.error("Error fetching packages:", error);
			}
		};
		if (tripId !== null) {
			fetchTrip();
		}

		if (tarikhFromUrl) {
			const dateParts = tarikhFromUrl.split(" - ");
			if (dateParts.length === 2) {
				const startDate = new Date(dateParts[0].trim());
				const endDate = new Date(dateParts[1].trim());

				if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
					setTarikh([startDate, endDate]);
				} else {
					console.error("Invalid date format:", tarikhFromUrl);
				}
			} else {
				console.error("Unexpected tarikh format:", tarikhFromUrl);
			}
		}

		const fetchPackages = async () => {
			try {
				const response = await Axios.get("/api/Tetapan/ManagePackage", {
					params: {
						Operation: "SEARCH",
						PakejName: kategoriFromUrl,
						TripUnique: "Y",
						TripID: tripId,
					},
				});
				const packagesData = response.data;
				setPackages(packagesData);
				console.log("packagesData", packagesData);
				setRoomPrices({
					Berdua: {
						adult: packagesData[0].Adult_Double,
						childWithBed: packagesData[0].ChildWBed_Double,
						childWithoutBed: packagesData[0].ChildNoBed_Double,
						infant: packagesData[0].Infant_Double,
					},
					Bertiga: {
						adult: packagesData[0].Adult_Triple,
						childWithBed: packagesData[0].ChildWBed_Triple,
						childWithoutBed: packagesData[0].ChildNoBed_Triple,
						infant: packagesData[0].Infant_Triple,
					},
					Berempat: {
						adult: packagesData[0].Adult_Quad,
						childWithBed: packagesData[0].ChildWBed_Quad,
						childWithoutBed: packagesData[0].ChildNoBed_Quad,
						infant: packagesData[0].Infant_Quad,
					},
				});
			} catch (error) {
				console.error("Error fetching packages:", error);
			}
		};

		if (kategoriFromUrl !== null) {
			fetchPackages();
		}

		setKategori(kategoriFromUrl);
	}, []);

	const [rooms, setRooms] = useState([
		{ adult: 1, childWithBed: 0, childWithoutBed: 0, infant: 0, roomType: "" },
	]);

	// Room capacity rules
	const roomCapacity = {
		Berdua: 2,
		Bertiga: 3,
		Berempat: 4,
	};

	// Add new room option
	const handleAddRoomOption = () => {
		setRooms([
			...rooms,
			{
				roomType: "",
				adult: 0,
				childWithBed: 0,
				childWithoutBed: 0,
				infant: 0,
			},
		]);
	};

	// Remove room option
	const handleRemoveRoomOption = (index) => {
		const updatedRooms = rooms.filter((_, i) => i !== index);
		setRooms(updatedRooms);
	};

	// Room type selection
	const handleRoomTypeChange = (index, value) => {
		const updatedRooms = [...rooms];
		updatedRooms[index].roomType = value;

		// Reset guest counts when room type changes
		updatedRooms[index].adult = 0;
		updatedRooms[index].childWithBed = 0;

		setRooms(updatedRooms);
		handleCardSelect(value);
	};

	const handleIncrement = (index, key) => {
		const updatedRooms = [...rooms];

		// Check if room type is selected
		if (!updatedRooms[index].roomType) {
			setShowAlert(true);
			return;
		}

		const totalGuests =
			updatedRooms[index].adult + updatedRooms[index].childWithBed;
		const additionalGuests =
			updatedRooms[index].childWithoutBed + updatedRooms[index].infant;

		if (
			(key === "adult" || key === "childWithBed") &&
			totalGuests < roomCapacity[updatedRooms[index].roomType]
		) {
			updatedRooms[index][key]++;
		} else if (
			(key === "childWithoutBed" || key === "infant") &&
			totalGuests <= roomCapacity[updatedRooms[index].roomType] &&
			additionalGuests < 1 // Limit to only one additional guest
		) {
			updatedRooms[index][key]++;
		}

		setRooms(updatedRooms);
		handleCardSelect(updatedRooms[index].roomType);
	};

	const handleDecrement = (index, key) => {
		const updatedRooms = [...rooms];

		// Check if room type is selected
		if (!updatedRooms[index].roomType) {
			setShowAlert(true);
			return;
		}

		if (updatedRooms[index][key] > 0) {
			updatedRooms[index][key]--;
		}

		setRooms(updatedRooms);
		handleCardSelect(updatedRooms[index].roomType);
	};

	const [currentStep, setCurrentStep] = useState(1);

	const handleNextStep = (e) => {
		if (currentStep === 1) {
			e.preventDefault();
			const validRooms = rooms.every(
				(room) =>
					room.roomType.trim() !== "" &&
					(room.adult > 0 || room.childWithBed > 0) // At least one adult or child with bed
			);

			if (!validRooms) {
				setShowAlert(true);
				alert(
					"Sila pilih jenis bilik dan pastikan sekurang-kurangnya seorang dewasa atau kanak-kanak dengan katil."
				);
				return;
			}

			setCurrentStep((prevStep) => prevStep + 1);
		} else if (currentStep === 2) {
			e.preventDefault();
			const form = document.getElementById("user-details");
			const formData = new FormData(form);

			const maklumatJemaah = Object.fromEntries(formData);

			const allFieldsFilled = Object.values(maklumatJemaah).every(
				(value) => value.trim() !== ""
			);

			if (!allFieldsFilled) {
				setShowAlert(true);
				alert("Sila isi semua maklumat yang diperlukan.");
				return;
			}

			// Proceed if valid
			setCurrentStep((prevStep) => prevStep + 1);
		} else if (currentStep < 5) {
			setCurrentStep((prevStep) => prevStep + 1);
		}
	};

	const handlePrevStep = () => {
		if (currentStep > 1) {
			setCurrentStep((prevStep) => prevStep - 1);
		}
	};

	const [selectedOption, setSelectedOption] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);

	const handleCardSelect = (option) => {
		const formattedOption = option.replace("bilik", "").trim();
		setSelectedOption(formattedOption);

		const newTotalPrice = rooms.reduce((total, room) => {
			const { adult, childWithBed, childWithoutBed, infant } = room;

			// Ensure selected room type matches valid room prices
			const roomPrice = roomPrices[room.roomType]; // Use room.roomType for dynamic handling
			if (!roomPrice) {
				console.error("Invalid room type:", room.roomType);
				return total;
			}

			// Price calculation logic
			const roomTotal =
				adult * roomPrice.adult +
				childWithBed * roomPrice.child +
				(childWithoutBed > 0 ? roomPrice.childWithoutBed : 0) + // Add only if > 0
				(infant > 0 ? roomPrice.infant : 0); // Add only if > 0

			return total + roomTotal;
		}, 0);

		setTotalPrice(newTotalPrice);
	};

	const formatICNumber = (value) => {
		// Remove any non-numeric characters
		const digits = value.replace(/\D/g, "");

		// Auto-insert dashes at correct positions
		if (digits.length <= 6) {
			return digits;
		} else if (digits.length <= 8) {
			return `${digits.slice(0, 6)}-${digits.slice(6)}`;
		} else {
			return `${digits.slice(0, 6)}-${digits.slice(6, 8)}-${digits.slice(
				8,
				12
			)}`;
		}
	};
	const isValidMalaysianIC = (icNumber) => {
		const icRegex = /^\d{6}-\d{2}-\d{4}$/; // Basic format check
		if (!icRegex.test(icNumber)) return false;

		const [dob, stateCode, serial] = icNumber.split("-");

		// Extract Year, Month, and Day
		const year = parseInt(dob.substring(0, 2), 10);
		const month = parseInt(dob.substring(2, 4), 10);
		const day = parseInt(dob.substring(4, 6), 10);

		// Determine full birth year (Assuming range 1900-2099)
		const fullYear = year >= 50 ? 1900 + year : 2000 + year;

		// Validate Date
		const isValidDate = !isNaN(
			new Date(`${fullYear}-${month}-${day}`).getTime()
		);
		if (!isValidDate) return false;

		// Validate Malaysian State Code
		const validStateCodes = [
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10", // Peninsular Malaysia
			"11",
			"12",
			"13",
			"14",
			"15",
			"16", // Sabah & Sarawak
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29", // Foreigners
		];
		if (!validStateCodes.includes(stateCode)) return false;

		return true;
	};

	//PAYMENT
	const handlePayment = async () => {
		let hargaBayaran = 0;
		if (paymentOption === "full") {
			hargaBayaran =
				rooms.reduce(
					(acc, room) =>
						acc +
						room.adult * (roomPrices[selectedOption]?.adult || 0) +
						room.childWithBed *
							(roomPrices[selectedOption]?.childWithBed || 0) +
						room.childWithoutBed *
							(roomPrices[selectedOption]?.childWithoutBed || 0) +
						room.infant * (roomPrices[selectedOption]?.infant || 0),
					0
				) * 100;
		} else {
			hargaBayaran = totalCost * 100;
		}
		const RefNo = Math.random().toString(36).substring(2, 10).toUpperCase();
		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + 1);

		const formattedExpiryDate = `${expiryDate
			.getDate()
			.toString()
			.padStart(2, "0")}-${(expiryDate.getMonth() + 1)
			.toString()
			.padStart(2, "0")}-${expiryDate.getFullYear()} 12:00:00`;
		const billData = {
			userSecretKey: "9m91gfvi-z26g-t58b-guvx-m6vwrx1nn304",
			categoryCode: "74o55mu9",
			billName: `Pakej Umrah ${kategori} `,
			billDescription: `Trip Test`,
			billPriceSetting: 0,
			billPayorInfo: 1,
			billAmount: hargaBayaran,
			billReturnUrl: "",
			billCallbackUrl: "",
			billExternalReferenceNo: RefNo,
			billTo: maklumatJemaah?.NamaPengguna,
			billEmail: maklumatJemaah?.EmelPengguna,
			billPhone: maklumatJemaah?.TelNoPengguna,
			billSplitPayment: 0,
			billSplitPaymentArgs: "",
			billPaymentChannel: "2",
			billContentEmail: "Terima kasih kerana sudah tempah pakej umrah!",
			billChargeToCustomer: 1,
			billExpiryDate: formattedExpiryDate,
			billExpiryDays: 1,
		};

		try {
			const response = await Axios.post(
				"https://dev.toyyibpay.com/index.php/api/createBill",
				new URLSearchParams(billData).toString(),
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
			);

			window.open(
				"https://dev.toyyibpay.com/" + response.data[0].BillCode,
				"_blank"
			);
			return response.data;
		} catch (error) {
			console.error("Error:", error);
			return null;
		}
	};

	return (
		<div className="lg:max-w-screen-xl sm:max-w-screen-lg xs:max-w-screen-xl mx-auto sm:px-4 xs:px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* Left Side */}
			{showAlert && (
				<CustomAlert
					message="Sila pilih jenis bilik terlebih dahulu."
					onClose={() => setShowAlert(false)}
					show={showAlert}
				/>
			)}
			<div className="flex flex-col lg:col-span-2 gap-6">
				<nav aria-label="Breadcrumb">
					<ol
						role="list"
						className="mx-auto flex max-w-5xl items-center lg:justify-start justify-center py-4 lg:max-w-7xl"
					>
						<li>
							<div className="flex items-center">
								<a
									href="/"
									className="lg:text-sm sm:text-xs xs:text-xs font-medium text-gray-900"
								>
									Utama
								</a>
								<svg
									width="16"
									height="20"
									viewBox="0 0 16 20"
									fill="currentColor"
									aria-hidden="true"
									className="h-5 w-4 text-gray-300"
								>
									<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
								</svg>
							</div>
						</li>
						<li>
							<div className="flex items-center">
								<a
									href="/Pakej"
									className="lg:text-sm sm:text-xs xs:text-xs font-medium text-gray-900"
								>
									Pakej Umrah
								</a>
								<svg
									width="16"
									height="20"
									viewBox="0 0 16 20"
									fill="currentColor"
									aria-hidden="true"
									className="h-5 w-4 text-gray-300"
								>
									<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
								</svg>
							</div>
						</li>
						<li>
							<div className="flex items-center">
								<a
									href={`/Pakej/Pakej-Umrah?kategori=${kategori}`}
									className="lg:text-sm sm:text-xs xs:text-xs font-medium text-gray-900"
								>
									Pakej {kategori}
								</a>
								<svg
									width="16"
									height="20"
									viewBox="0 0 16 20"
									fill="currentColor"
									aria-hidden="true"
									className="h-5 w-4 text-gray-300"
								>
									<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
								</svg>
							</div>
						</li>

						<li className="lg:text-sm sm:text-xs xs:text-xs">
							<span className="font-medium text-gray-500">
								{tarikh
									? `${tarikh[0].toLocaleDateString("en-GB", {
											day: "2-digit",
											month: "short",
											year: "numeric",
									  })} - ${tarikh[1].toLocaleDateString("en-GB", {
											day: "2-digit",
											month: "short",
											year: "numeric",
									  })}`
									: "Pilih Tarikh"}
							</span>
						</li>
					</ol>
				</nav>
				{/* Stepper */}
				<ol className="flex lg:mx-32 mx-auto lg:px-auto pl-12 justify-center items-center w-full text-xs text-gray-900 font-medium sm:text-base">
					{[1, 2, 3].map((step, index) => (
						<li
							key={step}
							className={`flex w-full relative  ${
								currentStep >= step ? "text-orange-600" : "text-gray-900"
							}`}
						>
							{index < 2 && (
								<div
									className={`absolute lg:top-5 top-3 lg:left-1 left-2 w-full h-0.5 ${
										currentStep > step ? "bg-orange-600" : "bg-gray-400"
									} `}
								></div>
							)}
							<div className="block whitespace-nowrap z-10">
								<span
									className={`w-6 h-6 ${
										currentStep >= step ? "bg-orange-600" : "bg-gray-400"
									} border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:w-10 lg:h-10  shadow-xl`}
								>
									{step}
								</span>{" "}
								Step {step}
							</div>
						</li>
					))}
				</ol>

				<div className="bg-gray-50 border-t border-gray-300 lg:p-6 p-2">
					{currentStep === 1 && (
						<>
							<div
								id="tour-overview"
								className="grid lg:grid-cols-2 grid-cols-1 gap-4 "
							>
								{rooms.map((room, index) => (
									<div key={index} className="border rounded-lg p-4">
										<div className="flex justify-between items-center mb-3">
											<h3 className="text-lg">Room {index + 1}</h3>
											{index > 0 && (
												<button
													className="flex items-center text-red-500 hover:underline hover:underline-offset-2 gap-2"
													onClick={() => handleRemoveRoomOption(index)}
												>
													<CiCircleMinus className="text-red-700" />
													Remove room option
												</button>
											)}
										</div>
										<div className="flex flex-col justify-between items-center mb-3">
											<Select
												name="roomType"
												id="roomType"
												className="w-full font-primary"
												value={room.roomType || ""} // Ensure selected value is displayed
												onChange={(value) => handleRoomTypeChange(index, value)} // Directly use `value`
											>
												<Select.Option value="">Select room type</Select.Option>
												<Select.Option value="Berdua">
													Bilik Berdua
												</Select.Option>
												<Select.Option value="Bertiga">
													Bilik Bertiga
												</Select.Option>
												<Select.Option value="Berempat">
													Bilik Berempat
												</Select.Option>
											</Select>
										</div>

										<div className="grid grid-cols-1 gap-3 py-4 border-t border-gray-300">
											{[
												{ type: "Adult", key: "adult" },
												{ type: "Child w/ Bed", key: "childWithBed" },
												{ type: "Child w/o Bed", key: "childWithoutBed" },
												{ type: "Infant", key: "infant" },
											].map(({ type, key }, idx) => (
												<div
													key={idx}
													className="flex items-center justify-between w-full"
												>
													<span className="font-medium text-gray-600">
														{type}
													</span>
													<div className="flex items-center gap-6">
														<button
															className="px-3 py-1 border border-orange-600 text-orange-600"
															onClick={() => handleDecrement(index, key)}
														>
															-
														</button>
														<span className="text-md font-semibold text-gray-800 w-2">
															{room[key]}
														</span>
														<button
															className="px-3 py-1 border border-orange-600 text-orange-600"
															onClick={() => handleIncrement(index, key)}
														>
															+
														</button>
													</div>
												</div>
											))}
										</div>
									</div>
								))}

								<div className="lg:col-span-2 col-span-1 mt-4 bg-green-100 p-3 rounded-sm">
									<strong className="text-green-700">Guests Summary:</strong>
									<p className="text-green-600">
										{rooms.reduce(
											(acc, room) =>
												acc +
												room.adult +
												room.childWithBed +
												room.childWithoutBed +
												room.infant,
											0
										)}{" "}
										Guests with bed:{" "}
										{rooms
											.flatMap((room) => room.adult + room.childWithBed)
											.join(", ")}
									</p>
								</div>

								<div className="my-4">
									<button
										className="px-4 py-2 border border-blue-500 text-blue-500 rounded-sm hover:bg-blue-500 hover:text-white"
										onClick={handleAddRoomOption}
									>
										Add Room Option +
									</button>
								</div>
							</div>
						</>
					)}

					{currentStep === 2 && (
						<div>
							{/* User Details Form */}
							<h3 className="text-xl mb-4 text-gray-800">Maklumat Pengguna</h3>
							<form
								id="user-details"
								className="mb-6 grid lg:grid-cols-2 grid-cols-1 gap-4"
							>
								<input
									type="text"
									name="NamaPengguna"
									placeholder="Nama"
									value={maklumatJemaah?.NamaPengguna || ""}
									onChange={(e) =>
										setMaklumatJemaah((prev) => ({
											...prev,
											NamaPengguna: e.target.value,
										}))
									}
									className="border px-3 py-2"
									required
								/>
								<input
									type="text"
									name="ICPengguna"
									placeholder="No IC"
									value={maklumatJemaah?.ICPengguna || ""}
									onChange={(e) =>
										setMaklumatJemaah((prev) => ({
											...prev,
											ICPengguna: e.target.value,
										}))
									}
									className="border px-3 py-2"
									required
								/>
								<input
									type="email"
									name="EmelPengguna"
									placeholder="Emel"
									value={maklumatJemaah?.EmelPengguna || ""}
									onChange={(e) =>
										setMaklumatJemaah((prev) => ({
											...prev,
											EmelPengguna: e.target.value,
										}))
									}
									className="border px-3 py-2"
									required
								/>
								<input
									type="tel"
									name="TelNoPengguna"
									placeholder="No Telefon"
									value={maklumatJemaah?.TelNoPengguna || ""}
									onChange={(e) =>
										setMaklumatJemaah((prev) => ({
											...prev,
											TelNoPengguna: e.target.value,
										}))
									}
									className="border px-3 py-2"
									required
								/>

								{/* Guest Details Form (Based on Room Selection) */}
								{rooms.map((room, index) => (
									<div key={index} className="mb-6 border rounded-lg p-4">
										<h4 className="font-bold text-lg mb-3">
											Bilik {index + 1} - {room.roomType}
										</h4>

										{/* Name & IC Inputs for Main Guests */}
										{[
											...Array(
												room.roomType === "Berdua"
													? 2
													: room.roomType === "Bertiga"
													? 3
													: 4
											),
										].map((_, i) => (
											<div
												key={`guest-${index}-${i}`}
												className="grid grid-cols-2 gap-3 mb-2"
											>
												<input
													type="text"
													name={`NamaTetamu${i + 1} - Bilik ${index + 1}`}
													placeholder={`Nama Tetamu ${i + 1}`}
													value={
														maklumatJemaah?.[
															`NamaTetamu${i + 1} - Bilik ${index + 1}`
														] || ""
													}
													onChange={(e) =>
														setMaklumatJemaah((prev) => ({
															...prev,
															[`NamaTetamu${i + 1} - Bilik ${index + 1}`]:
																e.target.value,
														}))
													}
													className="border px-3 py-2"
													required
												/>
												<input
													type="text"
													name={`ICTetamu${i + 1} - Bilik ${index + 1}`}
													placeholder={`No IC Tetamu ${i + 1}`}
													value={
														maklumatJemaah?.[
															`ICTetamu${i + 1} - Bilik ${index + 1}`
														] || ""
													}
													onChange={(e) => {
														const formattedValue = formatICNumber(
															e.target.value
														);
														setMaklumatJemaah((prev) => ({
															...prev,
															[`ICTetamu${i + 1} - Bilik ${index + 1}`]:
																formattedValue,
														}));
													}}
													onBlur={(e) => {
														const value = e.target.value;
														if (value && !isValidMalaysianIC(value)) {
															alert("Invalid Malaysian IC format or details!");
															setMaklumatJemaah((prev) => ({
																...prev,
																[`ICTetamu${i + 1} - Bilik ${index + 1}`]: "", // Reset invalid value
															}));
														}
													}}
													className="border px-3 py-2"
													required
												/>
											</div>
										))}

										{/* Additional Guests (Child w/o Bed + Infant) */}
										{[...Array(room.childWithoutBed + room.infant)].map(
											(_, i) => (
												<div
													key={`extra-guest-${index}-${i}`}
													className="grid grid-cols-2 gap-3 mb-2"
												>
													<input
														type="text"
														placeholder={`Nama Tambahan ${i + 1}`}
														className="border px-3 py-2"
														required
													/>
													<input
														type="text"
														placeholder={`No IC Tambahan ${i + 1}`}
														className="border px-3 py-2"
														required
													/>
												</div>
											)
										)}
									</div>
								))}
							</form>
						</div>
					)}

					{currentStep === 3 && (
						<div id="summary-overview" className="p-6">
							<h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
								Trip Summary
							</h3>

							{/* Pax and Room Type Summary */}
							<div className="mb-6">
								<div className="flex justify-between items-center border-b pb-4 mb-4">
									<div className="text-gray-600 font-medium">
										<span className="block mb-2">Number of Pax:</span>
										<span className="block mb-2">Room Type:</span>
										<span className="block mb-2">Trip Date:</span>
									</div>
									<div className="text-gray-800 font-semibold text-right">
										<span className="block mb-2">
											{rooms.reduce(
												(acc, room) =>
													acc +
													room.adult +
													room.childWithBed +
													room.childWithoutBed,
												0
											)}{" "}
											Pax
										</span>
										<span className="block mb-2">{selectedOption}</span>
										<span className="block mb-2">
											{/* {tarikh} - {tarikhAkhir}{" "} */}
										</span>
									</div>
								</div>
							</div>

							{/* Payment Choice */}
							<div className="mb-6">
								<h4 className="text-lg font-semibold text-gray-800 mb-2">
									Payment Options
								</h4>
								<div className="flex justify-center gap-4">
									<button
										onClick={() => setPaymentOption("full")}
										className={`py-3 px-6 w-1/2 rounded-lg shadow-md text-center transition duration-200 ${
											paymentOption === "full"
												? "bg-orange-500 text-white"
												: "bg-gray-200 text-gray-600 hover:bg-gray-300"
										}`}
									>
										Full Payment
									</button>
									<button
										onClick={() => setPaymentOption("deposit")}
										className={`py-3 px-6 w-1/2 rounded-lg shadow-md text-center transition duration-200 ${
											paymentOption === "deposit"
												? "bg-orange-500 text-white"
												: "bg-gray-200 text-gray-600 hover:bg-gray-300"
										}`}
									>
										Deposit
									</button>
								</div>
							</div>

							<div className="mb-6">
								<button
									onClick={handlePayment}
									className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg shadow-md w-full transition duration-200"
								>
									Continue to Payment
								</button>
							</div>

							{/* Payment Channel Selection */}
							{/* <div className="mb-6">
								<h4 className="text-lg font-semibold text-gray-800 mb-2">
									Payment Channel
								</h4>
								<div className="flex flex-col gap-3">
									{[
										{ name: "Credit Card", logo: "/PaymentChannel/Card.png" },
										{ name: "FPX", logo: "/PaymentChannel/FPX.png" },
										{ name: "E-Wallet", logo: "/PaymentChannel/EWallet.png" },
									].map((channel, index) => (
										<button
											key={index}
											onClick={() => setPaymentChannel(channel.name)}
											aria-pressed={paymentChannel === channel.name}
											className={`flex items-center justify-between py-3 px-4 rounded-lg shadow-md transition duration-200
          ${
						paymentChannel === channel.name
							? "border-2 border-orange-500 bg-orange-50"
							: "border border-gray-300 hover:border-orange-300 hover:bg-orange-100"
					}`}
										>
											<div className="flex items-center gap-3">
												<img
													src={channel.logo}
													alt={`${channel.name} Logo`}
													className="w-6 h-6 object-contain"
												/>
												<span className="text-gray-800 font-medium">
													{channel.name}
												</span>
											</div>
											{paymentChannel === channel.name && (
												<span className="text-orange-500 font-semibold">
													&#10003;
												</span>
											)}
										</button>
									))}
								</div>
							</div> */}
						</div>
					)}

					<div className="flex justify-end items-center gap-4">
						{currentStep > 1 && (
							<button
								onClick={handlePrevStep} // Go to the previous step
								className="mt-6 py-2 px-4 bg-gray-400 text-white rounded-sm hover:bg-gray-300 active:bg-gray-500 transition duration-200"
							>
								&lt; Sebelum
							</button>
						)}
						{currentStep < 3 && (
							<button
								onClick={handleNextStep} // Move to the next step
								className="mt-6 py-2 px-4 bg-gray-400 text-white rounded-sm hover:bg-gray-300 active:bg-gray-500 transition duration-200"
							>
								Seterusnya &gt;
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Right Side - Booking Summary */}
			<div className="bg-gray-50 rounded-lg shadow h-[55vh] lg:sticky top-0 overflow-y-clip lg:order-last order-first">
				<div className="p-8">
					<h3 className="text-lg font-bold mb-4">Booking Summary</h3>
					<div className="mb-4">
						<p className="text-gray-600">Umrah {kategori}</p>
						<p className="text-gray-600">
							{tarikh
								? `${tarikh[0].toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "short",
										year: "numeric",
								  })} - ${tarikh[1].toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "short",
										year: "numeric",
								  })}`
								: "Pilih Tarikh"}
						</p>
					</div>
					{/* Calculate total counts */}
					{rooms.length > 0 && (
						<>
							{/* Adult Summary */}
							<div className="flex justify-between mb-2">
								<span>
									Adult x {rooms.reduce((acc, room) => acc + room.adult, 0)}
								</span>
								<span>
									RM{" "}
									{rooms
										.reduce(
											(acc, room) =>
												acc + room.adult * roomPrices[selectedOption]?.adult ||
												0,
											0
										)
										.toFixed(2)}
								</span>
							</div>

							{/* Child With Bed Summary */}
							<div className="flex justify-between mb-2">
								<span>
									Child With Bed x{" "}
									{rooms.reduce((acc, room) => acc + room.childWithBed, 0)}
								</span>
								<span>
									RM{" "}
									{rooms
										.reduce(
											(acc, room) =>
												acc +
													room.childWithBed *
														roomPrices[selectedOption]?.childWithBed || 0,
											0
										)
										.toFixed(2)}
								</span>
							</div>

							{/* Child With Bed Summary */}
							<div className="flex justify-between mb-2">
								<span>
									Child Without Bed x{" "}
									{rooms.reduce((acc, room) => acc + room.childWithoutBed, 0)}
								</span>
								<span>
									RM{" "}
									{rooms
										.reduce(
											(acc, room) =>
												acc +
													room.childWithoutBed *
														roomPrices[selectedOption]?.childWithoutBed || 0,
											0
										)
										.toFixed(2)}
								</span>
							</div>

							{/* Child Without Bed Summary */}
							<div className="flex justify-between mb-2">
								<span>
									Infant x {rooms.reduce((acc, room) => acc + room.infant, 0)}
								</span>
								<span>
									RM{" "}
									{rooms
										.reduce(
											(acc, room) =>
												acc +
													room.infant * roomPrices[selectedOption]?.infant || 0,
											0
										)
										.toFixed(2)}
								</span>
							</div>
						</>
					)}

					{/* Discount */}
					<div className="flex justify-between mb-2">
						<span>Discount</span>
						<span>RM 0</span>
					</div>
					<hr className="my-4" />

					{/* Booking Deposit */}
					<div className="flex justify-between mb-2 font-semibold">
						<span>Booking Deposit</span>
						<span>RM {totalCost.toFixed(2)}</span>
					</div>

					{/* Calculate Gross Total */}
					<div className="flex justify-between mb-2 text-red-500 font-bold">
						<span>GROSS TOTAL</span>
						<span>
							RM{" "}
							{rooms
								.reduce(
									(acc, room) =>
										acc +
										(room.adult * roomPrices[selectedOption]?.adult || 0) +
										(room.childWithBed *
											roomPrices[selectedOption]?.childWithBed || 0) +
										(room.childWithoutBed *
											roomPrices[selectedOption]?.childWithoutBed || 0) +
										(room.infant * roomPrices[selectedOption]?.infant || 0),
									0
								)
								.toFixed(2)}
						</span>
					</div>

					{/* Calculate After Discount */}
					<div className="flex justify-between mb-2 text-red-500 font-bold">
						<span>AFTER DISCOUNT</span>
						<span>
							RM{" "}
							{rooms
								.reduce(
									(acc, room) =>
										acc +
										(room.adult * roomPrices[selectedOption]?.adult || 0) +
										(room.childWithBed *
											roomPrices[selectedOption]?.childWithBed || 0) +
										(room.childWithoutBed *
											roomPrices[selectedOption]?.childWithoutBed || 0) +
										(room.infant * roomPrices[selectedOption]?.infant || 0),
									0
								)
								.toFixed(2)}
						</span>
					</div>

					<button className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-700">
						Proceed to Payment
					</button>
				</div>
			</div>
		</div>
	);
};

export default Main;
