const bcrypt = require("bcrypt");
const db = require("../models");
const token = require("../middlewares/token");
// const fs = require("fs");

// exports.login = async (req, res) => {
// 	try {
// 		const user = await db.User.findOne({
// 			where: { email: req.body.email },
// 		}); // Check if the mail adress exist in the Database
// 		if (user === null) {
// 			return res.status(401).send({ error: "Utilisateur non trouvé" });
// 		}
// 		const hash = await bcrypt.compare(req.body.password, user.password); // Compare passwords
// 		if (!hash) {
// 			return res.status(401).send({ error: "Mot de passe incorrect !" });
// 		}
// 		const tokenObject = await token.issueJwt(user);
// 		res.status(200).send({
// 			// Return User and Token
// 			user: user,
// 			token: tokenObject.token,
// 			sub: tokenObject.sub,
// 			expires: tokenObject.expiresIn,
// 			message: "Bonjour " + user.firstName + " !",
// 		});
// 	} catch (error) {
// 		return res.status(500).send({ error: "Erreur serveur" });
// 	}
// };

// exports.login = async (req, res) => {
// 	try {
// 		const user = await db.User.findOne({
// 			where: { email: req.body.email },
// 		});
// 		if (user === null) {
// 			return res.status(400).send({ error: "Utilisateur non trouvé" });
// 		} else {
// 			console.log("C'est bon j'ai ton email");
// 		}
// 		const mdp = await db.User.findOne({
// 			where: { password: req.body.password },
// 		});
// 		if (mdp === null) {
// 			return res.status(400).send({ error: "Password manquant ou erroné" });
// 		} else {
// 			console.log("C'est bon j'ai ton mdp");
// 		}
// 	} catch (error) {
// 		return res.status(500).send({ error: "Erreur serveur" });
// 	}
// };

exports.signup = async (req, res) => {
	try {
		const user = await db.User.findOne({
			where: { email: req.body.email },
		});
		if (user !== null) {
			if (user.email === req.body.email) {
				return res.status(400).json({ error: "cet email est déjà utilisé" });
			}
		} else {
			const hash = await bcrypt.hash(req.body.password, 10);
			const newUser = await db.User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hash,
			});
			const tokenObject = await token.issueJwt(newUser);
			res.status(201).send({
				user: newUser,
				token: tokenObject.token,
				expires: tokenObject.expiresIn,
				message: `Votre compte est bien créé ${newUser.firstName} !`,
			});
		}
	} catch (error) {
		return res.status(400).send({ error: "email déjà utilisé" });
	}
};

// exports.login = (req, res, next) => {
// 	try {
// 		db.User.findOne({ where: { email: req.body.email } }).then((user) => {
// 			if (!user) {
// 				return res.status(401).json({ error: "Utilisateur non trouvé" });
// 			}
// 			db.User.findOne({ where: { password: req.body.password } })
// 				.then((valid) => {
// 					if (!valid) {
// 						return res.status(401).json({ error: "Password non trouvé" });
// 					}
// 					res.status(200).send({
// 						// on renvoie le user et le token
// 						user: user,
// 						// token: tokenObject.token,
// 						// sub: tokenObject.sub,
// 						// expires: tokenObject.expiresIn,
// 						message: "Bonjour " + user.firstName + " !",
// 					});
// 				})
// 				.catch((error) => res.status(500).json({ error }));
// 		});
// 	} catch (error) {
// 		return res.status(500).json({ error });
// 	}
// };

exports.login = async (req, res) => {
	try {
		const user = await db.User.findOne({
			where: { email: req.body.email },
		}); // on vérifie que l'adresse mail figure bien dan la bdd
		if (user === null) {
			return res.status(403).send({ error: "Connexion échouée" });
		} else {
			const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
			if (!hash) {
				return res.status(401).send({ error: "Mot de passe incorrect !" });
			} else {
				const tokenObject = await token.issueJwt(user);
				res.status(200).send({
					// on renvoie le user et le token
					user: user,
					token: tokenObject.token,
					sub: tokenObject.sub,
					expires: tokenObject.expiresIn,
					message: "Bonjour " + user.firstName + " !",
				});
			}
		}
	} catch (error) {
		return res.status(500).send({ error: "Erreur serveur" });
	}
};
