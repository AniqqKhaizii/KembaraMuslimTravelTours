import pool from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 Ensure Vercel treats this as a dynamic route

export async function POST(req) {
	try {
		const { Username, Password } = await req.json();

		// ⚠️ SECURITY WARNING: Raw password comparison is risky!
		// Consider hashing and secure comparison methods.

		const [rows] = await pool.query(`CALL SP_Sistem_Akses_Login(?, ?)`, [
			Username,
			Password,
		]);

		if (rows[0]?.length > 0) {
			return NextResponse.json(rows[0]);
		} else {
			return NextResponse.json(
				{ message: "Pengguna tidak ditemui." },
				{ status: 404 }
			);
		}
	} catch (err) {
		console.error("❌ ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
