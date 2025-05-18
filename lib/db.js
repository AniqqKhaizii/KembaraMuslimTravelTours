import mysql from "mysql2/promise";

const config = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
};

let pool;

if (!global._pool) {
	global._pool = mysql.createPool(config);

	// Test the connection
	global._pool
		.getConnection()
		.then((connection) => {
			console.log("✅ MySQL connection successful.");
			connection.release();
		})
		.catch((error) => {
			console.error("❌ MySQL connection failed:", error.message);
		});
}

pool = global._pool;

export default pool;
