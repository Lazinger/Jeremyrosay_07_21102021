"use strict";
const { DataTypes } = require("Sequelize");
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("posts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
					key: "id",
				},
			},
			message: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			image: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("posts");
	},
};
