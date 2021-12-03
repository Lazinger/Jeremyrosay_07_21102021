const token = require("../middlewares/token");
const db = require("../models"); // accès tables
const fs = require("fs"); //

exports.getAllPosts = async (req, res, next) => {
	try {
		const posts = await db.Post.findAll({
			attributes: ["id", "message", "image", "createdAt"],
			order: [["createdAt", "DESC"]],
			include: [
				{
					model: db.User,
					attributes: ["id", "firstName", "photo"],
				},
			],
		});
		res.status(200).send(posts);
	} catch (error) {
		return res.error(500).send({
			error: "Erreur serveur - Impossible de récuperer les posts",
		});
	}
};
