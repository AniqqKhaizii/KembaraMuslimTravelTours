import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 Ensure this runs as a dynamic API

export async function POST(req) {
	try {
		// ✅ Correct way to get cookies in Next.js API routes
		const session = req.cookies.get("sessionId")?.value;

		if (!session) {
			return NextResponse.json({ message: "Already logged out." });
		}

		// ✅ Correct way to delete cookies
		const response = NextResponse.json({ message: "Logout successful" });
		response.cookies.set("sessionId", "", { maxAge: 0 });

		return response;
	} catch (err) {
		console.error("ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
