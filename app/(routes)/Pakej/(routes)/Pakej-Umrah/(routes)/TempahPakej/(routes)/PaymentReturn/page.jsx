"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentReturn() {
	const searchParams = useSearchParams();
	const [statusMessage, setStatusMessage] = useState("");
	const [billcode, setBillcode] = useState(searchParams.get("billcode"));
	const [order_id, setOrder_id] = useState(searchParams.get("order_id"));
	const [transaction_id, setTransaction_id] = useState(
		searchParams.get("transaction_id")
	);

	useEffect(() => {
		const status_id = searchParams.get("status_id");

		if (status_id === "1") {
			setStatusMessage("Bayaran Telah Berjaya.");
		} else if (status_id === "3") {
			console.log("❌ Payment failed or cancelled.");
		}
	}, [searchParams]);

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold">Terima Kasih!</h1>
			{statusMessage && <p>{statusMessage}</p>}
			{billcode && <p>Billcode: {billcode}</p>}
			{order_id && <p>Order ID: {order_id}</p>}
			{transaction_id && <p>Transaction ID: {transaction_id}</p>}
			<p>Anda telah kembali dari halaman pembayaran.</p>
		</div>
	);
}
