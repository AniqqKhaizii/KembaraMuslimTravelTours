import { sql, poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 Ensure this runs dynamically on Vercel

export async function GET(req) {
	try {
		const { searchParams } = req.nextUrl; // ✅ Correct way to get query params
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
		const result = await pool
			.request()
			.input("Operation", sql.VarChar(10), Operation)
			.input("HotelID", sql.Int, HotelID)
			.input("HotelName", sql.VarChar(100), HotelName)
			.input("Location", sql.VarChar(255), Location)
			.input("Stars", sql.Int, Stars)
			.input("Distance", sql.Float, Distance)
			.execute("SP_Manage_Hotel");

		return NextResponse.json(result.recordset);
	} catch (err) {
		console.error("❌ ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
