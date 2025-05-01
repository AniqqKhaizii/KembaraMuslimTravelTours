"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Form, message, Input, Select, Button } from "antd";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Loading from "@/app/loading";
import Image from "next/image";
const CreateBookingPage = () => {
	const [packageData, setPackageData] = useState(null);
	const [tripDetails, setTripDetails] = useState([]);
	const [loading, setLoading] = useState(true);
	const [updatedPoster, setUpdatedPoster] = useState(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const pkgId = searchParams.get("pkgId");
	const tripId = searchParams.get("tripId");
	const [form] = Form.useForm();
	const [roomPrices, setRoomPrices] = useState({});
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
	const [bookingID, setBookingID] = useState(null);
	const [maklumatJemaah, setMaklumatJemaah] = useState({});
	const [custDetails, setCustDetails] = useState({});
	const [guestName, setGuestName] = useState(
		document.getElementById("NamaJemaah1 - Bilik 1")?.value
	);
	const [icNumber, setIcNumber] = useState(
		document.getElementById("ICJemaah1 - Bilik 1")?.value
	);

	const [selectedOption, setSelectedOption] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);

	const roomCapacity = {
		Berdua: 2,
		Bertiga: 3,
		Berempat: 4,
	};

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

	const handleRemoveRoomOption = (index) => {
		const updatedRooms = rooms.filter((_, i) => i !== index);
		setRooms(updatedRooms);
	};

	const handleRoomTypeChange = (index, roomID, roomType) => {
		const updatedRooms = [...rooms];
		updatedRooms[index].roomID = roomID;
		updatedRooms[index].roomType = roomType;
		updatedRooms[index].adult = 1;
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

	useEffect(() => {
		if (!pkgId || !tripId) {
			// If router is not ready or pkg ID is not in the URL, show error and redirect
			message.error("No package or trip ID found in URL");
			router.push("/admin/packages");
			return;
		}

		const fetchPackageDetails = async () => {
			try {
				setLoading(true);

				const { data } = await axios.get(
					`/api/Tetapan/ManagePackage?Operation=SEARCH&TripUnique=Y&PakejID=${pkgId}`
				);

				// Check if pkg data exists
				if (data && data.length > 0) {
					const pkg = data[0];
					setPackageData(pkg);
					setRoomPrices({
						Berdua: {
							adult: pkg.Adult_Double,
							childWithBed: pkg.ChildWBed_Double,
							childWithoutBed: pkg.ChildNoBed_Double,
							infant: pkg.Infant_Double,
						},
						Bertiga: {
							adult: pkg.Adult_Triple,
							childWithBed: pkg.ChildWBed_Triple,
							childWithoutBed: pkg.ChildNoBed_Triple,
							infant: pkg.Infant_Triple,
						},
						Berempat: {
							adult: pkg.Adult_Quad,
							childWithBed: pkg.ChildWBed_Quad,
							childWithoutBed: pkg.ChildNoBed_Quad,
							infant: pkg.Infant_Quad,
						},
					});
					console.log("pkg.PakejPoster", pkg.PakejPoster.data);
					if (pkg.PakejPoster && Array.isArray(pkg.PakejPoster.data)) {
						const base64String = Buffer.from(pkg.PakejPoster.data).toString(
							"base64"
						);
						console.log("base64String", base64String);
						pkg.PakejPoster = `data:image/jpeg;base64,${base64String}`;
						setUpdatedPoster(pkg.PakejPoster);
					} else if (
						typeof pkg.PakejPoster === "string" &&
						pkg.PakejPoster.startsWith("data:image/jpeg;base64,")
					) {
						setUpdatedPoster(pkg.PakejPoster);
					}

					const tripResponse = await axios.get(
						`/api/Tetapan/ManageTrip?Operation=SEARCH&TripID=${tripId}`
					);
					setTripDetails(tripResponse.data[0] || {});

					const pakejName = pkg.PakejName.split(" ")[0].toUpperCase();
					const date = new Date();
					const yy = String(date.getFullYear()).slice(-2);
					const mm = String(date.getMonth() + 1).padStart(2, "0");
					const dd = String(date.getDate()).padStart(2, "0");
					const rand4 = Math.floor(1000 + Math.random() * 9000);

					const bookingID = `${pakejName}${yy}${mm}${dd}${rand4}-${tripResponse.data[0].TripID}`;
					setBookingID(bookingID);
				} else {
					message.error("Package not found");
				}
			} catch (error) {
				console.error("Error fetching pkg details:", error);
				message.error("Failed to fetch pkg details");
			} finally {
				setLoading(false);
			}
		};

		fetchPackageDetails();
	}, [pkgId, tripId]);

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
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
		];
		if (!validStateCodes.includes(stateCode)) return false;

		return true;
	};

	if (loading) {
		return <Loading />;
	}

	if (!packageData) {
		return <div>Package data not available</div>;
	}

	const airlineLogos = {
		Emirates: "/flight/Emirates.svg",
		AirAsia: "/flight/AirAsia.svg",
	};

	const handleProceed = async () => {
		console.log("This is happened when proceeding");

		const Pax = rooms.reduce(
			(summary, room) => {
				summary.Adult += room.adult;
				summary.ChildWithBed += room.childWithBed;
				summary.ChildWithoutBed += room.childWithoutBed;
				summary.Infant += room.infant;
				return summary;
			},
			{ Adult: 0, ChildWithBed: 0, ChildWithoutBed: 0, Infant: 0 }
		);

		const totalPax =
			Pax.Adult + Pax.ChildWithBed + Pax.ChildWithoutBed + Pax.Infant;

		const jemaahList = [];
		Object.keys(maklumatJemaah).forEach((key) => {
			if (key.startsWith("Nama")) {
				const name = maklumatJemaah[key];
				const icKey = key.replace("Nama", "IC");
				const ic = maklumatJemaah[icKey];

				const match = key.match(/Bilik (\d+)/);
				const roomIndex = match ? parseInt(match[1], 10) - 1 : 0;
				const roomID = rooms[roomIndex]?.roomID || 0;

				jemaahList.push({
					ICNumber: ic,
					FullName: name,
					RoomID: roomID,
				});
			}
		});
		const AddOnCustDetails = JSON.stringify(jemaahList);

		const bookingData = {
			p_Operation: "ADD_NEW",
			p_BookID: bookingID,
			p_CustName: custDetails.name,
			p_CustID: custDetails.ic,
			p_CustEmail: custDetails.email,
			p_CustAddress: custDetails.address,
			p_CustPhone: custDetails.phone,
			p_PakejID: packageData.PakejID,
			p_TripID: tripDetails.TripID,
			p_Pax: JSON.stringify(Pax),
			p_TotalPax: totalPax,
			p_Discount: 0,
			p_DepoAmt: 0,
			p_BalancePayment: totalPrice,
			p_TotalAmt: totalPrice,
			p_Status: "Locked",
			p_BookDate: null,
			p_PaidDate: null,
			p_BillCode: null,
			p_OrderID: null,
			p_TransactionID: null,
			p_AddOnCustDetails: AddOnCustDetails,
			p_ReferralCode: null,
		};

		try {
			const response = await axios.post("/api/Booking", bookingData, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result = response;
			if (result.status === 200) {
				message.success("Booking created successfully");

				setTimeout(() => {
					router.push("/Admin/Booking/Details?BookID=" + result.data.o_BookID);
				}, 3000); // 3000 milliseconds = 3 seconds
			}
		} catch (error) {
			console.error("Error posting booking:", error);
		}
	};

	return (
		<div className="min-h-screen bg-[url(/Hero/HeroLatest.jpg)] bg-fixed bg-cover">
			<div className="backdrop-blur backdrop-brightness-75 py-12">
				{updatedPoster && (
					<div className="w-full max-w-5xl mx-auto">
						<img
							className="w-full h-[50vh] object-cover object-top rounded-t-lg"
							src={updatedPoster}
							alt="Package Poster"
						/>
					</div>
				)}
				<div className="max-w-5xl mx-auto p-6 bg-white rounded-b-lg">
					<div className="pkg-details mb-6 pb-2 border-b-2 border-gray-200">
						<div className="flex items-center justify-between">
							<p className="text-3xl font-semibold text-gray-900">
								Pakej Umrah {packageData.PakejName}
							</p>
							<Image
								src={airlineLogos[tripDetails.Airline]}
								alt="Airline Logo"
								className="w-12 h-auto"
								width={0}
								height={0}
							/>
						</div>
					</div>

					<div className="trip-details mb-8">
						<h2 className="text-2xl font-semibold text-gray-700">
							Trip Information
						</h2>
						{tripDetails ? (
							<div className="border-b border-gray-200 py-2">
								<div className="flex items-center justify-between text-lg text-gray-600">
									<strong className="font-medium text-gray-800">
										Destination :
									</strong>{" "}
									{tripDetails.TripName}
								</div>
								<div className="flex items-center justify-between text-lg text-gray-600">
									<strong className="font-medium text-gray-800">
										Travel Date :
									</strong>{" "}
									{new Date(tripDetails.EndTravelDate).toLocaleDateString(
										"en-GB",
										{
											day: "2-digit",
											month: "short",
											year: "numeric",
										}
									)}{" "}
									-{" "}
									{new Date(tripDetails.StartTravelDate).toLocaleDateString(
										"en-GB",
										{
											day: "2-digit",
											month: "short",
											year: "numeric",
										}
									)}
								</div>
								<div className="flex items-center justify-between text-lg text-gray-600">
									<strong className="font-medium text-gray-800">
										Duration :
									</strong>{" "}
									{tripDetails.Duration} days
								</div>
								<div className="flex items-center justify-between text-lg text-gray-600">
									<strong className="font-medium text-gray-800">
										Flight Details :
									</strong>{" "}
									{tripDetails.FlightDetails}
								</div>
								<div className="flex items-center justify-between text-lg text-gray-600">
									<strong className="font-medium text-gray-800">
										Seat Available :
									</strong>{" "}
									{tripDetails.SeatBalance} Seats
								</div>
							</div>
						) : (
							<p className="text-lg text-gray-600">
								No trip details available.
							</p>
						)}
					</div>

					<div className="cust-details mb-8">
						<h2 className="text-2xl font-semibold text-gray-700">
							Customer Information
						</h2>
						<div className="border-b border-gray-200 py-2">
							<Form
								form={form}
								layout="vertical"
								onValuesChange={() => {
									setCustDetails(form.getFieldsValue());
									document.getElementById("NamaJemaah1 - Bilik 1").value =
										custDetails.name;
									document.getElementById("ICJemaah1 - Bilik 1").value =
										custDetails.ic;
								}}
							>
								<Form.Item
									name="name"
									label="Name"
									rules={[
										{ required: true, message: "Please input your name!" },
									]}
								>
									<Input placeholder="Enter your name" />
								</Form.Item>
								<Form.Item
									name="ic"
									label="IC Number"
									rules={[
										{ required: true, message: "Please input your IC Number" },
									]}
									onChange={(e) => {
										const value = e.target.value;
										const formattedValue = formatICNumber(value);
										form.setFieldsValue({ ic: formattedValue });
									}}
								>
									<Input placeholder="Enter your email" />
								</Form.Item>
								<Form.Item
									name="email"
									label="Email"
									rules={[
										{ required: true, message: "Please input your email!" },
										{ type: "email", message: "Please enter a valid email!" },
									]}
								>
									<Input placeholder="Enter your email" />
								</Form.Item>
								<Form.Item
									name="phone"
									label="Phone"
									rules={[
										{
											required: true,
											message: "Please input your phone number!",
										},
									]}
								>
									<Input placeholder="Enter your phone number" />
								</Form.Item>
								<Form.Item
									name="address"
									label="Address"
									rules={[
										{ required: true, message: "Please input your address!" },
									]}
								>
									<Input placeholder="Enter your address" />
								</Form.Item>
							</Form>
						</div>
					</div>

					<div className="jemaah-details mb-8">
						<h2 className="text-2xl font-semibold text-gray-700">
							Jemaah Information
						</h2>
						<div
							id="tour-overview"
							className="grid lg:grid-cols-2 grid-cols-1 gap-4 "
						>
							{rooms.map((room, index) => {
								const totalGuests =
									room.adult +
									room.childWithBed +
									room.childWithoutBed +
									room.infant;
								return (
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
												<Select.Option value="">Select room type</Select.Option>
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

										<div className="space-y-4 border-t border-gray-300 py-4">
											{[...Array(totalGuests)].map((_, i) => {
												return (
													<div
														key={`guest-${index}-${i}`}
														className="relative grid grid-cols-1 md:grid-cols-2 gap-4"
													>
														<div>
															<label className="block text-sm font-medium text-gray-700 mb-1">
																Nama Jemaah {i + 1}
															</label>
															<input
																type="text"
																id={`NamaJemaah${i + 1} - Bilik ${index + 1}`}
																name={`NamaJemaah${i + 1} - Bilik ${index + 1}`}
																placeholder="Contoh: Ali Bin Abu"
																value={
																	maklumatJemaah?.[
																		`NamaJemaah${i + 1} - Bilik ${index + 1}`
																	] || ""
																}
																onChange={(e) => {
																	setMaklumatJemaah((prev) => ({
																		...prev,
																		[`NamaJemaah${i + 1} - Bilik ${index + 1}`]:
																			e.target.value,
																	}));
																	setGuestName(e.target.value);
																}}
																className="w-full border-gray-300 rounded-md shadow-sm p-2"
																required
															/>
														</div>

														<div>
															<label className="block text-sm font-medium text-gray-700 mb-1">
																No IC Jemaah {i + 1}
															</label>
															<input
																type="text"
																id={`ICJemaah${i + 1} - Bilik ${index + 1}`}
																name={`ICJemaah${i + 1} - Bilik ${index + 1}`}
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
																	setIcNumber(formattedValue);
																}}
																onBlur={(e) => {
																	const value = e.target.value;
																	if (value && !isValidMalaysianIC(value)) {
																		alert(
																			"Invalid Malaysian IC format or details!"
																		);
																		setMaklumatJemaah((prev) => ({
																			...prev,
																			[`ICJemaah${i + 1} - Bilik ${index + 1}`]:
																				"",
																		}));
																	}
																}}
																className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 p-2"
																required
															/>
														</div>

														{!guestName &&
															!icNumber &&
															custDetails.name &&
															custDetails.ic && (
																<button
																	type="button"
																	className="absolute top-0 right-0 text-red-500"
																	onClick={() => {
																		setMaklumatJemaah((prev) => ({
																			...prev,
																			[`NamaJemaah${i + 1} - Bilik ${
																				index + 1
																			}`]: custDetails.name,
																			[`ICJemaah${i + 1} - Bilik ${index + 1}`]:
																				custDetails.ic,
																		}));
																		setGuestName(custDetails.name);
																		setIcNumber(custDetails.ic);
																	}}
																>
																	<CiCirclePlus size={20} />
																</button>
															)}
													</div>
												);
											})}
										</div>
									</div>
								);
							})}

							<div className="lg:col-span-2 col-span-1 rounded-sm">
								<strong className="text-gray-700 text-lg block mb-2">
									Guests Summary:
								</strong>
								<div className="overflow-x-auto">
									<table className="w-full text-sm text-left text-gray-700">
										<thead className="bg-gray-100 text-gray-800">
											<tr>
												<th className="px-4 py-2">Room</th>
												<th className="px-4 py-2 text-center">Adults</th>
												<th className="px-4 py-2 text-center">Child w/ Bed</th>
												<th className="px-4 py-2 text-center">Child w/o Bed</th>
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
													<tr key={index} className="border-t border-gray-300">
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
													{rooms.reduce((sum, r) => sum + r.childWithBed, 0)}
												</td>
												<td className="px-4 py-2 text-center">
													{rooms.reduce((sum, r) => sum + r.childWithoutBed, 0)}
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

							<div className="m-4">
								<button
									className="px-4 py-2 border border-blue-500 text-blue-500 rounded-sm hover:bg-blue-500 hover:text-white"
									onClick={handleAddRoomOption}
								>
									Add Room Option +
								</button>
							</div>
						</div>
					</div>

					<div className="terms-and-conditions mb-4 px-4 font-primary">
						<h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
						<ol className="list-decimal pl-6 mb-4 text-sm">
							<li>
								<p className="ml-4 mb-4">
									Deposits are non-refundable except in the following
									situations:
								</p>
								<ol className="list-decimal pl-8 mb-4">
									<li>
										If the group is unable to depart due to the inability to
										meet the minimum departure requirements for flight tickets,
										the company will advise the customer on the next available
										date.
									</li>
								</ol>
							</li>

							<li>
								<p className="ml-4 mb-4">
									KEMBARA MUSLIM TRAVEL & TOURS SDN BHD is a travel company that
									books tours on behalf of clients for airlines and ground
									providers. We are bound by the reservation policies set by
									airlines and ground providers. We have no control over:
								</p>
								<ol className="list-decimal pl-8 mb-4">
									<li>Flight details or types, which may change.</li>
									<li>
										Ground arrangements (itineraries), which may change
										according to situations such as weather.
									</li>
								</ol>
							</li>

							<li>
								<p className="ml-4 mb-4">
									In case of tour cancellation due to an outbreak, government
									decision, COVID-19, or similar cases, refunds will not be
									entertained. Only postponement will be allowed (after
									deducting penalties or any other related costs), and the new
									travel dates will be provided by KEMBARA MUSLIM TRAVEL & TOURS
									SDN BHD. This includes:
								</p>
								<ol className="list-decimal pl-8 mb-4">
									<li>
										Testing positive 72 hours before travel or being a close
										contact.
									</li>
									<li>Being unable to travel due to a quarantine period.</li>
									<li>
										Making a personal decision not to travel due to a
										pandemic/outbreak.
									</li>
								</ol>
							</li>

							<li>
								<p className="ml-4 mb-4">
									Customers are responsible for any additional costs that occur
									during the travel period. We strongly advise customers to
									purchase insurance (we provide insurance services at an
									additional cost).
								</p>
							</li>

							<li>
								<p className="ml-4 mb-4">
									The company tries to open and block dates based on the best
									possible weather 6-12 months before the departure date. In the
									event of unexpected weather, we might have to change the
									itineraries based on the best available options advised by the
									local outbound tour operation.
								</p>
							</li>

							<li>
								<p className="ml-4 mb-4">
									Customers are responsible for ensuring their own travel
									documents are prepared, such as:
								</p>
								<ol className="list-decimal pl-8 mb-4">
									<li>Insurance</li>
									<li>
										A passport with validity of more than 6 months during the
										travel date
									</li>
									<li>Visa requirements based on the customer's nationality</li>
									<li>
										Compliance with LHDN requirements to clear pending payments
										(if any)
									</li>
								</ol>
							</li>

							<li>
								<p className="ml-4 mb-4">
									These are additional terms to the existing travel terms by
									KEMBARA MUSLIM TRAVEL & TOURS SDN BHD. Booking this package
									means the customer is fully aware of and agrees to KEMBARA
									MUSLIM TRAVEL & TOURS SDN BHD's terms and conditions.
								</p>
							</li>
						</ol>
						<p className="ml-4 mb-4 text-sm">
							By completing and submitting this form, I hereby confirm that I
							have read points 1 to 7 and agree to the terms & conditions stated
							on behalf of my travel members under my booking (invoice).
						</p>
						<div className="flex items-center justify-end">
							<Input type="checkbox" className="w-3 h-3 mr-2" />
							<span className="text-sm text-gray-500">
								I agree to the terms & conditions
							</span>
						</div>
					</div>
				</div>

				<div className="my-2 max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
					<Button onClick={handleProceed}>Lock Seat</Button>
				</div>
			</div>
		</div>
	);
};

export default CreateBookingPage;
