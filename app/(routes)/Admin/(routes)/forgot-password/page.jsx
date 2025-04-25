"use client";
import { useState } from "react";
import Axios from "axios";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		Axios.post("/api/forgot-password", { email }).then((res) => {
			setMessage(res.data.message);
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-orange-200">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded shadow-md w-96"
			>
				<h2 className="text-xl font-bold mb-4">Forgot Password</h2>
				<input
					type="email"
					placeholder="Enter your email"
					className="w-full mb-4 p-2 border rounded"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button
					type="submit"
					className="bg-orange-500 text-white px-4 py-2 rounded"
				>
					Send Reset Link
				</button>
				{message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
			</form>
		</div>
	);
};

export default ForgotPassword;
