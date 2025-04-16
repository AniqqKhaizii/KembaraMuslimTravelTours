import { poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ✅ Ensure API runs dynamically in Vercel

export async function GET(req) {
	try {
		const { searchParams } = req.nextUrl;

		const Operation = searchParams.get("Operation");
		const TripID = searchParams.get("TripID")
			? parseInt(searchParams.get("TripID"), 10)
			: null;
		const TripName = searchParams.get("TripName");
		const Duration = searchParams.get("Duration")
			? parseInt(searchParams.get("Duration"), 10)
			: null;

		const StartTravelDate = searchParams.get("StartTravelDate") || null;
		const EndTravelDate = searchParams.get("EndTravelDate") || null;

		const pool = await poolPromise;

		const [rows] = await pool.query(
			`CALL SP_Manage_Trip(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				Operation,
				TripID,
				TripName,
				StartTravelDate,
				EndTravelDate,
				Duration,
				null,
				null,
				null,
				null,
				null,
			]
		);

		return NextResponse.json(rows[0]); // First result set
	} catch (err) {
		console.error("❌ ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
