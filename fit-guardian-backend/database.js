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
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL,
    userEmail TEXT NOT NULL UNIQUE,
    userPassword TEXT NOT NULL
	)`);

	db.run(`CREATE TABLE IF NOT EXISTS userChoices (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	userAge INTEGER NOT NULL,
	userGender TEXT NOT NULL,
	userHeight INTEGER NOT NULL,
	userWeight INTEGER NOT NULL,
	userGoal TEXT NOT NULL,
	userActivity TEXT NOT NULL
	)`);

	db.run(`CREATE TABLE IF NOT EXISTS userMeals (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	userEmail TEXT NOT NULL,
	foodID INTEGER NOT NULL,
	foodName TEXT NOT NULL,
	foodCalories INTEGER NOT NULL,
	foodProteins INTEGER NOT NULL,
	foodCarbs INTEGER NOT NULL,
	foodFats INTEGER NOT NULL,
	foodDate INTEGER NOT NULL
	)`);

	db.run(`CREATE TABLE IF NOT EXISTS userMacros (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	userEmail TEXT NOT NULL,
	userCalories INTEGER NOT NULL,
	userProteins INTEGER NOT NULL,
	userCarbs INTEGER NOT NULL,
	userFats INTEGER NOT NULL
	)`);
});

module.exports = db;
