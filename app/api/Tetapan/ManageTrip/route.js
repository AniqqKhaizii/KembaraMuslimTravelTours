import pool from "@/lib/db";
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
		const Airline = searchParams.get("Airline") || null;
		const FlightDetails = searchParams.get("FlightDetails") || null;
		const SeatAvailable = searchParams.get("SeatAvailable")
			? parseInt(searchParams.get("SeatAvailable"), 10)
			: null;
		const SeatSold = searchParams.get("SeatSold")
			? parseInt(searchParams.get("SeatSold"), 10)
			: null;
		const Deadline = searchParams.get("Deadline") || null;

		const [rows] = await pool.query(
			`CALL SP_Manage_Trip(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				Operation,
				TripID,
				TripName,
				StartTravelDate,
				EndTravelDate,
				Duration,
				Airline,
				FlightDetails,
				SeatAvailable,
				SeatSold,
				Deadline,
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
