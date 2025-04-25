"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PaymentReturn() {
	const searchParams = useSearchParams();
	const [statusMessage, setStatusMessage] = useState("");
	const [billcode, setBillcode] = useState(searchParams.get("billcode"));
	const [order_id, setOrder_id] = useState(searchParams.get("order_id"));
	const [transaction_id, setTransaction_id] = useState(
		searchParams.get("transaction_id")
	);
	const status_id = searchParams.get("status_id");
	const receiptRef = useRef(null);

	useEffect(() => {
		if (status_id === "1") {
			setStatusMessage("✅ Pembayaran berjaya. Terima kasih!");
			autoSendWhatsApp();
			autoSendEmail();
		} else if (status_id === "3") {
			setStatusMessage("❌ Pembayaran gagal atau dibatalkan.");
		}
	}, [status_id]);

	const downloadPDF = async () => {
		const canvas = await html2canvas(receiptRef.current);
		const imgData = canvas.toDataURL("image/png");
		const pdf = new jsPDF();
		pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
		pdf.save(`resit-${order_id}.pdf`);
	};

	const autoSendWhatsApp = () => {
		const message = `Resit Pembayaran\n\nBillcode: ${billcode}\nOrder ID: ${order_id}\nTransaction ID: ${transaction_id}\nStatus: ${statusMessage}`;
		const phone = "60123456789"; // Replace with dynamic phone number if available
		const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
		window.open(url, "_blank");
	};

	const autoSendEmail = async () => {
		await fetch("/api/send-receipt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				billcode,
				order_id,
				transaction_id,
				statusMessage,
			}),
		});
	};

	return (
		<div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
			<h1 className="text-2xl font-bold text-gray-800 text-center">
				Resit Pembayaran
			</h1>
			<div
				ref={receiptRef}
				className="bg-gray-50 p-6 rounded-lg border space-y-2"
			>
				<p>
					<span className="font-semibold">Status:</span> {statusMessage}
				</p>
				<p>
					<span className="font-semibold">Billcode:</span> {billcode}
				</p>
				<p>
					<span className="font-semibold">Order ID:</span> {order_id}
				</p>
				<p>
					<span className="font-semibold">Transaction ID:</span>{" "}
					{transaction_id}
				</p>
				<p>
					<span className="text-sm text-gray-500">
						Tarikh: {new Date().toLocaleDateString("ms-MY")}
					</span>
				</p>
			</div>
			<div className="text-center">
				<button
					onClick={downloadPDF}
					className="mt-4 px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
				>
					Muat Turun Resit
				</button>
			</div>
		</div>
	);
}
