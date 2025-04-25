import { poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 Force dynamic behavior

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.nextUrl);

		const Username = searchParams.get("Username");
		const UserLevel = searchParams.get("UserLevel");
		const UserRole = searchParams.get("UserRole");
		const UserEmail = searchParams.get("UserEmail");

		const pool = await poolPromise;

		const [rows] = await pool.query(`CALL SP_Admin_Carian(?, ?, ?, ?)`, [
			Username,
			UserLevel,
			UserRole,
			UserEmail,
		]);

		return NextResponse.json(rows[0]); // rows[0] contains the actual result set
	} catch (err) {
		console.error("❌ ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
