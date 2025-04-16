import { poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		const { searchParams } = req.nextUrl;
		const Operation = searchParams.get("Operation");
		const PakejID = searchParams.get("PakejID")
			? parseInt(searchParams.get("PakejID"), 10)
			: null;
		const PakejName = searchParams.get("PakejName");
		const HotelMakkahID = searchParams.get("HotelMakkahID")
			? parseInt(searchParams.get("HotelMakkahID"), 10)
			: null;
		const HotelMadinahID = searchParams.get("HotelMadinahID")
			? parseInt(searchParams.get("HotelMadinahID"), 10)
			: null;
		const TripIDs = searchParams.get("TripIDs");
		const TripUnique = searchParams.get("TripUnique");
		const PakejPoster = searchParams.get("PakejPoster");

		const parseDecimal = (value) => (value ? parseFloat(value) : null);

		const Adult_Double = parseDecimal(searchParams.get("Adult_Double"));
		const Adult_Triple = parseDecimal(searchParams.get("Adult_Triple"));
		const Adult_Quad = parseDecimal(searchParams.get("Adult_Quad"));

		const ChildWBed_Double = parseDecimal(searchParams.get("ChildWBed_Double"));
		const ChildWBed_Triple = parseDecimal(searchParams.get("ChildWBed_Triple"));
		const ChildWBed_Quad = parseDecimal(searchParams.get("ChildWBed_Quad"));

		const ChildNoBed_Double = parseDecimal(
			searchParams.get("ChildNoBed_Double")
		);
		const ChildNoBed_Triple = parseDecimal(
			searchParams.get("ChildNoBed_Triple")
		);
		const ChildNoBed_Quad = parseDecimal(searchParams.get("ChildNoBed_Quad"));

		const Infant_Double = parseDecimal(searchParams.get("Infant_Double"));
		const Infant_Triple = parseDecimal(searchParams.get("Infant_Triple"));
		const Infant_Quad = parseDecimal(searchParams.get("Infant_Quad"));

		const pool = await poolPromise;

		const [rows] = await pool.query(
			`CALL SP_Manage_Package(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				Operation,
				PakejID,
				PakejName,
				Adult_Double,
				Adult_Triple,
				Adult_Quad,
				ChildWBed_Double,
				ChildWBed_Triple,
				ChildWBed_Quad,
				ChildNoBed_Double,
				ChildNoBed_Triple,
				ChildNoBed_Quad,
				Infant_Double,
				Infant_Triple,
				Infant_Quad,
				HotelMakkahID,
				HotelMadinahID,
				TripIDs,
				PakejPoster,
				TripUnique,
			]
		);

		return NextResponse.json(rows[0]); // MySQL procedures return nested arrays
	} catch (err) {
		console.error("❌ ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
