const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req, res, next) {

  try {
		const jwtTokenFromClient = req.header("token");

		if (!jwtTokenFromClient) {
			return res.status(403).json("Not Authozied");
		}

		//jwt.verify compair 'token from client' and secretKeyFrom and if 'jwtTokenFromClient' and 'SECRET_KEY_FOR_BCRYPT' matched the its return payload
		const payload = jwt.verify(jwtTokenFromClient, process.env.jwtSecret);

		req.user = payload;
   
		next();
	} catch (e) {
		console.error(e.message);
		return res.status(403).json("Not Authozied");
	}




  // // Get token from header
  // let token = req.headers['x-access-token'];


  // if (!token) {
  //   return res.status(403).json({
  //     errors: [
  //       {
  //         msg: "unauthorized",
  //       },
  //     ],
  //   });
  // }

  // token = token.split(" ")[1];

  // try {
  //   const payload= jwt.verify(token, process.env.jwtSecret)
   
  //   req.user=payload
  //   next();

  // }catch(err) {
  //   res.status(401).json({ msg: "Token is not valid" });
  // }

  



};