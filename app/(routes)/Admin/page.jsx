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
	const [showModal, setShowModal] = useState(false);
	const [forgotEmail, setForgotEmail] = useState("");
	const [loginLoading, setLoginLoading] = useState(false);

	const handleForgotPassword = async () => {
		try {
			const response = await Axios.post("/api/forgot-password", {
				email: forgotEmail,
			});

			if (response.data.success) {
				alert("Password reset instructions have been sent to your email.");
			} else {
				alert(response.data.message || "Failed to send reset instructions.");
			}
		} catch (error) {
			console.error("Error sending forgot password request:", error);
			alert("An error occurred. Please try again later.");
		}
		setShowModal(false);
	};

	const checkUser = () => {
		setLoginLoading(true);
		Axios.post("/api/Login", {
			Username,
			Password,
		})
			.then((response) => {
				const data = response.data;

				if (Username === "" || Password === "") {
					setLoginStatus("Username and password are required.");
					setLoginLoading(false);
					return;
				}

				if (Array.isArray(data) && data.length > 0) {
					const userData = data[0];

					if (userData.Code && userData.Code < 0) {
						alert("Invalid username or password.");
						setLoginLoading(false);
						return;
					}

					const rememberMe = localStorage.getItem("rememberMe") === "true";
					if (rememberMe) {
						localStorage.setItem("UserData", JSON.stringify(userData));
					} else {
						localStorage.removeItem("UserData");
					}

					sessionStorage.setItem("UserData", JSON.stringify(userData));
					setLoginLoading(false);
					router.push("/Admin/Dashboard");
				} else {
					alert("Invalid login response or user not found.");
					setLoginLoading(false);
				}
			})
			.catch((error) => {
				console.error("Login error:", error);
				setLoginStatus("Login failed. Please try again.");
				setLoginLoading(false);
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

	useEffect(() => {
		const remembered = localStorage.getItem("rememberMe");
		const storedUser = localStorage.getItem("UserData");
		storedUser ? setUsername(storedUser.AdmUname) : setUsername("");
		if (remembered === "true") {
			const storedUser = localStorage.getItem("UserData");
			if (storedUser) {
				const parsed = JSON.parse(storedUser);
				setUsername(parsed?.AdmUname || "");
			}
		}
	}, []);

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

				<form
					action=""
					onSubmit={(e) => {
						e.preventDefault();
						checkUser();
					}}
					className="mx-auto mb-0 mt-8 max-w-md space-y-4"
				>
					<div>
						<label htmlFor="Username" className="sr-only">
							Email
						</label>

						<div className="relative">
							<input
								type="text"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter email"
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
					<div className="flex items-center justify-between">
						<label className="flex items-center gap-2 text-sm text-white">
							<input
								type="checkbox"
								className="form-checkbox h-4 w-4 text-orange-500"
								onChange={(e) =>
									localStorage.setItem("rememberMe", e.target.checked)
								}
							/>
							Remember me
						</label>
						{showModal && (
							<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
								<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
									<h2 className="text-xl font-medium">Forgot Password</h2>
									<p className="text-sm text-gray-600 mb-6">
										Enter your email to receive password reset instructions.
									</p>
									<input
										type="email"
										value={forgotEmail}
										onChange={(e) => setForgotEmail(e.target.value)}
										placeholder="Your email"
										className="w-full border border-gray-300 p-2 rounded mb-4"
										required
									/>
									<div className="flex justify-end gap-2">
										<button
											onClick={() => setShowModal(false)}
											className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
										>
											Cancel
										</button>
										<button
											onClick={handleForgotPassword}
											className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
										>
											Send
										</button>
									</div>
								</div>
							</div>
						)}
						<button
							type="button"
							className="text-sm text-white underline hover:text-orange-200"
							onClick={() => setShowModal(true)}
						>
							Forgot Password?
						</button>
					</div>
					<div className="flex items-center w-full">
						<button
							type="submit"
							className="w-full flex justify-center text-center rounded-lg bg-black px-5 py-3 text-sm font-medium text-orange-500 hover:bg-orange-600 hover:text-white"
						>
							{loginLoading ? "Logging in..." : "Login"}
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
