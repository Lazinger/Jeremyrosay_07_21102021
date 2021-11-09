const express = require("express");
const helmet = require("helmet");
const { sequelize } = require("./models/index");

const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.use("", userRoutes);

const databaseTestConnection = async function () {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
databaseTestConnection();

module.exports = app;
