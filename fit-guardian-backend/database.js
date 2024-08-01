const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(".database/database.db");

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS users (
    userName TEXT NOT NULL,
    userEmail TEXT NOT NULL,
    userPassword TEXT NOT NULL
  )`);
});

module.exports = db;
