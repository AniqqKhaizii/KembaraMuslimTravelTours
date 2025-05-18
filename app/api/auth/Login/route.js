import pool from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function generateSessionId() {
	return crypto.randomBytes(64).toString("hex");
}

function hashPassword(password, salt) {
	return new Promise((resolve, reject) => {
		crypto.scrypt(password.normalize(), salt, 64, (err, hashed) => {
			if (err) reject(err);
			resolve(hashed.toString("hex").normalize());
		});
	});
}

export async function POST(req) {
	try {
		const { Username, Password } = await req.json();

		// Call stored procedure to get user by username
		const [rows] = await pool.query(`CALL SP_Sistem_Akses_Login(?, ?)`, [
			Username,
			null,
		]);

		if (!rows[0]?.Code < 0) {
			return NextResponse.json(
				{ message: "Pengguna tidak ditemui." },
				{ status: 404 }
			);
		}

		const user = rows[0][0];
		const hashedInputPassword = await hashPassword(Password, user.AdmSalt);

		if (hashedInputPassword !== user.AdmPassword) {
			return NextResponse.json(
				{ message: "Kata laluan tidak sah." },
				{ status: 401 }
			);
		}

		const sessionId = generateSessionId();

		await pool.query("UPDATE AdminTbl SET SessionID = ? WHERE AdmUname = ?", [
			sessionId,
			user.AdmUname,
		]);

		const response = NextResponse.json({ message: "Login berjaya", user });

		response.cookies.set("sessionId", sessionId, {
			httpOnly: true,
			sameSite: "strict",
			secure: true,
			maxAge: 60 * 60 * 24 * 7,
		});

		return response;
	} catch (err) {
		console.error("❌ ERROR:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
