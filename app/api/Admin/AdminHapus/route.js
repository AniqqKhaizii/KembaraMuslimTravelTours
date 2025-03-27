import { sql, poolPromise } from "@/lib/db";

export async function DELETE(req) {
	try {
		const { searchParams } = new URL(req.url);
		const AdmUname = searchParams.get("AdmUname");

		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("AdmUname", sql.NVarChar(100), AdmUname)
			.execute("SP_Admin_Hapus");

		return Response.json(result.recordset);
	} catch (err) {
		console.error("ERROR:", err);
		return Response.json({ error: { message: err.message } }, { status: 500 });
	}
}
