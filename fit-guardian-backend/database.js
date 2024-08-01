const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.resolve(__dirname, "database", "database.db");

const db = new sqlite3.Database(dbPath, err => {
	if (err) {
		console.error("Error opening database", err.message);
	} else {
		console.log("Connected to the SQLite database.");
	}
});

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS users (
    userName TEXT NOT NULL,
    userEmail TEXT NOT NULL UNIQUE,
    userPassword TEXT NOT NULL
  )`);

	db.run(`CREATE TABLE IF NOT EXISTS userMeals (
	userEmail TEXT NOT NULL,
	foodID INTEGER NOT NULL,
	foodName TEXT NOT NULL,
	foodCalories INTEGER NOT NULL,
	foodProteins INTEGER NOT NULL,
	foodCarbs INTEGER NOT NULL,
	foodFats INTEGER NOT NULL
	)`);
});

module.exports = db;
