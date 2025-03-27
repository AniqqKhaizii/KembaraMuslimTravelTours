import React, { Suspense } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { AiOutlineHome } from "react-icons/ai";

const Dashboard = () => {
	const packages = [
		{
			title: "4H3M MABUL SEMPORNA, SABAH 2024",
			flight: "Malaysia Airlines",
			travelDate: "05 DEC - 08 DEC 2024",
			price: {
				adult: "RM1690",
				childWithBed: "RM1590",
				childNoBed: "RM1490",
				singleSupp: "RM2059",
				infant: "RM200",
			},
			seats: {
				total: 15,
				sold: 14,
				available: 1,
			},
			deadline: "2024-10-21",
			status: "PUSH",
			departure: "2024-12-05",
		},
		{
			title: "4H3M KK KUNDASANG SABAH 2024",
			flight: "Malaysia Airlines",
			travelDate: "13 DEC - 16 DEC 2024",
			price: {
				adult: "RM1299",
				childWithBed: "RM1299",
				childNoBed: "RM999",
				singleSupp: "RM1499",
				infant: "RM150",
			},
			seats: {
				total: 16,
				sold: 15,
				available: 1,
			},
			deadline: "2024-11-13",
			status: "PUSH",
			departure: "2024-12-13",
		},
		{
			title: "6H4M KOREA MUSIM WINTER (TANPA KEDAI GINSENG) 2024",
			flight: "AirAsia",
			travelDate: "15 DEC - 20 DEC 2024",
			price: {
				adult: "RM4790",
				childWithBed: "RM4390",
				childNoBed: "RM3990",
				singleSupp: "RM5490",
				infant: "RM500",
			},
			seats: {
				total: 25,
				sold: 14,
				available: 11,
			},
			deadline: "2024-11-15",
			status: "PUSH",
			departure: "2024-12-15",
		},
		{
			title: "6H4M KOREA MUSIM WINTER (TANPA KEDAI GINSENG) 2024",
			flight: "AirAsia",
			travelDate: "16 DEC - 21 DEC 2024",
			price: {
				adult: "RM4790",
				childWithBed: "RM4390",
				childNoBed: "RM3990",
				singleSupp: "RM5490",
				infant: "RM500",
			},
			seats: {
				total: 25,
				sold: 0,
				available: 25,
			},
			deadline: "2024-11-16",
			status: "PUSH",
			departure: "2024-12-16",
		},
	];
	return (
		<AdminLayout>
			<Suspense fallback={<div>Loading...</div>}>
				<div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-4 p-4 h-full">
					<div className="col-span-2">
						<div className="flex items-center gap-2 w-full p-4 border border-gray-100 bg-gradient-to-br from-gray-200 to-white shadow-[5px_5px_10px_#dbdcdd,-5px_-5px_10px_#ffffff] rounded-md">
							<AiOutlineHome className="w-12 h-12" />
							<div className="flex flex-col items-end w-full gap-2">
								<span>Available Trip</span>
								<span className="text-5xl">23</span>
							</div>
						</div>
					</div>
					<div className="col-span-2">
						<div className="flex items-center gap-2 w-full p-4 border border-gray-100 bg-gradient-to-br from-gray-200 to-white shadow-[5px_5px_10px_#dbdcdd,-5px_-5px_10px_#ffffff] rounded-md">
							<AiOutlineHome className="w-12 h-12" />
							<div className="flex flex-col items-end w-full gap-2">
								<span>Ongoing Trip</span>
								<span className="text-5xl">20</span>
							</div>
						</div>
					</div>
					{/* <div className="col-span-3 bg-gradient-to-br from-gray-200 to-white shadow-[5px_5px_10px_#dbdcdd,-5px_-5px_10px_#ffffff] rounded-md"></div>
					<div className="col-span-1 bg-gradient-to-br from-gray-200 to-white shadow-[5px_5px_10px_#dbdcdd,-5px_-5px_10px_#ffffff] rounded-md">
						<div className="mx-auto p-6 pb-1 shadow-dashboard">
							<div className="flex flex-wrap items-center justify-between mb-1 -m-2">
								<div className="w-auto p-2">
									<h2 className="text-lg font-semibold text-coolGray-900">
										My Files
									</h2>
									<p className="text-xs text-coolGray-500 font-medium">
										Manage your files
									</p>
								</div>
								<div className="w-auto p-2">
									<a
										href="#"
										className="text-sm text-green-500 hover:text-green-600 font-semibold"
									>
										See all
									</a>
								</div>
							</div>
							<div className="flex flex-wrap">
								<div className="w-full border-b border-coolGray-100">
									<div className="flex flex-wrap items-center justify-between py-4 -m-2">
										<div className="w-auto p-2">
											<div className="flex flex-wrap items-center -m-2">
												<div className="w-auto p-2">
													<div className="flex items-center justify-center w-12 h-12 bg-yellow-50 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															height={24}
															width={24}
														>
															<path
																fill="#F59E0B"
																d="M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM5 18C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V14.58L7.3 11.29C7.48693 11.1068 7.73825 11.0041 8 11.0041C8.26175 11.0041 8.51307 11.1068 8.7 11.29L15.41 18H5ZM20 17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H18.23L14.42 14.17L15.3 13.29C15.4869 13.1068 15.7382 13.0041 16 13.0041C16.2618 13.0041 16.5131 13.1068 16.7 13.29L20 16.58V17ZM20 13.76L18.12 11.89C17.5501 11.3424 16.7904 11.0366 16 11.0366C15.2096 11.0366 14.4499 11.3424 13.88 11.89L13 12.77L10.12 9.89C9.55006 9.34243 8.79036 9.03663 8 9.03663C7.20964 9.03663 6.44994 9.34243 5.88 9.89L4 11.76V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V13.76Z"
															/>
														</svg>
													</div>
												</div>
												<div className="w-auto p-2">
													<h2 className="text-sm font-medium text-coolGray-900">
														Photos
													</h2>
													<h3 className="text-xs font-medium text-coolGray-400">
														44 photos
													</h3>
												</div>
											</div>
										</div>
										<div className="w-auto p-2">
											<p className="text-xs text-coolGray-500 font-medium">
												128 GB
											</p>
										</div>
									</div>
								</div>
								<div className="w-full border-b border-coolGray-100">
									<div className="flex flex-wrap items-center justify-between py-4 -m-2">
										<div className="w-auto p-2">
											<div className="flex flex-wrap items-center -m-2">
												<div className="w-auto p-2">
													<div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															height={24}
															width={24}
														>
															<path
																fill="#2AD168"
																d="M20 8.94C19.9896 8.84813 19.9695 8.75763 19.94 8.67V8.58C19.8919 8.47718 19.8278 8.38267 19.75 8.3L13.75 2.3C13.6673 2.22222 13.5728 2.15808 13.47 2.11H13.38C13.2784 2.05174 13.1662 2.01434 13.05 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V9C20 9 20 9 20 8.94ZM14 5.41L16.59 8H15C14.7348 8 14.4804 7.89464 14.2929 7.70711C14.1054 7.51957 14 7.26522 14 7V5.41ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V5C6 4.73478 6.10536 4.48043 6.29289 4.29289C6.48043 4.10536 6.73478 4 7 4H12V7C12 7.79565 12.3161 8.55871 12.8787 9.12132C13.4413 9.68393 14.2044 10 15 10H18V19Z"
															/>
														</svg>
													</div>
												</div>
												<div className="w-auto p-2">
													<h2 className="text-sm font-medium text-coolGray-900">
														Folders
													</h2>
													<h3 className="text-xs font-medium text-coolGray-400">
														33 folders
													</h3>
												</div>
											</div>
										</div>
										<div className="w-auto p-2">
											<p className="text-xs text-coolGray-500 font-medium">
												256 GB
											</p>
										</div>
									</div>
								</div>
								<div className="w-full">
									<div className="flex flex-wrap items-center justify-between py-4 -m-2">
										<div className="w-auto p-2">
											<div className="flex flex-wrap items-center -m-2">
												<div className="w-auto p-2">
													<div className="flex items-center justify-center w-12 h-12 bg-green-50 text-green-500 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															height={24}
															width={24}
														>
															<path
																fill="currentColor"
																d="M21.53 7.15C21.378 7.06223 21.2055 7.01603 21.03 7.01603C20.8545 7.01603 20.682 7.06223 20.53 7.15L17 8.89C16.9715 8.11357 16.6429 7.37847 16.0834 6.83944C15.5238 6.3004 14.777 5.99948 14 6H5C4.20435 6 3.44129 6.31607 2.87868 6.87868C2.31607 7.44129 2 8.20435 2 9V15C2 15.7957 2.31607 16.5587 2.87868 17.1213C3.44129 17.6839 4.20435 18 5 18H14C14.777 18.0005 15.5238 17.6996 16.0834 17.1606C16.6429 16.6215 16.9715 15.8864 17 15.11L20.56 16.89C20.6963 16.9599 20.8468 16.9975 21 17C21.1872 17.0006 21.3709 16.9486 21.53 16.85C21.6741 16.7599 21.7929 16.6346 21.8751 16.4859C21.9574 16.3372 22.0003 16.1699 22 16V8C22.0003 7.83006 21.9574 7.66283 21.8751 7.51411C21.7929 7.36538 21.6741 7.24007 21.53 7.15ZM15 15C15 15.2652 14.8946 15.5196 14.7071 15.7071C14.5196 15.8946 14.2652 16 14 16H5C4.73478 16 4.48043 15.8946 4.29289 15.7071C4.10536 15.5196 4 15.2652 4 15V9C4 8.73478 4.10536 8.48043 4.29289 8.29289C4.48043 8.10536 4.73478 8 5 8H14C14.2652 8 14.5196 8.10536 14.7071 8.29289C14.8946 8.48043 15 8.73478 15 9V15ZM20 14.38L17 12.88V11.12L20 9.62V14.38Z"
															/>
														</svg>
													</div>
												</div>
												<div className="w-auto p-2">
													<h2 className="text-sm font-medium text-coolGray-900">
														Movies
													</h2>
													<h3 className="text-xs font-medium text-coolGray-400">
														3 videos
													</h3>
												</div>
											</div>
										</div>
										<div className="w-auto p-2">
											<p className="text-xs text-coolGray-500 font-medium">
												3 GB
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> */}
					<div className="col-span-4 bg-gradient-to-br from-gray-200 to-white shadow-[5px_5px_10px_#dbdcdd,-5px_-5px_10px_#ffffff] rounded-md p-4">
						<h1 className="text-2xl font-bold mb-4">Tour Packages</h1>
						<table className="w-full border-collapse border border-gray-300 bg-white">
							<thead className="bg-gray-100">
								<tr className="bg-orange-600 text-white">
									<th className="border border-gray-300">Tour Package</th>
									<th className="border border-gray-300">Flight</th>
									<th className="border border-gray-300 text-center px-2">
										Travel Date
									</th>
									<th className="border border-gray-300 text-center px-2">
										Price
									</th>
									<th className="border border-gray-300 text-center px-2">
										Seats
									</th>
									<th className="border border-gray-300 text-center px-2">
										Deadline
									</th>
									<th className="border border-gray-300 text-center px-2">
										Departure
									</th>
									<th className="border border-gray-300 text-center px-2">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{packages.map((pkg, index) => (
									<tr key={index} className="text-center">
										<td className="border border-gray-300">{pkg.title}</td>
										<td className="border border-gray-300">{pkg.flight}</td>
										<td className="border border-gray-300 text-center px-2">
											{pkg.travelDate}
										</td>
										<td className="border border-gray-300 text-left px-2">
											{Object.entries(pkg.price).map(([key, value]) => (
												<div key={key}>
													<span className="capitalize">
														{key.replace(/([A-Z])/g, " $1")}: {value}
													</span>
												</div>
											))}
										</td>
										<td className="border border-gray-300 text-left px-2">
											Total: {pkg.seats.total} <br />
											Sold: {pkg.seats.sold} <br />
											Available: {pkg.seats.available}
										</td>
										<td className="border border-gray-300 text-center px-2">
											{pkg.deadline}
										</td>
										<td className="border border-gray-300 text-center px-2">
											{pkg.departure}
										</td>
										<td className="border border-gray-300 text-left px-2">
											<div className="flex flex-col justify-center space-y-2">
												<button className="px-2 py-1 bg-blue-500 text-white rounded">
													Add Booking
												</button>
												<button className="px-2 py-1 bg-gray-200 rounded">
													Flyers PDF
												</button>
												<button className="px-2 py-1 bg-gray-200 rounded">
													Edit
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</Suspense>
		</AdminLayout>
	);
};

export default Dashboard;
