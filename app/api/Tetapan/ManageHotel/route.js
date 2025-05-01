import pool from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const convertBase64ToBinary = (base64String) => {
	return Buffer.from(base64String, "base64");
};

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

		return NextResponse.json(rows[0]);
	} catch (err) {
		console.error("❌ GET ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}

// --- POST: for formData-based submission
export async function POST(req) {
	try {
		const body = await req.json();

		const Operation = body.Operation;
		const HotelID = body.HotelID ? parseInt(body.HotelID, 10) : null;
		const HotelName = body.HotelName;
		const Location = body.Location;
		const Stars = body.Stars ? parseInt(body.Stars, 10) : null;
		const Distance = body.Distance ? parseFloat(body.Distance) : null;
		const Address = body.Address;
		const Latitude = body.Latitude;
		const Longitude = body.Longitude;

		const Image1 = body.Image1 ? convertBase64ToBinary(body.Image1) : null;
		const Image2 = body.Image2 ? convertBase64ToBinary(body.Image2) : null;
		const Image3 = body.Image3 ? convertBase64ToBinary(body.Image3) : null;
		const Image4 = body.Image4 ? convertBase64ToBinary(body.Image4) : null;
		const Image5 = body.Image5 ? convertBase64ToBinary(body.Image5) : null;
		const Image6 = body.Image6 ? convertBase64ToBinary(body.Image6) : null;
		const Image7 = body.Image7 ? convertBase64ToBinary(body.Image7) : null;
		const Image8 = body.Image8 ? convertBase64ToBinary(body.Image8) : null;

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

		return NextResponse.json(rows[0]);
	} catch (err) {
		console.error("❌ POST ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
