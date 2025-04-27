import pool from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 Force dynamic behavior

export async function POST(req) {
	try {
		const {
			AddNew,
			AdmName,
			AdmEmail,
			AdmUname,
			AdmPassword,
			AdmRole,
			AdmLevel,
			AdmImage,
			CreateBy,
		} = await req.json();

		const [rows] = await pool.query(
			`CALL SP_Admin_Simpan(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				AddNew,
				AdmName,
				AdmEmail,
				AdmUname,
				AdmPassword,
				AdmRole,
				AdmLevel,
				AdmImage,
				CreateBy,
			]
		);

		return NextResponse.json(rows[0]); // ✅ Return the result
	} catch (err) {
		console.error("ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
