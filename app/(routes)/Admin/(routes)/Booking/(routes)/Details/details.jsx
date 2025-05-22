"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, message, Select, Table } from "antd";
import AdminLayout from "../../../../layout/AdminLayout";
import dayjs from "dayjs"; // to format dates
import relativeTime from "dayjs/plugin/relativeTime"; // Optional for relative time
import advancedFormat from "dayjs/plugin/advancedFormat";
import axios from "axios";
import { RoomDetail } from "../../../../../../../lib/constants";
import { ArrowLeftCircleIcon } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

const BookingDetails = ({
	CombinedAddOnCustDetails,
	editMode,
	setBookData,
}) => {
	const getRoomDetails = (roomID) => {
		const room = RoomDetail.find((room) => room.RoomID === roomID);
		return room ? room.RoomDesc : "Unknown Room";
	};

	const updateField = (field, value, index) => {
		const [name, ic, roomID] =
			CombinedAddOnCustDetails[index].AddOnCustDetails.split(",");
		const updatedDetails = [...CombinedAddOnCustDetails];

		if (field === "name")
			updatedDetails[index].AddOnCustDetails = `${value},${ic},${roomID}`;
		else if (field === "ic")
			updatedDetails[index].AddOnCustDetails = `${name},${value},${roomID}`;
		else if (field === "roomID")
			updatedDetails[index].AddOnCustDetails = `${name},${ic},${value}`;

		setBookData((prev) => ({
			...prev,
			AddOnCustDetails: updatedDetails,
		}));
	};

	const addNewJemaah = () => {
		const updatedDetails = [...CombinedAddOnCustDetails, { BookID: "" }];
		/* TODO : Add new jemaah details here */
		console.log("updatedDetails", updatedDetails);
		setBookData((prev) => ({
			...prev,
			AddOnCustDetails: updatedDetails,
		}));
	};

	const deleteJemaah = (index) => {
		const updatedDetails = CombinedAddOnCustDetails.filter(
			(_, i) => i !== index
		);
		setBookData((prev) => ({
			...prev,
			AddOnCustDetails: updatedDetails,
		}));
	};

	return (
		<>
			<table className="table-auto w-full border dark:border-white/40 border-gray-400/50 rounded-lg">
				<thead>
					<tr className="uppercase text-sm leading-normal border-b dark:border-white/40 border-gray-400/50">
						<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
							Name
						</th>
						<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
							IC Number
						</th>
						<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
							Room Type
						</th>
						{editMode && (
							<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
								Action
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{/* Loop through the CombinedAddOnCustDetails */}
					{CombinedAddOnCustDetails.map((customer, index) => {
						const [name, ic, roomID] = customer.AddOnCustDetails?.split(",");
						const roomDesc = getRoomDetails(Number(roomID));

						return (
							<tr key={index} className="odd:bg-white/10">
								<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
									{editMode ? (
										<Input
											type="text"
											name="name"
											className="glass-input"
											onChange={(e) =>
												updateField("name", e.target.value, index)
											}
											defaultValue={name}
										/>
									) : (
										name
									)}
								</td>
								<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
									{editMode ? (
										<Input
											type="text"
											name="ic"
											className="glass-input"
											onChange={(e) => updateField("ic", e.target.value, index)}
											defaultValue={ic}
										/>
									) : (
										ic
									)}
								</td>
								<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
									{editMode ? (
										<Select
											name="roomID"
											className="glass-select w-full"
											popupClassName="glass-select-dropdown"
											value={getRoomDetails(Number(roomID))}
											defaultValue={getRoomDetails(Number(roomID))}
											onChange={(e) =>
												updateField("roomID", e.target.value, index)
											}
										>
											{RoomDetail.map((room) => (
												<Option key={room.RoomID} value={room.RoomID}>
													{room.RoomDesc}
												</Option>
											))}
										</Select>
									) : (
										roomDesc
									)}
								</td>
								{editMode && (
									<td className="px-4 py-2 text-center" width={"5%"}>
										<button
											onClick={() => deleteJemaah(index)}
											className="text-zinc-950 dark:text-white bg-red-500 px-4 py-1 rounded-md text-sm"
										>
											Delete
										</button>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
			{editMode && (
				<div className="mt-4">
					<button
						onClick={addNewJemaah}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
					>
						+ Add Jemaah
					</button>
				</div>
			)}
		</>
	);
};

const Details = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("BookID");
	const [loading, setLoading] = useState(false);
	const [bookData, setBookData] = useState(null);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		const fetchPackageDetails = async () => {
			try {
				setLoading(true);

				// Fetch package details
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

	return (
		<>
			<AdminLayout>
				{bookData && (
					<div className="m-4 border-2 dark:border-gray-100/30 border-gray-400/50 rounded-lg backdrop-blur-md p-8 dark:text-white text-zinc-950">
						<div className="flex justify-between w-full border-b dark:border-gray-200/30 border-gray-400/50">
							<h1 className="text-2xl font-semibold pb-4">
								Booking ID : {bookData[0].BookID}
							</h1>
							<div className="flex items-center gap-2">
								<Button
									onClick={() =>
										window
											.open(`/Admin/Booking/Invoice?BookID=${id}`, "_blank")
											.focus()
									}
									className="px-6 py-2 dark:bg-gray-500 bg-black/10 dark:text-white text-zinc-950 rounded-3xl"
								>
									Generate Invoice
								</Button>
								{bookData[0].Status !== "Paid" && (
									<>
										<Button
											onClick={() => setEditMode(!editMode)}
											className="px-6 py-2 dark:bg-gray-500 bg-black/10 dark:text-white text-zinc-950 rounded-3xl"
										>
											Edit
										</Button>
										<Button
											onClick={null}
											className="px-6 py-2 dark:bg-gray-500 bg-black/10 dark:text-white text-zinc-950 rounded-3xl"
										>
											Pay
										</Button>
									</>
								)}
							</div>
						</div>

						<div className="mt-4 grid lg:grid-cols-2 sm:grid-cols-1 gap-6 col-span-2">
							<div className="flex flex-col gap-2 bg-white/10 rounded-lg p-4">
								<div className="flex justify-between border-b dark:border-gray-200/30 border-gray-400/50  pb-2">
									<div className="flex items-center gap-1">
										<h1 className="text-lg font-semibold">Booking Details</h1>
										<span
											className={`text-sm px-4 h-5 flex text-white items-center rounded-full border dark:border-gray-200/30 border-gray-400/50 ${
												bookData[0].Status === "Paid"
													? "bg-green-500"
													: bookData[0].Status === "Locked"
													? "bg-blue-500"
													: "bg-red-500"
											}`}
										>
											{bookData[0].Status}
										</span>
									</div>

									<button
										onClick={() => router.push("/Admin/Booking")}
										className="flex items-center gap-2 px-2 bg-transparent hover:scale-105 transition-all duration-300 dark:text-white text-zinc-950"
									>
										<ArrowLeftCircleIcon />
										Back to List
									</button>
								</div>
								<div className="overflow-x-auto">
									<table className="table-auto w-full">
										<tbody>
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">Booking Date:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													{dayjs(bookData[0].BookDate).format(
														"DD MMM YYYY hh:mm:ss A"
													)}
												</td>
											</tr>
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">Total Price:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													RM{" "}
													{parseFloat(bookData[0].TotalAmt).toLocaleString(
														undefined,
														{
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														}
													)}
												</td>
											</tr>
											{/* Deposit Amount */}
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">Deposit Amount:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													RM{" "}
													{parseFloat(bookData[0].DepoAmt).toLocaleString(
														undefined,
														{
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														}
													)}
												</td>
											</tr>
											{/* Balance Amount - conditional rendering */}
											{bookData[0].BalancePayment > 0 && (
												<tr>
													<td className="text-sm font-normal px-4 py-2">
														<span className="font-semibold">
															Balance Amount:
														</span>
													</td>
													<td className="text-sm font-normal px-4 py-2">
														RM{" "}
														{parseFloat(
															bookData[0].BalancePayment
														).toLocaleString(undefined, {
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														})}
													</td>
												</tr>
											)}
											{/* ------------------------------------- */}
											{/* Customer Details */}
											<tr>
												<td
													colSpan="2"
													className="border-t dark:border-gray-100/20 border-gray-400/50 px-4 py-2"
												>
													<p className="font-normal dark:text-white text-zinc-950">
														Customer Details
													</p>
												</td>
											</tr>
											{/* Customer Name */}
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">Name:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													{editMode ? (
														<Input
															className="glass-input"
															type="text"
															value={bookData[0].CustName}
															onChange={(e) =>
																setBookData([
																	{
																		...bookData[0],
																		CustName: e.target.value,
																	},
																])
															}
														/>
													) : (
														<>{bookData[0].CustName}</>
													)}
												</td>
											</tr>
											{/* Customer Email */}
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">Email:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													{editMode ? (
														<Input
															className="glass-input"
															type="email"
															value={bookData[0].CustEmail}
															onChange={(e) =>
																setBookData([
																	{
																		...bookData[0],
																		CustEmail: e.target.value,
																	},
																])
															}
														/>
													) : (
														<>{bookData[0].CustEmail}</>
													)}
												</td>
											</tr>
											{/* Customer Phone */}
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">Phone:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													{editMode ? (
														<Input
															className="glass-input"
															type="text"
															value={bookData[0].CustPhone}
															onChange={(e) =>
																setBookData([
																	{
																		...bookData[0],
																		CustPhone: e.target.value,
																	},
																])
															}
														/>
													) : (
														<>{bookData[0].CustPhone}</>
													)}
												</td>
											</tr>
											{/* Customer IC */}
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">IC:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													{editMode ? (
														<Input
															className="glass-input"
															type="text"
															value={bookData[0].CustID}
															onChange={(e) =>
																setBookData([
																	{
																		...bookData[0],
																		CustID: e.target.value,
																	},
																])
															}
														/>
													) : (
														<>{bookData[0].CustID}</>
													)}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div className="flex flex-col gap-2 bg-white/10 rounded-lg p-4">
								<div className="flex justify-between border-b dark:border-gray-200/30 border-gray-400/50 pb-2">
									<h1 className="text-lg font-semibold">
										Packages & Trip Details
									</h1>
								</div>
								<div className="overflow-x-auto">
									<table className="table-auto w-full">
										<tbody>
											{/* Travel Date */}
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">Travel Date:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													{/* {editMode ? (
														<div className="flex items-center gap-2">
															<Input
																className="glass-input"
																type="date"
																value={dayjs(
																	bookData[0].StartTravelDate
																).format("YYYY-MM-DD")}
																onChange={(e) =>
																	setBookData([
																		{
																			...bookData[0],
																			StartTravelDate: e.target.value,
																		},
																	])
																}
															/>
															<Input
																className="glass-input"
																type="date"
																value={dayjs(bookData[0].EndTravelDate).format(
																	"YYYY-MM-DD"
																)}
																onChange={(e) =>
																	setBookData([
																		{
																			...bookData[0],
																			EndTravelDate: e.target.value,
																		},
																	])
																}
															/>
														</div>
													) : (
														<>
															{dayjs(bookData[0].StartTravelDate).format(
																"DD MMM YYYY"
															)}{" "}
															-{" "}
															{dayjs(bookData[0].EndTravelDate).format(
																"DD MMM YYYY"
															)}
														</>
													)} */}
													{dayjs(bookData[0].StartTravelDate).format(
														"DD MMM YYYY"
													)}{" "}
													-{" "}
													{dayjs(bookData[0].EndTravelDate).format(
														"DD MMM YYYY"
													)}
												</td>
											</tr>

											{/* Trip Name */}
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">Trip Name:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													{bookData[0].TripName}
												</td>
											</tr>

											{/* Package Name */}
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">Package Name:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													{bookData[0].PakejName}
												</td>
											</tr>

											{/* Flight Details */}
											<tr>
												<td className="text-sm font-normal px-4 py-2">
													<span className="font-semibold">Flight Details:</span>
												</td>
												<td className="text-sm font-normal px-4 py-2">
													{bookData[0].FlightDetails}
												</td>
											</tr>

											{/* Pax Details */}
											{bookData[0].Pax &&
												bookData[0].Pax.split(",").map((item, index) => {
													const [key, value] = item.split(":");
													return (
														<tr key={index}>
															<td className="text-sm font-normal px-4 py-2">
																<span className="font-semibold">
																	{key.replace(/([A-Z])/g, " $1")}:
																</span>
															</td>
															<td className="text-sm font-normal px-4 py-2">
																{value} pax
															</td>
														</tr>
													);
												})}
										</tbody>
									</table>
								</div>
							</div>
							<div className="col-span-2 flex flex-col gap-2 bg-white/10 rounded-lg p-4">
								<div className="flex justify-between border-b dark:border-gray-200/30 border-gray-400/50 pb-2">
									<h1 className="text-lg font-semibold">
										Add On Jemaah Details
									</h1>
								</div>
								<div className="overflow-x-auto">
									<BookingDetails
										CombinedAddOnCustDetails={bookData}
										editMode={editMode}
										setBookData={setBookData}
									/>
								</div>
							</div>
							<div className="col-span-2 flex flex-col gap-2 bg-white/10 rounded-lg p-4">
								<div className="flex justify-between border-b dark:border-gray-200/30 border-gray-400/50 pb-2">
									<h1 className="text-lg font-semibold">Payment Details</h1>
								</div>
								<div className="overflow-x-auto">
									<table className="table-auto w-full border dark:border-white/40 border-gray-400/50 rounded-lg">
										<thead>
											<tr className="uppercase text-sm leading-normal border-b dark:border-white/40 border-gray-400/50">
												<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
													Payment Date
												</th>
												<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
													Payment ID
												</th>
												<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
													Transaction ID
												</th>
												<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
													Total Amount
												</th>
												<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
													Deposits
												</th>
												<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
													Discount
												</th>
											</tr>
										</thead>
										<tbody>
											{bookData[0].PaidDate ? (
												<tr className="odd:bg-white/10">
													<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
														{dayjs(bookData[0].PaidDate).format(
															"DD MMM YYYY hh:mm:ss A"
														)}
													</td>
													<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
														{bookData[0].OrderID}
													</td>
													<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
														{bookData[0].TransactionID}
													</td>
													<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
														{bookData[0].TotalAmount}
													</td>
													<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
														{bookData[0].Deposits}
													</td>
													<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
														{bookData[0].Discount}
													</td>
												</tr>
											) : (
												<tr className="odd:bg-white/10">
													<td
														colSpan={6}
														className="text-sm text-center font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50"
													>
														No Data
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</div>
							<div className="col-span-2 flex flex-col gap-2 bg-white/10 rounded-lg p-4">
								<div className="flex justify-between border-b dark:border-gray-200/30 border-gray-400/50 pb-2">
									<h1 className="text-lg font-semibold">
										Order History Details
									</h1>
								</div>
								<div className="overflow-x-auto">
									<table className="table-auto w-full border dark:border-white/40 border-gray-400/50 rounded-lg">
										<thead>
											<tr className="uppercase text-sm leading-normal border-b dark:border-white/40 border-gray-400/50">
												<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
													Date & Time
												</th>
												<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
													Action
												</th>
												<th className="text-sm font-semibold px-4 py-2 text-left border-r dark:border-white/40 border-gray-400/50">
													Remark
												</th>
											</tr>
										</thead>
										<tbody>
											{bookData[0].Status !== "Cancelled" ? (
												<>
													<tr className="odd:bg-white/10">
														<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
															{dayjs(bookData[0].BookDate).format(
																"DD MMM YYYY hh:mm:ss A"
															)}
														</td>
														<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
															<div className="flex items-center justify-center gap-2">
																[] -{" "}
																<p className="bg-blue-500 px-2 dark:text-white text-zinc-950 rounded-md">
																	Locked Seat
																</p>
															</div>
														</td>
														<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50"></td>
													</tr>
													{bookData[0].PaidDate && (
														<tr className="odd:bg-white/10">
															<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
																{dayjs(bookData[0].PaidDate).format(
																	"DD MMM YYYY hh:mm:ss A"
																)}
															</td>
															<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50">
																<div className="flex items-center justify-center gap-2">
																	<p className="bg-blue-500 px-2 dark:text-white text-zinc-950 rounded-md">
																		Locked Seat
																	</p>{" "}
																	-{" "}
																	<p className="bg-green-500 px-2 dark:text-white text-zinc-950 rounded-md">
																		Paid
																	</p>
																</div>
															</td>
															<td className="text-sm font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50"></td>
														</tr>
													)}
												</>
											) : (
												<tr className="odd:bg-white/10">
													<td
														colSpan={6}
														className="text-sm text-center font-normal px-4 py-2 border-r dark:border-white/40 border-gray-400/50"
													>
														No Data
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				)}
			</AdminLayout>
		</>
	);
};

export default Details;
