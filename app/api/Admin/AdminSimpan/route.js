import { sql, poolPromise } from "@/lib/db";

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
			.input("AdmImage", sql.Image, AdmImage)
			.input("CreateBy", sql.VarChar(100), CreateBy)
			.execute("SP_Admin_Simpan");

		return Response.json(result.recordset);
	} catch (err) {
		console.error("ERROR:", err);
		return Response.json({ error: { message: err.message } }, { status: 500 });
	}
}
