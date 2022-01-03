const jwt = require("jsonwebtoken");
require("dotenv").config();

const TOKEN = process.env.JWT_TOKEN;

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]; // on récupère le token de la requête entrante

		const decodedToken = jwt.verify(token, `${TOKEN}`); // on le vérifie

		const userId = decodedToken.sub; // on récupère l'id du token

		if (req.body.userId && req.body.userId !== userId) {
			// on compare le userid de la requête à celui du token
			throw "User id non valable !";
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ error: new Error("Invalid request !") });
	}
};
