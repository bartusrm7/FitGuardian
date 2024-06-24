const express = require("express");
const cors = require("cors");

const app = express();
const port = 5174;

app.use(express.json());
app.use(cors());

let users = [];

app.post("/register", (req, res) => {
	const { userName, userEmail, userPassword } = req.body();
	const userExist = users.filter(
		user => user.userName === userName || user.userEmail === userEmail || user.userPassword === userPassword
	);

	if (userExist) {
		return res.status(400).json({ message: "User already exists!" });
	}
	if (!validateEmail(userEmail)) {
		return res.status(400).json({ message: "Invalid email format!" });
	}
	if (!validatePassword(userPassword)) {
		return res.status(400).json({ message: "Password is to short!" });
	}
});

app.post("/login", (req, res) => {});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
