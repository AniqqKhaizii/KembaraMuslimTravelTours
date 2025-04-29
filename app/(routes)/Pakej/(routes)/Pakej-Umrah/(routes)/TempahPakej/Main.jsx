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

	const [selectedOption, setSelectedOption] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);
	const [currentStep, setCurrentStep] = useState(1);

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
		{
			adult: 1,
			childWithBed: 0,
			childWithoutBed: 0,
			infant: 0,
			roomID: 1,
			roomType: "",
		},
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
	const handleRoomTypeChange = (index, roomID, roomType) => {
		const updatedRooms = [...rooms];
		updatedRooms[index].roomID = roomID;
		updatedRooms[index].roomType = roomType;

		// Reset guest counts when room type changes
		updatedRooms[index].adult = 0;
		updatedRooms[index].childWithBed = 0;

		setRooms(updatedRooms);
		handleCardSelect(roomType);
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

	const handleCardSelect = (option) => {
		const formattedOption = option.replace("bilik", "").trim();
		setSelectedOption(formattedOption);

		const newTotalPrice = rooms.reduce((total, room) => {
			const { adult, childWithBed, childWithoutBed, infant } = room;
			const roomPrice = roomPrices[room.roomType];
			if (!roomPrice) {
				console.error("Invalid room type:", room.roomType);
				return total;
			}

			const a = Number(adult) || 0;
			const cwb = Number(childWithBed) || 0;
			const cwob = Number(childWithoutBed) || 0;
			const inf = Number(infant) || 0;

			const roomTotal =
				a * (Number(roomPrice.adult) || 0) +
				cwb * (Number(roomPrice.child) || 0) +
				(cwob > 0 ? Number(roomPrice.childWithoutBed) || 0 : 0) +
				(inf > 0 ? Number(roomPrice.infant) || 0 : 0);
			return total + roomTotal;
		}, 0);

		setTotalPrice(newTotalPrice);
	};

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
			billReturnUrl: `${window.location.origin}/Pakej/Pakej-Umrah/TempahPakej/PaymentReturn`,
			billCallbackUrl: "",
			billExternalReferenceNo: RefNo,
			billTo: maklumatJemaah?.NamaPengguna,
			billEmail: maklumatJemaah?.EmelPengguna,
			billPhone: maklumatJemaah?.TelNoPengguna,
			billSplitPayment: 0,
			billSplitPaymentArgs: "",
			billPaymentChannel: "2",
			billContentEmail: "Terima kasih kerana sudah tempah pakej umrah!",
			billChargeToCustomer: "",
			billExpiryDate: formattedExpiryDate,
			billExpiryDays: 1,
		};

		try {
			const response = await Axios.post(
				"https://dev.toyyibpay.com/index.php/api/createBill",
				new URLSearchParams(billData).toString(),
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
			);

			window.location.href = `https://dev.toyyibpay.com/${response.data[0].BillCode}`;
			return response.data;
		} catch (error) {
			console.error("Error:", error);
			return null;
		}
	};

	return (
		<div className="bg-gray-50">
			<div className="lg:max-w-screen-xl sm:max-w-screen-lg xs:max-w-screen-xl mx-auto sm:px-4 xs:px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 ">
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

					<div className="bg-white border-t border-gray-300 lg:p-6 p-2">
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
													onChange={(value) => {
														const [roomID, roomType] = value.split("|");
														handleRoomTypeChange(index, roomID, roomType);
													}}
												>
													<Select.Option value="">
														Select room type
													</Select.Option>
													<Select.Option value="1|Berdua">
														Bilik Berdua
													</Select.Option>
													<Select.Option value="2|Bertiga">
														Bilik Bertiga
													</Select.Option>
													<Select.Option value="3|Berempat">
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

									<div className="lg:col-span-2 col-span-1 mt-4  p-4 rounded-sm">
										<strong className="text-gray-700 text-lg block mb-2">
											Guests Summary:
										</strong>
										<div className="overflow-x-auto">
											<table className="w-full text-sm text-left text-gray-700">
												<thead className="bg-gray-100 text-gray-800">
													<tr>
														<th className="px-4 py-2">Room</th>
														<th className="px-4 py-2 text-center">Adults</th>
														<th className="px-4 py-2 text-center">
															Child w/ Bed
														</th>
														<th className="px-4 py-2 text-center">
															Child w/o Bed
														</th>
														<th className="px-4 py-2 text-center">Infants</th>
														<th className="px-4 py-2 text-center">Total</th>
													</tr>
												</thead>
												<tbody>
													{rooms.map((room, index) => {
														const total =
															room.adult +
															room.childWithBed +
															room.childWithoutBed +
															room.infant;
														return (
															<tr
																key={index}
																className="border-t border-gray-300"
															>
																<td className="px-4 py-2">
																	Room {index + 1} - {room.roomType}
																</td>
																<td className="px-4 py-2 text-center">
																	{room.adult}
																</td>
																<td className="px-4 py-2 text-center">
																	{room.childWithBed}
																</td>
																<td className="px-4 py-2 text-center">
																	{room.childWithoutBed}
																</td>
																<td className="px-4 py-2 text-center">
																	{room.infant}
																</td>
																<td className="px-4 py-2 font-semibold text-center">
																	{total}
																</td>
															</tr>
														);
													})}
												</tbody>
												<tfoot>
													<tr className="border-t border-gray-300 font-semibold">
														<td className="px-4 py-2">Total</td>
														<td className="px-4 py-2 text-center">
															{rooms.reduce((sum, r) => sum + r.adult, 0)}
														</td>
														<td className="px-4 py-2 text-center">
															{rooms.reduce(
																(sum, r) => sum + r.childWithBed,
																0
															)}
														</td>
														<td className="px-4 py-2 text-center">
															{rooms.reduce(
																(sum, r) => sum + r.childWithoutBed,
																0
															)}
														</td>
														<td className="px-4 py-2 text-center">
															{rooms.reduce((sum, r) => sum + r.infant, 0)}
														</td>
														<td className="px-4 py-2 text-center">
															{rooms.reduce(
																(sum, r) =>
																	sum +
																	r.adult +
																	r.childWithBed +
																	r.childWithoutBed +
																	r.infant,
																0
															)}
														</td>
													</tr>
												</tfoot>
											</table>
										</div>
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
								<h3 className="text-xl mb-4 text-gray-800">
									Maklumat Pengguna
								</h3>
								<form id="user-details" className="space-y-8 bg-white p-6">
									<h2 className="text-xl font-semibold text-gray-800 border-b pb-4">
										Maklumat Pengguna
									</h2>

									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1 px-4">
												Nama Penuh
											</label>
											<input
												type="text"
												name="NamaPengguna"
												placeholder="Contoh: Ali Bin Abu"
												value={maklumatJemaah?.NamaPengguna || ""}
												onChange={(e) =>
													setMaklumatJemaah((prev) => ({
														...prev,
														NamaPengguna: e.target.value,
													}))
												}
												className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
												required
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1 px-4">
												No Kad Pengenalan
											</label>
											<input
												type="text"
												name="ICPengguna"
												placeholder="Contoh: 910101-01-1234"
												value={maklumatJemaah?.ICPengguna || ""}
												onChange={(e) =>
													setMaklumatJemaah((prev) => ({
														...prev,
														ICPengguna: e.target.value,
													}))
												}
												className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
												required
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1 px-4">
												Emel
											</label>
											<input
												type="email"
												name="EmelPengguna"
												placeholder="Contoh: ali@email.com"
												value={maklumatJemaah?.EmelPengguna || ""}
												onChange={(e) =>
													setMaklumatJemaah((prev) => ({
														...prev,
														EmelPengguna: e.target.value,
													}))
												}
												className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
												required
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1 px-4">
												No Telefon
											</label>
											<input
												type="tel"
												name="TelNoPengguna"
												placeholder="Contoh: 012-3456789"
												value={maklumatJemaah?.TelNoPengguna || ""}
												onChange={(e) =>
													setMaklumatJemaah((prev) => ({
														...prev,
														TelNoPengguna: e.target.value,
													}))
												}
												className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
												required
											/>
										</div>

										{/* New Alamat field */}
										<div className="lg:col-span-2">
											<label className="block text-sm font-medium text-gray-700 mb-1 px-4">
												Alamat
											</label>
											<textarea
												name="AlamatPengguna"
												placeholder="Contoh: No. 1, Jalan Mawar, Taman Melati, 53100 Kuala Lumpur"
												value={maklumatJemaah?.AlamatPengguna || ""}
												onChange={(e) =>
													setMaklumatJemaah((prev) => ({
														...prev,
														AlamatPengguna: e.target.value,
													}))
												}
												rows={3}
												className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2"
												required
											></textarea>
										</div>
									</div>

									{/* Guests Info per Room */}
									{rooms.map((room, index) => {
										const totalGuests =
											room.adult +
											room.childWithBed +
											room.childWithoutBed +
											room.infant;

										return (
											<div key={index} className="border-t pt-6">
												<h3 className="text-lg font-semibold text-green-700 mb-4">
													Bilik {index + 1} - {room.roomType}
												</h3>

												<div className="space-y-4">
													{[...Array(totalGuests)].map((_, i) => (
														<div
															key={`guest-${index}-${i}`}
															className="grid grid-cols-1 md:grid-cols-2 gap-4"
														>
															<div>
																<label className="block text-sm font-medium text-gray-700 mb-1 px-4">
																	Nama Jemaah {i + 1}
																</label>
																<input
																	type="text"
																	name={`NamaJemaah${i + 1} - Bilik ${
																		index + 1
																	}`}
																	placeholder="Contoh: Ali Bin Abu"
																	value={
																		maklumatJemaah?.[
																			`NamaJemaah${i + 1} - Bilik ${index + 1}`
																		] || ""
																	}
																	onChange={(e) =>
																		setMaklumatJemaah((prev) => ({
																			...prev,
																			[`NamaJemaah${i + 1} - Bilik ${
																				index + 1
																			}`]: e.target.value,
																		}))
																	}
																	className="w-full border-gray-300 rounded-md shadow-sm  px-4 py-2"
																	required
																/>
															</div>

															<div>
																<label className="block text-sm font-medium text-gray-700 mb-1 px-4">
																	No Kad Pengenalan Jemaah {i + 1}
																</label>
																<input
																	type="text"
																	name={`ICTetamu${i + 1} - Bilik ${index + 1}`}
																	placeholder="Contoh: 910101-01-1234"
																	value={
																		maklumatJemaah?.[
																			`ICJemaah${i + 1} - Bilik ${index + 1}`
																		] || ""
																	}
																	onChange={(e) => {
																		const formattedValue = formatICNumber(
																			e.target.value
																		);
																		setMaklumatJemaah((prev) => ({
																			...prev,
																			[`ICJemaah${i + 1} - Bilik ${index + 1}`]:
																				formattedValue,
																		}));
																	}}
																	onBlur={(e) => {
																		const value = e.target.value;
																		if (value && !isValidMalaysianIC(value)) {
																			alert(
																				"Invalid Malaysian IC format or details!"
																			);
																			setMaklumatJemaah((prev) => ({
																				...prev,
																				[`ICJemaah${i + 1} - Bilik ${
																					index + 1
																				}`]: "",
																			}));
																		}
																	}}
																	className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 px-4 py-2"
																	required
																/>
															</div>
														</div>
													))}
												</div>
											</div>
										);
									})}
								</form>
							</div>
						)}

						{currentStep === 3 && (
							<div id="summary-overview" className="p-2">
								<h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
									Trip Summary
								</h3>

								{/* Pax and Room Type Summary */}
								<div className="mb-4">
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
													: ""}
											</span>
										</div>
									</div>
								</div>

								{/* User Details Summary */}
								<div className="mb-8">
									<h3 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-4">
										📋 Maklumat Pengguna
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
										<p>
											<span className="font-semibold">Nama:</span>{" "}
											{maklumatJemaah?.NamaPengguna}
										</p>
										<p>
											<span className="font-semibold">No Kad Pengenalan:</span>{" "}
											{maklumatJemaah?.ICPengguna}
										</p>
										<p>
											<span className="font-semibold">Emel:</span>{" "}
											{maklumatJemaah?.EmelPengguna}
										</p>
										<p>
											<span className="font-semibold">No Telefon:</span>{" "}
											{maklumatJemaah?.TelNoPengguna}
										</p>
										<p className="md:col-span-2">
											<span className="font-semibold">Alamat:</span>{" "}
											{maklumatJemaah?.AlamatPengguna}
										</p>
									</div>
								</div>

								{/* Room & Guests Summary */}
								<div>
									<h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
										🛏️ Maklumat Bilik & Jemaah
									</h3>

									{rooms.map((room, index) => {
										const totalGuests =
											room.adult +
											room.childWithBed +
											room.childWithoutBed +
											room.infant;

										return (
											<div key={index} className="mb-8">
												<h4 className="text-md font-semibold text-gray-700 mb-2">
													Bilik {index + 1} - {room.roomType}
												</h4>

												<div className="overflow-x-auto">
													<table className="min-w-full border border-gray-300 bg-white shadow-sm">
														<thead className="bg-gray-100 text-gray-700 text-sm">
															<tr>
																<th className="border px-4 py-2 text-left"></th>
																<th className="border px-4 py-2 text-left">
																	Nama Jemaah
																</th>
																<th className="border px-4 py-2 text-left">
																	No Kad Pengenalan
																</th>
															</tr>
														</thead>
														<tbody className="text-sm text-gray-800">
															{[...Array(totalGuests)].map((_, i) => (
																<tr
																	key={`summary-guest-${index}-${i}`}
																	className="hover:bg-gray-50"
																>
																	<td className="border px-4 py-2">
																		Jemaah {i + 1}
																	</td>
																	<td className="border px-4 py-2">
																		{maklumatJemaah?.[
																			`NamaJemaah${i + 1} - Bilik ${index + 1}`
																		] || "N/A"}
																	</td>
																	<td className="border px-4 py-2">
																		{maklumatJemaah?.[
																			`ICJemaah${i + 1} - Bilik ${index + 1}`
																		] || "N/A"}
																	</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</div>
										);
									})}
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
							</div>
						)}

						<div className="flex justify-end items-center gap-4">
							{currentStep > 1 && (
								<button
									onClick={handlePrevStep} // Go to the previous step
									className="py-2 px-4 bg-gray-400 text-white rounded-sm hover:bg-gray-300 active:bg-gray-500 transition duration-200"
								>
									&lt; Sebelum
								</button>
							)}
							{currentStep < 3 && (
								<button
									onClick={handleNextStep} // Move to the next step
									className="py-2 px-4 bg-gray-400 text-white rounded-sm hover:bg-gray-300 active:bg-gray-500 transition duration-200"
								>
									Seterusnya &gt;
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Right Side - Booking Summary */}
				<div className="bg-white shadow-sm h-[55vh] lg:sticky top-0 overflow-y-clip lg:order-last order-first border-t-8 border-orange-500">
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
									: ""}
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
													acc +
														room.adult * roomPrices[selectedOption]?.adult || 0,
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
														room.infant * roomPrices[selectedOption]?.infant ||
													0,
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
								{/* {rooms
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
									.toFixed(2)} */}
								{totalPrice.toFixed(2)}
							</span>
						</div>

						{/* Calculate After Discount */}
						<div className="flex justify-between mb-2 text-red-500 font-bold">
							<span>AFTER DISCOUNT</span>
							<span>
								RM{" "}
								{/* {rooms
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
									.toFixed(2)} */}
								{totalPrice.toFixed(2)}
							</span>
						</div>

						<button
							onClick={handlePayment}
							className="w-full bg-orange-500 text-white py-2 rounded mt-4 hover:bg-red-700"
						>
							Proceed to Payment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
