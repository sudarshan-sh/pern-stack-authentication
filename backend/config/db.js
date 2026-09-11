import { Pool } from "pg";
import dotenv from "dotenv"; // to load environment variables

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("Connection pool established with the DB!");
});

// when pool detects the error with the DB connection
pool.on("error", (err) => {
  console.error(`Database error: ${err}`);
});

export default pool;
