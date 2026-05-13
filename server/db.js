const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./app.db");

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      description TEXT,
      completed INTEGER DEFAULT 0,
      created_at TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  // Seed user
  db.run(
    `INSERT OR IGNORE INTO users (username, password) VALUES ('kittycat','1234')`,
  );
});

module.exports = db;