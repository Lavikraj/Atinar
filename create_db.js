import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";

(async () => {
  const db = await open({
    filename: "./auth.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Sample user
  const username = "testuser";
  const email = "testuser@example.com";
  const password = "1234";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    console.log("Sample user created: testuser / testuser@example.com / 1234");
  } catch {
    console.log("Sample user already exists");
  }

  await db.close();
})();
