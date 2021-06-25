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

const authenticate = (req, res, next) => {
	const authHeader = req.headers.authorization; // base64
	if (authHeader) {
		const decodedAuth = new Buffer(authHeader.split(" ")[1], "base64"); // Basic jkht7q8dhja
		const [username, password] = decodedAuth.toString("utf-8").split(":"); //username:password
		// var username = decodedAuth.toString("utf-8").split(":")[0];
		// var password = decodedAuth.toString("utf-8").split(":")[1];
		const user = users.find(
			(u) => u.username == username && u.password == password
		);
		if (user) {
			req.user = user;
			next();
		} else {
			next({ message: "Unauthorized", status: 401 });
		}
	} else {
		next({ message: "Unauthorized", status: 403 });
	}
};

module.exports = authenticate;
