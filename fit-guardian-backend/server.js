require("dotenv").config();

const express = require("express");
const cors = require("cors");
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
	const newUser = { userName, userEmail, userPassword };
	const userExist = users.some(user => user.userName === userName || user.userEmail === userEmail);

	if (userExist) {
		return res.status(400).json({ message: "User already exists!" });
	}
	if (!validateEmail(userEmail)) {
		return res.status(400).json({ message: "Invalid email format!" });
	}
	if (!validatePassword(userPassword)) {
		return res.status(400).json({ message: "Password is to short!" });
	}

	users.push(newUser);
	res.status(200).json({ message: "User registered successfully!", users });
});

app.post("/login", (req, res) => {
	const { userName, userEmail, userPassword } = req.body;
	const user = users.some(
		user => user.userName === userName || user.userEmail === userEmail || user.userPassword === userPassword
	);
	if (!user) {
		return res.status(400).json({ message: "Invalid username or password!" });
	}

	const payload = { userEmail: user.userEmail };
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

	res.json({ accessToken: accessToken });
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
