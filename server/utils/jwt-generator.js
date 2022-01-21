const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (user) => {
	const payload = {
		...user,
	};
	return await jwt.sign(payload, process.env.jwtSecret, {
		expiresIn: "2 days",
	});
};