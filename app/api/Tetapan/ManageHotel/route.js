import { sql, poolPromise } from "@/lib/db";

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const Operation = searchParams.get("Operation");
		const HotelID = searchParams.get("HotelID");
		const HotelName = searchParams.get("HotelName");
		const Location = searchParams.get("Location");
		const Stars = searchParams.get("Stars");
		const Distance = searchParams.get("Distance");

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

		return Response.json(result.recordset);
	} catch (err) {
		console.error("ERROR:", err);
		return Response.json({ error: { message: err.message } }, { status: 500 });
	}
}
