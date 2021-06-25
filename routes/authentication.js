var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

const users = [
	{
		username: "galihanggara",
		password: "admin123",
		role: "admin",
	},
	{
		username: "ujang",
		password: "user123",
		role: "member",
	},
];

const accessTokenSecret = "s3crettoken";

router.post("/login", (req, res, next) => {
	const { username, password } = req.body;
	const user = users.find(
		(u) => u.username === username && u.password === password
	);
	if (user) {
		const accessToken = jwt.sign(user, accessTokenSecret, {
			expiresIn: "10m",
		});
		res.json({ accessToken });
	} else {
		res.send({ message: "invalid credentials" });
	}
});

router.post("/login/basic", (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		var buff = new Buffer(authHeader.split(" ")[1], "base64");
		const decodedCred = buff.toString("utf8");
		var username = decodedCred.split(":")[0];
		var password = decodedCred.split(":")[1];

		const user = users.find(
			(u) => u.username === username && u.password === password
		);
		if (user) {
			const accessToken = jwt.sign(user, accessTokenSecret, {
				expiresIn: "10m",
			});
			res.json({ accessToken });
		} else {
			res.send({ message: "invalid credentials" });
		}
	} else {
		res.send({ message: "invalid credentials" });
	}
});

module.exports = router;
