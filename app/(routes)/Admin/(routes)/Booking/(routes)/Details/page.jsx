"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, message, Table } from "antd";
import AdminLayout from "../../../../layout/AdminLayout";
import dayjs from "dayjs"; // to format dates
import relativeTime from "dayjs/plugin/relativeTime"; // Optional for relative time
import advancedFormat from "dayjs/plugin/advancedFormat";
import axios from "axios";
import { RoomDetail } from "../../../../../../../lib/constants";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

const BookingDetails = ({ CombinedAddOnCustDetails }) => {
	const getRoomDetails = (roomID) => {
		const room = RoomDetail.find((room) => room.RoomID === roomID);
		return room ? room.RoomDesc : "Unknown Room";
	};

	return (
		<table className="table-auto w-full border border-white/40 rounded-lg">
			<thead>
				<tr className="uppercase text-sm leading-normal border-b border-white/40">
					<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
						Name
					</th>
					<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
						IC Number
					</th>
					<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
						Room Type
					</th>
				</tr>
			</thead>
			<tbody>
				{/* Loop through the CombinedAddOnCustDetails */}
				{CombinedAddOnCustDetails.map((customer, index) => {
					const [name, ic, roomID] = customer.AddOnCustDetails.split(",");
					const roomDesc = getRoomDetails(Number(roomID)); // Get RoomDesc based on RoomID

					return (
						<tr key={index} className="odd:bg-white/10">
							<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
								{name}
							</td>
							<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
								{ic}
							</td>
							<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
								{roomDesc}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

const Details = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("BookID");
	const [loading, setLoading] = useState(false);
	const [bookData, setBookData] = useState(null);

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
		<AdminLayout>
			{bookData && (
				<div className="m-4 border-2 border-gray-100/30 rounded-lg backdrop-blur-md p-8 text-white">
					<div className="flex justify-between w-full border-b border-gray-200/30">
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
								className="px-6 py-2 bg-gray-500 text-white rounded-3xl"
							>
								Generate Invoice
							</Button>
							{bookData[0].Status !== "Paid" && (
								<Button
									onClick={null}
									className="px-6 py-2 bg-gray-500 text-white rounded-3xl"
								>
									Pay
								</Button>
							)}
						</div>
					</div>

					<div className="mt-4 grid lg:grid-cols-2 sm:grid-cols-1 gap-6 col-span-2">
						<div className="flex flex-col gap-2 bg-white/10 rounded-lg p-4">
							<div className="flex justify-between border-b border-gray-200/30 pb-2">
								<div className="flex items-center gap-1">
									<h1 className="text-lg font-semibold">Booking Details</h1>
									<span
										className={`text-sm px-4 h-5 flex items-center rounded-full border ${
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
									className="px-2 bg-transparent border-0 hover:border-b hover:border-gray-500 text-white"
								>
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
													<span className="font-semibold">Balance Amount:</span>
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

										{/* Customer Details */}
										<tr>
											<td
												colSpan="2"
												className="border-t border-gray-100/20 px-4 py-2"
											>
												<p className="font-normal text-white">
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
												{bookData[0].CustName}
											</td>
										</tr>

										{/* Customer Email */}
										<tr>
											<td className="text-sm font-normal px-4 py-2">
												<span className="font-semibold">Email:</span>
											</td>
											<td className="text-sm font-normal px-4 py-2">
												{bookData[0].CustEmail}
											</td>
										</tr>

										{/* Customer Phone */}
										<tr>
											<td className="text-sm font-normal px-4 py-2">
												<span className="font-semibold">Phone:</span>
											</td>
											<td className="text-sm font-normal px-4 py-2">
												{bookData[0].CustPhone}
											</td>
										</tr>

										{/* Customer IC */}
										<tr>
											<td className="text-sm font-normal px-4 py-2">
												<span className="font-semibold">IC:</span>
											</td>
											<td className="text-sm font-normal px-4 py-2">
												{bookData[0].CustID}
											</td>
										</tr>

										{/* Travel Date */}
										<tr>
											<td className="text-sm font-normal px-4 py-2">
												<span className="font-semibold">Travel Date:</span>
											</td>
											<td className="text-sm font-normal px-4 py-2">
												{dayjs(bookData[0].StartTravelDate).format(
													"DD MMM YYYY"
												)}{" "}
												-{" "}
												{dayjs(bookData[0].EndTravelDate).format("DD MMM YYYY")}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="flex flex-col gap-2 bg-white/10 rounded-lg p-4">
							<div className="flex justify-between border-b border-gray-200/30 pb-2">
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
												{dayjs(bookData[0].StartTravelDate).format(
													"DD MMM YYYY"
												)}{" "}
												-{" "}
												{dayjs(bookData[0].EndTravelDate).format("DD MMM YYYY")}
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
							<div className="flex justify-between border-b border-gray-200/30 pb-2">
								<h1 className="text-lg font-semibold">Add On Jemaah Details</h1>
							</div>
							<div className="overflow-x-auto">
								<BookingDetails CombinedAddOnCustDetails={bookData} />
							</div>
						</div>
						<div className="col-span-2 flex flex-col gap-2 bg-white/10 rounded-lg p-4">
							<div className="flex justify-between border-b border-gray-200/30 pb-2">
								<h1 className="text-lg font-semibold">Payment Details</h1>
							</div>
							<div className="overflow-x-auto">
								<table className="table-auto w-full border border-white/40 rounded-lg">
									<thead>
										<tr className="uppercase text-sm leading-normal border-b border-white/40">
											<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
												Payment Date
											</th>
											<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
												Payment ID
											</th>
											<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
												Transaction ID
											</th>
											<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
												Total Amount
											</th>
											<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
												Deposits
											</th>
											<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
												Discount
											</th>
										</tr>
									</thead>
									<tbody>
										{bookData[0].PaidDate ? (
											<tr className="odd:bg-white/10">
												<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
													{dayjs(bookData[0].PaidDate).format(
														"DD MMM YYYY hh:mm:ss A"
													)}
												</td>
												<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
													{bookData[0].OrderID}
												</td>
												<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
													{bookData[0].TransactionID}
												</td>
												<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
													{bookData[0].TotalAmount}
												</td>
												<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
													{bookData[0].Deposits}
												</td>
												<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
													{bookData[0].Discount}
												</td>
											</tr>
										) : (
											<tr className="odd:bg-white/10">
												<td
													colSpan={6}
													className="text-sm text-center font-normal px-4 py-2 border-r border-white/40"
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
							<div className="flex justify-between border-b border-gray-200/30 pb-2">
								<h1 className="text-lg font-semibold">Order History Details</h1>
							</div>
							<div className="overflow-x-auto">
								<table className="table-auto w-full border border-white/40 rounded-lg">
									<thead>
										<tr className="uppercase text-sm leading-normal border-b border-white/40">
											<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
												Date & Time
											</th>
											<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
												Action
											</th>
											<th className="text-sm font-semibold px-4 py-2 text-left border-r border-white/40">
												Remark
											</th>
										</tr>
									</thead>
									<tbody>
										{bookData[0].Status !== "Cancelled" ? (
											<>
												<tr className="odd:bg-white/10">
													<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
														{dayjs(bookData[0].BookDate).format(
															"DD MMM YYYY hh:mm:ss A"
														)}
													</td>
													<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
														<div className="flex items-center justify-center gap-2">
															[] -{" "}
															<p className="bg-blue-500 px-2 text-white rounded-md">
																Locked Seat
															</p>
														</div>
													</td>
													<td className="text-sm font-normal px-4 py-2 border-r border-white/40"></td>
												</tr>
												{bookData[0].PaidDate && (
													<tr className="odd:bg-white/10">
														<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
															{dayjs(bookData[0].PaidDate).format(
																"DD MMM YYYY hh:mm:ss A"
															)}
														</td>
														<td className="text-sm font-normal px-4 py-2 border-r border-white/40">
															<div className="flex items-center justify-center gap-2">
																<p className="bg-blue-500 px-2 text-white rounded-md">
																	Locked Seat
																</p>{" "}
																-{" "}
																<p className="bg-green-500 px-2 text-white rounded-md">
																	Paid
																</p>
															</div>
														</td>
														<td className="text-sm font-normal px-4 py-2 border-r border-white/40"></td>
													</tr>
												)}
											</>
										) : (
											<tr className="odd:bg-white/10">
												<td
													colSpan={6}
													className="text-sm text-center font-normal px-4 py-2 border-r border-white/40"
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
	);
};

export default Details;
