import { sql, poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 Ensure this runs as a dynamic API

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

		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("ADD_NEW", sql.VarChar(1), AddNew)
			.input("AdmName", sql.VarChar(100), AdmName)
			.input("AdmEmail", sql.VarChar(100), AdmEmail)
			.input("AdmUname", sql.VarChar(100), AdmUname)
			.input("AdmPassword", sql.VarChar(100), AdmPassword)
			.input("AdmRole", sql.VarChar(50), AdmRole)
			.input("AdmLevel", sql.Int, AdmLevel)
			.input("AdmImage", sql.VarBinary, AdmImage) // ✅ Corrected SQL type
			.input("CreateBy", sql.VarChar(100), CreateBy)
			.execute("SP_Admin_Simpan");

		return NextResponse.json(result.recordset); // ✅ Corrected response handling
	} catch (err) {
		console.error("ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
