require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./database");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5174;

app.use(express.json());
app.use(cors());

let users = [];

const validateEmail = email => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
};

const validatePassword = password => {
	return password.length >= 8;
};

app.post("/register", (req, res) => {
	const { userName, userEmail, userPassword } = req.body;

	db.get(`SELECT * FROM users WHERE userEmail = ? OR userName = ?`, [userName, userEmail], (err, row) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error!" });
		}
		if (row) {
			return res.status(400).json({ message: "User already exists!" });
		}
	});

	const newUser = { userName, userEmail, userPassword };

	db.run(
		`INSERT INTO users ( userName, userEmail, userPassword) VALUES (?, ?, ?, ?)`,
		[newUser.userName, newUser.userEmail, newUser.userPassword],
		err => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: "Internal server error" });
			}
			res.status(200).json({ message: "User registered successfully!" });
		}
	);

	res.status(200).json({ message: "User registered successfully!", users });
});

app.post("/login", (req, res) => {
	const { userEmail, userPassword } = req.body;
	const user = users.find(user => user.userEmail === userEmail || user.userPassword === userPassword);

	if (!user) {
		return res.status(401).json({ message: "Invalid username or password!" });
	}

	const payload = { userEmail: user.userEmail };
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

	res.status(200).json({
		message: "User logged successfully!",
		accessToken: accessToken,
		user,
	});
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
