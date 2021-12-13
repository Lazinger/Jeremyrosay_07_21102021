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
exports.createPost = async (req, res) => {
	const userId = token.getUserId(req);
	let image;
	try {
		const user = await db.User.findOne({
			attributes: ["firstName", "id", "photo"],
			where: { id: userId },
		});
		if (user !== null) {
			if (req.file) {
				image = `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`;
			} else {
				image = null;
			}
			const post = await db.Post.create({
				include: [
					{
						model: db.User,
						attributes: ["firstName", "photo", "id"],
					},
				],
				message: req.body.message,
				image: image,
				UserId: user.id,
			});

			res.status(201).json({ post: post, messageRetour: "Votre post est ajouté" });
		} else {
			res.status(400).send({ error: "Erreur 400 controllers" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Erreur serveur controllers" });
	}
};

exports.deletePost = async (req, res) => {
	try {
		const userId = token.getUserId(req);
		const adminVerification = await db.User.findOne({ where: { id: userId } });
		const post = await db.Post.findOne({ where: { id: req.params.id } });
		if (userId === post.UserId || adminVerification.admin === true) {
			if (post.image) {
				const filename = post.image.split("/pictures")[1];
				fs.unlink(`pictures/${filename}`, () => {
					db.Post.destroy({ where: { id: post.id } });
					res.status(200).json({ message: "Post supprimé" });
				});
			} else {
				db.Post.destroy({ where: { id: post.id } }, { truncate: true });
				res.status(200).json({ message: "Post supprimé" });
			}
		} else {
			res.status(400).json({ message: "Vous n'avez pas les droits requis" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Erreur serveur" });
	}
};
