import nodemailer from "nodemailer";

export async function POST(req) {
	const { email } = await req.json();

	const pool = await poolPromise;

	const [rows] = await pool.query(`CALL SP_Admin_Carian(?, ?, ?, ?)`, [
		Username,
		UserLevel,
		UserRole,
		UserEmail,
	]);

	if (email !== rows[0][0].AdmEmail) {
		return new Response(JSON.stringify({ message: "Email not found!" }), {
			status: 404,
		});
	}

	// Send email with nodemailer
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
		html: `<p>Click <a href="https://www.kembaramuslimtravel.com/reset-password?token=123">here</a> to reset your password.</p>`,
	});

	return new Response(
		JSON.stringify({ message: "Reset link sent to email!" }),
		{
			status: 200,
		}
	);
}
