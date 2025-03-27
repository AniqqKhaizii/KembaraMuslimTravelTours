"use client";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/navigation"; // Updated import

const Index = () => {
	const router = useRouter(); // Updated to useRouter
	const [Username, setUsername] = useState("");
	const [Password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState("");
	const [statusHolder, setStatusHolder] = useState("message");

	const checkUser = () => {
		Axios.post("http://localhost:3000/api/Login", {
			Username: Username,
			Password: Password,
		}).then((response) => {
			if (response.data.message || Username === "" || Password === "") {
				router.push("/Admin");
				setLoginStatus(response.data.message);
			} else {
				const userData = response.data[0];
				localStorage.setItem("UserData", JSON.stringify(userData));
				sessionStorage.setItem("UserData", JSON.stringify(userData));
				router.push("/Admin/Dashboard");
			}
		});
	};

	useEffect(() => {
		if (loginStatus !== "") {
			setStatusHolder("showMessage");
			setTimeout(() => {
				setStatusHolder("message");
			}, 4000);
		}
	}, [loginStatus]);

	return (
		<section className="relative flex flex-wrap lg:h-screen lg:items-center bg-gradient-to-bl from-orange-300 to-orange-800">
			<div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
				<div className="mx-auto max-w-lg text-center">
					<h1 className="text-3xl font-bold sm:text-5xl font-reenie">
						Salam Alaik
					</h1>

					<p className="mt-4 text-gray-200 text-2xl">
						Kembara Muslim's Admin Panel
					</p>
				</div>

				<form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
					<div>
						<label htmlFor="Username" className="sr-only">
							Username
						</label>

						<div className="relative">
							<input
								type="text"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter username"
								onChange={(e) => setUsername(e.target.value)}
								required
							/>

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="#a4a4a4"
									className="bi bi-person"
									viewBox="0 0 16 16"
								>
									<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
								</svg>
							</span>
						</div>
					</div>

					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>

						<div className="relative">
							<input
								type="password"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							</span>
						</div>
					</div>

					<div className="flex items-center justify-end">
						<button
							type="button"
							onClick={checkUser}
							className="inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-orange-500"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
			<div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
				<img
					alt=""
					src="/Office.jpg"
					className="absolute inset-0 h-full w-full object-cover object-center"
				/>
			</div>
		</section>
	);
};

export default Index;
