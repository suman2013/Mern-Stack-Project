const express = require("express");
const app = express();
const port = 3000;

//Practicing sample routes

app.get("/", (req, res) => {
	return res.send("Home Page");
});

app.get("/login", (req, res) => {
	return res.send("You are visiting login route");
});

app.get("/logout", (req, res) => {
	return res.send("Hey, You are signed out successfully");
});

app.get("/signup", (req, res) => {
	return res.send("You are visiting signup page");
});

app.get("/user", (req, res) => {
	res.send("Suman is using Githun");
});

//Sample middleware
const admin = (req, res) => {
	return res.send("Admin Dashboard");
}

const isAdmin = (req, res, next) => {
	console.log("isAdmin is running");
	next();
}

const isLoggedIn = (req, res, next) => {
	console.log("Admin log in");
	next();
}

app.get("/admin", isLoggedIn, isAdmin, admin);

app.listen(port, () => {
	console.log("test app is running");
});
