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
				res.status(200).json({ message: "User registered successfully!", users: newUser });
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

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
