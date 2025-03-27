import { sql, poolPromise } from "@/lib/db";

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const Operation = searchParams.get("Operation");
		const TripID = searchParams.get("TripID");
		const TripName = searchParams.get("TripName");
		const StartTravelDate = searchParams.get("StartTravelDate");
		const EndTravelDate = searchParams.get("EndTravelDate");
		const Duration = searchParams.get("Duration");

		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("Operation", sql.VarChar(10), Operation)
			.input("TripID", sql.Int, TripID)
			.input("TripName", sql.VarChar(100), TripName)
			.input("StartTravelDate", sql.VarChar(8), StartTravelDate)
			.input("EndTravelDate", sql.VarChar(8), EndTravelDate)
			.input("Duration", sql.Int, Duration)
			.execute("SP_Manage_Trip");

		return Response.json(result.recordset);
	} catch (err) {
		console.error("ERROR:", err);
		return Response.json({ error: { message: err.message } }, { status: 500 });
	}
}
