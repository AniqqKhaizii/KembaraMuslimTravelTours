import mysql from "mysql2/promise";

const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
};

const poolPromise = mysql.createPool(config);

poolPromise
	.getConnection()
	.then((conn) => {
		console.log("✅ Connected to MySQL");
		conn.release();
	})
	.catch((err) => {
		console.error("❌ MySQL Connection Failed:", err);
	});

export { poolPromise };
