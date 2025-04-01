import { sql, poolPromise } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 🔥 Force dynamic behavior

export async function DELETE(req) {
	try {
		const { searchParams } = new URL(req.nextUrl); // ✅ Use req.nextUrl (Next.js 13+)
		const AdmUname = searchParams.get("AdmUname");

		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("AdmUname", sql.NVarChar(100), AdmUname)
			.execute("SP_Admin_Hapus");

		return NextResponse.json(result.recordset); // ✅ Use NextResponse
	} catch (err) {
		console.error("ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
