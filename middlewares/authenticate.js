var jwt = require("jsonwebtoken");

const accessTokenSecret = "s3crettoken";

const authenticate = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, accessTokenSecret, (err, user) => {
			if (err) {
				next({ message: "Unauthorized", status: 403 });
			}
			req.user = user;
			next();
		});
	} else {
		next({ message: "Unauthorized", status: 401 });
	}
};

module.exports = authenticate;
