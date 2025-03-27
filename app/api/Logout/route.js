export async function POST(req) {
	try {
		const session = req.cookies.get("sessionId");
		if (!session) {
			return Response.json({ message: "Already logged out." });
		}

		// Clear session (assuming session is stored in cookies)
		req.cookies.delete("sessionId");

		return Response.json({ message: "Logout successful" });
	} catch (err) {
		console.error("ERROR:", err);
		return Response.json({ error: { message: err.message } }, { status: 500 });
	}
}
