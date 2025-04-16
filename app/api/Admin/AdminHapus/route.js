import { poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 Force dynamic behavior

export async function DELETE(req) {
	try {
		const { searchParams } = new URL(req.nextUrl);
		const AdmUname = searchParams.get("AdmUname");

		const pool = await poolPromise;

		const [rows] = await pool.query(`CALL SP_Admin_Hapus(?)`, [AdmUname]);

		return NextResponse.json(rows[0]); // ✅ MySQL returns data in rows[0]
	} catch (err) {
		console.error("ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
