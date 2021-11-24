const jwt = require("jsonwebtoken");
require("dotenv").config();

const TOKEN = process.env.JWT_TOKEN;

function issueJwt(user) {
	// Génération du token
	const id = user.id;
	const expiresIn = "24H";
	const payload = {
		sub: id, // sub : sujet (subject) du jeton
		iat: Date.now(), // iat : date à laquelle a été créé le jeton (issued at)
	};
	const signedToken = jwt.sign(payload, `${TOKEN}`, { expiresIn: expiresIn });
	console.log(signedToken);
	return {
		token: "Bearer " + signedToken,
		expires: expiresIn,
	};
}

function getUserId(req) {
	// on vérifie le userId du token
	const token = req.headers.authorization.split(" ")[1]; // on récupère le token de la requête entrante
	const decodedToken = jwt.verify(token, `${TOKEN}`); // on le vérifie
	const userId = decodedToken.sub;
	return userId; // on récupère l'id du token
}

module.exports.issueJwt = issueJwt;
module.exports.getUserId = getUserId;
