import pool from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
	try {
		const sessionId = cookies().get("sessionId")?.value;

		if (!sessionId) {
			return NextResponse.json({ message: "Already logged out." });
		}

		await pool.query(
			`UPDATE AdminTbl SET SessionID = NULL WHERE SessionID = ?`,
			[sessionId]
		);

		const response = NextResponse.json({ message: "Logout successful" });
		response.cookies.set("sessionId", "", {
			maxAge: 0,
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		return response;
	} catch (err) {
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
