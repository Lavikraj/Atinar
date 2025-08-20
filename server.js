import express from "express";
import bcrypt from "bcrypt";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import jwt from "jsonwebtoken";
import cors from "cors"; 

const app = express();
const port = 3000;
const SECRET = "supersecret"; // TODO: move to process.env in production

app.use(cors()); 

app.use(express.json());

// Open SQLite database
let db;
(async () => {
  db = await open({
    filename: "./auth.db",
    driver: sqlite3.Database,
  });

  // Create users table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      username TEXT UNIQUE,
      password TEXT
    )
  `);
})();

// ========================
// Signup route
// ========================
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [email, username, hashedPassword]
    );

    const user = await db.get("SELECT id, username, email FROM users WHERE email = ?", [email]);
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (err) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({ error: "Username or email already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// ========================
// Login route
// ========================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ========================
// Start server
// ========================
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// ========================
// Dummy Endpoints API
// ========================
const dummyEndpoints = [
  { id: 1, name: "Google", url: "https://google.com", interval: 60, status: "up" },
  { id: 2, name: "My API", url: "https://api.example.com", interval: 120, status: "down" },
];

// Get all endpoints
app.get("/endpoints", (req, res) => {
  res.json(dummyEndpoints);
});

// Add new endpoint
app.post("/endpoints", (req, res) => {
  const { name, url, interval } = req.body;
  const newEndpoint = {
    id: dummyEndpoints.length + 1,
    name,
    url,
    interval,
    status: "unknown",
  };
  dummyEndpoints.push(newEndpoint);
  res.json(newEndpoint);
});

// Delete endpoint
app.delete("/endpoints/:id", (req, res) => {
  const { id } = req.params;
  const index = dummyEndpoints.findIndex(ep => ep.id === parseInt(id));
  if (index !== -1) {
    dummyEndpoints.splice(index, 1);
    return res.json({ success: true });
  }
  res.status(404).json({ error: "Not found" });
});

