import nodemailer from "nodemailer";
import pool from "@/lib/db";

export async function POST(req) {
	try {
		const { email } = await req.json();

		// Search for user by email
		const [rows] = await pool.query(
			`SELECT * FROM adminTbl WHERE AdmEmail = ?`,
			[email]
		);

		if (!rows.length) {
			return new Response(JSON.stringify({ message: "Email not found!" }), {
				status: 404,
			});
		}

		// Create a reset token (you should ideally generate a real token here)
		const resetToken = "dummy-token-123"; // Replace with real secure random token

		// Send reset email
		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		await transporter.sendMail({
			from: '"KMTT Support" <support@kmtt.com>',
			to: email,
			subject: "Password Reset",
			html: `<p>Click <a href="https://www.kembaramuslimtravel.com/reset-password?token=${resetToken}">here</a> to reset your password.</p>`,
		});

		return new Response(
			JSON.stringify({ message: "Reset link sent to email!" }),
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ message: "Server error" }), {
			status: 500,
		});
	}
}
