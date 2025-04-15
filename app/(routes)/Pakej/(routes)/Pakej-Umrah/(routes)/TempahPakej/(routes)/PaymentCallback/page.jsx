export default async function handler(req, res) {
	if (req.method === "POST") {
		const {
			refno,
			status_id,
			billcode,
			order_id,
			payment_id,
			amount,
			paid_at,
		} = req.body;

		// Log or store the payment status in your database
		console.log("Callback received:", req.body);

		// Optional: Update booking/payment status in DB here

		// Always return 200
		return res.status(200).json({ success: true });
	} else {
		res.status(405).end(); // Method Not Allowed
	}
}
