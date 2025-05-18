import pool from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic"; // Vercel needs this for dynamic routes

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
			ModifyBy,
		} = await req.json();

		// Generate a salt
		function generateSalt() {
			return crypto.randomBytes(16).toString("hex").normalize();
		}

		// Hash the password with the salt
		function hashPassword(password, salt) {
			return new Promise((resolve, reject) => {
				crypto.scrypt(password.normalize(), salt, 64, (err, hashed) => {
					if (err) reject(err);
					resolve(hashed.toString("hex").normalize());
				});
			});
		}

		const salt = generateSalt();
		const hashedPassword = await hashPassword(AdmPassword, salt);

		// Create account using stored procedure
		const [rows] = await pool.query(
			`CALL SP_Admin_Simpan(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				AddNew,
				AdmName,
				AdmEmail,
				AdmUname,
				hashedPassword,
				AdmLevel,
				AdmRole,
				AdmImage,
				CreateBy,
				ModifyBy,
				salt,
				null,
			]
		);

		return NextResponse.json({
			message: "Signup successful",
			data: rows[0],
		});
	} catch (err) {
		console.error("❌ Signup Error:", err);
		return NextResponse.json(
			{ error: { message: err.message } },
			{ status: 500 }
		);
	}
}
