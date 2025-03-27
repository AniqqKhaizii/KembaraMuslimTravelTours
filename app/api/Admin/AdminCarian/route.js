import { sql, poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const Username = searchParams.get("Username");
		const UserLevel = parseInt(searchParams.get("UserLevel"), 10);
		const UserRole = searchParams.get("UserRole");

		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("AdmUname", sql.NVarChar(100), Username) // Use `sql.NVarChar`
			.input("AdmLevel", sql.Int, UserLevel) // Ensure integer conversion
			.input("AdmRole", sql.NVarChar(50), UserRole) // Use `sql.NVarChar`
			.execute("SP_Admin_Carian");

		return NextResponse.json(result.recordset);
	} catch (err) {
		console.error("❌ ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
