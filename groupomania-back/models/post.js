"use strict";
const { Model } = require("sequelize");
const { DataTypes } = require("Sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Post.belongsTo(models.User, {
				foreignKey: {
					allowNull: false,
				},
				onDelete: "CASCADE",
			});
		}
	}
	Post.init(
		{
			message: { type: DataTypes.TEXT, allowNull: false },
			image: { type: DataTypes.STRING, allowNull: true },
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
