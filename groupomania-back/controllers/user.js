const bcrypt = require("bcrypt");
const db = require("../models");
const token = require("../middlewares/token");
const auth = require("../middlewares/auth");
const fs = require("fs");
const { Op } = require("sequelize");

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
				admin: false,
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
exports.getUser = async (req, res) => {
	// On cherche l'utilisateur dans la DB, pour lequel params.id est = id et on le stocke dans la const user
	try {
		const user = await db.User.findOne({
			where: { id: req.params.id },
		});
		//Renvoi l'objet user
		res.status(200).send(user);
	} catch (error) {
		return res.status(500).send({ error: "Erreur serveur" });
	}
};
exports.getAllUsers = async (req, res) => {
	try {
		const users = await db.User.findAll({
			attributes: ["id", "firstName", "lastName", "email"],
			where: {
				id: {
					[Op.ne]: 1,
				},
			},
		});
		res.status(200).send(users);
	} catch (error) {
		return res.status(500).send({ error: "Erreur Serveur" });
	}
};
exports.updateAccount = async (req, res) => {
	// modifier le profil
	const id = req.params.id;
	try {
		const userId = token.getUserId(req);
		let newPhoto;
		let user = await db.User.findOne({ where: { id: id } }); // on trouve le user
		if (userId === user.id) {
			if (req.file && user.photo) {
				newPhoto = `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`;
				const filename = user.photo.split("/pictures/")[1];
				fs.unlink(`pictures/${filename}`, (err) => {
					// s'il y avait déjà une photo on la supprime
					if (err) console.log(err);
					else {
						console.log(`Deleted file: pictures/${filename}`);
					}
				});
			} else if (req.file) {
				newPhoto = `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`;
			}
			if (newPhoto) {
				user.photo = newPhoto;
			}
			if (req.body.aboutMe) {
				user.aboutMe = req.body.aboutMe;
			}

			const newUser = await user.save({ fields: ["aboutMe", "photo"] }); // on sauvegarde les changements dans la bdd
			res.status(200).json({
				user: newUser,
				messageRetour: "Votre profil a bien été modifié",
			});
		} else {
			res.status(400).json({ messageRetour: "Vous n'avez pas les droits requis" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Erreur serveur" });
	}
};
