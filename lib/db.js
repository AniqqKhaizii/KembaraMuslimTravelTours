// lib/db.js
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

let pool;

if (!global._pool) {
	global._pool = mysql.createPool(config);
}

pool = global._pool;

export default pool;
