import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
	try {
		const sessionId = cookies().get("sessionId")?.value;

		if (!sessionId) {
			return NextResponse.json({ error: "No session ID" }, { status: 401 });
		}

		const [rows] = await pool.query(
			`SELECT AdmID, AdmName, AdmEmail, AdmUname, AdmRole, AdmLevel, AdmImage 
			 FROM AdminTbl 
			 WHERE SessionID = ?`,
			[sessionId]
		);

		const user = rows[0];

		console.log("user", user);

		if (!user) {
			return NextResponse.json({ error: "Invalid session" }, { status: 403 });
		}

		return NextResponse.json({ user });
	} catch (err) {
		console.error("Session check failed:", err);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
