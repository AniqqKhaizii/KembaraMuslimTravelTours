import { sql, poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ✅ Ensure API runs dynamically in Vercel

export async function GET(req) {
	try {
		const { searchParams } = req.nextUrl; // ✅
		const Operation = searchParams.get("Operation");
		const TripID = searchParams.get("TripID")
			? parseInt(searchParams.get("TripID"), 10)
			: null;
		const TripName = searchParams.get("TripName");
		const Duration = searchParams.get("Duration")
			? parseInt(searchParams.get("Duration"), 10)
			: null;

		// Convert StartTravelDate and EndTravelDate to SQL Date format
		const StartTravelDate = searchParams.get("StartTravelDate") || null;
		const EndTravelDate = searchParams.get("EndTravelDate") || null;

		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("Operation", sql.VarChar(10), Operation)
			.input("TripID", sql.Int, TripID)
			.input("TripName", sql.VarChar(100), TripName)
			.input("StartTravelDate", sql.VarChar(8), StartTravelDate) // ✅ Use Date type
			.input("EndTravelDate", sql.VarChar(8), EndTravelDate) // ✅ Use Date type
			.input("Duration", sql.Int, Duration)
			.execute("SP_Manage_Trip");

		return NextResponse.json(result.recordset);
	} catch (err) {
		console.error("❌ ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
