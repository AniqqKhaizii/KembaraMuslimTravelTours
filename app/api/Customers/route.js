import pool from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
	try {
		const { searchParams } = req.nextUrl;

		const p_Operation = searchParams.get("Operation");
		const p_CustID = searchParams.get("CustID");
		const p_CustName = searchParams.get("CustName");
		const p_CustEmail = searchParams.get("CustEmail");
		const p_CustAddress = searchParams.get("CustAddress");
		const p_CustPhone = searchParams.get("CustPhone");
		const p_ReferralCode = searchParams.get("ReferralCode");

		const [rows] = await pool.query(
			`CALL SP_Manage_Customers(?, ?, ?, ?, ?, ?, ?)`,
			[
				p_Operation,
				p_CustID,
				p_CustName,
				p_CustEmail,
				p_CustAddress,
				p_CustPhone,
				p_ReferralCode,
			]
		);

		return NextResponse.json(rows[0]);
	} catch (err) {
		console.error("❌ ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
