import sql from "mssql";

const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_NAME,
	options: {
		encrypt: true, // Set to true for Azure
		trustServerCertificate: true, // Change based on your DB setup
	},
};

const poolPromise = new sql.ConnectionPool(config)
	.connect()
	.then((pool) => {
		console.log("✅ Connected to MSSQL");
		return pool;
	})
	.catch((err) => console.error("❌ Database Connection Failed:", err));

export { sql, poolPromise };
