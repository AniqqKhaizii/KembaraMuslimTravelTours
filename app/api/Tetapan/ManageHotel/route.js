import { poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 Ensure this runs dynamically on Vercel

export async function GET(req) {
	try {
		const { searchParams } = req.nextUrl;

		const Operation = searchParams.get("Operation");
		const HotelID = searchParams.get("HotelID")
			? parseInt(searchParams.get("HotelID"), 10)
			: null;
		const HotelName = searchParams.get("HotelName");
		const Location = searchParams.get("Location");
		const Stars = searchParams.get("Stars")
			? parseInt(searchParams.get("Stars"), 10)
			: null;
		const Distance = searchParams.get("Distance")
			? parseFloat(searchParams.get("Distance"))
			: null;

		const pool = await poolPromise;

		const [rows] = await pool.query(`CALL SP_Manage_Hotel(?, ?, ?, ?, ?, ?)`, [
			Operation,
			HotelID,
			HotelName,
			Location,
			Stars,
			Distance,
		]);

		return NextResponse.json(rows[0]); // First result set
	} catch (err) {
		console.error("❌ ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
