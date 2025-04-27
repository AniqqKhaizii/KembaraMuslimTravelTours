import pool from "@/lib/db";
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
		const Address = searchParams.get("Address");
		const Latitude = searchParams.get("Latitude");
		const Longitude = searchParams.get("Longitude");
		const Image1 = searchParams.get("Image1");
		const Image2 = searchParams.get("Image2");
		const Image3 = searchParams.get("Image3");
		const Image4 = searchParams.get("Image4");
		const Image5 = searchParams.get("Image5");
		const Image6 = searchParams.get("Image6");
		const Image7 = searchParams.get("Image7");
		const Image8 = searchParams.get("Image8");

		const [rows] = await pool.query(
			`CALL SP_Manage_Hotel(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				Operation,
				HotelID,
				HotelName,
				Address,
				Latitude,
				Longitude,
				Location,
				Stars,
				Distance,
				Image1,
				Image2,
				Image3,
				Image4,
				Image5,
				Image6,
				Image7,
				Image8,
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
