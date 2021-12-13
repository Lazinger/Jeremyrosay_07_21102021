"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.User.hasMany(models.Post);
		}
	}
	User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			photo: DataTypes.STRING,
			aboutMe: DataTypes.STRING(500),
			admin: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
