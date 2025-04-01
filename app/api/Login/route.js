import { sql, poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 Ensure Vercel treats this as a dynamic route

export async function POST(req) {
	try {
		const { Username, Password } = await req.json();

		// ❌ SECURITY WARNING: Never store raw passwords.
		// Consider hashing passwords before checking.

		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("Username", sql.VarChar(100), Username)
			.input("Password", sql.VarChar(100), Password)
			.execute("SP_Sistem_Akses_Login");

		if (result.recordset.length > 0) {
			return NextResponse.json(result.recordset);
		} else {
			return NextResponse.json(
				{ message: "Pengguna tidak ditemui." },
				{ status: 404 }
			);
		}
	} catch (err) {
		console.error("ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
