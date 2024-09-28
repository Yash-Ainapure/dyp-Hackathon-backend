import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const { Pool } = pg;
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.neonUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to database");
  release();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "User"');
    const users = result.rows;
    client.release();
    res.json(users);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
