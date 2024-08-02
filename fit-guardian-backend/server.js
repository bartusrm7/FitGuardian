require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5174;

app.use(express.json());
app.use(cors());

const validateEmail = email => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
};

const validatePassword = password => {
	return password.length >= 8;
};

const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.status(401).json({ message: "Unauthorized" });

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json({ message: "Forbidden" });

		req.user = user;
		next();
	});
};

app.post("/user-data", verifyToken, (req, res) => {
	const userEmail = req.user.userEmail;

	db.get(`SELECT userName, userEmail FROM users WHERE userEmail = ?`, [userEmail], (err, row) => {
		if (err) {
			return res.status(500).json({ message: "Database error!" });
		}
		if (!row) {
			return res.status(404).json({ message: "User not found!" });
		}
		res.json({ userName: row.userName, userEmail: row.userEmail });
	});
});

app.post("/register", (req, res) => {
	const { userName, userEmail, userPassword } = req.body;

	if (!validateEmail(userEmail)) {
		return res.status(400).json({ message: "Invalid email format!" });
	}
	if (!validatePassword(userPassword)) {
		return res.status(400).json({ message: "Password is too short!" });
	}

	const newUser = { userName, userEmail, userPassword };

	db.get("SELECT * FROM users WHERE userEmail = ? OR userName = ?", [userEmail, userName], (err, row) => {
		if (err) {
			return res.status(500).json({ message: "Database error!", error: err.message });
		}
		if (row) {
			return res.status(400).json({ message: "User already exists!" });
		}

		db.run(
			"INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)",
			[newUser.userName, newUser.userEmail, newUser.userPassword],
			function (err) {
				if (err) {
					return res.status(500).json({ message: "Error inserting user!", error: err.message });
				}
				const payload = { userEmail: newUser.userEmail };
				const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
				res.status(200).json({
					message: "User registered successfully!",
					accessToken: accessToken,
					user: { userName: newUser.userName, userEmail: newUser.userEmail },
				});
			}
		);
	});
});

app.post("/login", (req, res) => {
	const { userEmail, userPassword } = req.body;

	db.get("SELECT * FROM users WHERE userEmail = ? AND userPassword = ?", [userEmail, userPassword], (err, row) => {
		if (err) {
			return res.status(500).json({ message: "Database error!", error: err.message });
		}
		if (!row) {
			return res.status(401).json({ message: "Invalid username or password!" });
		}

		const payload = { userEmail: row.userEmail };
		const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

		res.status(200).json({
			message: "User logged in successfully!",
			accessToken: accessToken,
			user: row,
		});
	});
});

app.post("/add-meal", (req, res) => {
	const { userEmail, foodID, foodName, foodCalories, foodProteins, foodCarbs, foodFats, foodDate } = req.body;

	if (
		!userEmail ||
		!foodID ||
		!foodName ||
		foodCalories == null ||
		foodProteins == null ||
		foodCarbs == null ||
		foodFats == null ||
		foodDate == null
	) {
		return res.status(400).json({ message: "All fields are required." });
	}
	const query = `INSERT INTO userMeals (userEmail, foodID, foodName, foodCalories, foodProteins, foodCarbs, foodFats, foodDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
	db.run(
		query,
		[userEmail, foodID, foodName, foodCalories, foodProteins, foodCarbs, foodFats, foodDate],
		function (err) {
			if (err) {
				return res.status(500).json({ message: "Database error!", error: err.message });
			}
			res.status(200).json({ message: "Meal added successfully!", mealID: this.lastID });
		}
	);
});

app.post("/food-info", (req, res) => {
	const { userEmail } = req.body;
	if (!userEmail) {
	}
	const query = `SELECT foodName, foodCalories, foodProteins, foodCarbs, foodFats, foodDate FROM userMeals WHERE userEmail = ?`;
	db.all(query, [userEmail], (err, rows) => {
		if (err) {
			return res.status(500).json({ message: "Database error!", error: err.message });
		}
		res.status(200).json({ meals: rows });
	});
});

app.post("/save-user-data", (req, res) => {
	const { userAge, userGender, userHeight, userWeight, userGoal, userActivity } = req.body;
	if (!userAge || !userGender || !userHeight || !userWeight || !userGoal || !userActivity) {
		return res.status(400).json({ message: "All fields are required." });
	}
	const query = `INSERT INTO userChoices (userAge, userGender, userHeight, userWeight, userGoal, userActivity) VALUES (?, ?, ?, ?, ?, ?)`;
	db.run(query, [userAge, userGender, userHeight, userWeight, userGoal, userActivity], err => {
		if (err) {
			return res.status(500).json({ message: "Database error!", error: err.message });
		}
		res.status(200).json({ message: "User data saved successfully." });
	});
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
