const express = require("express");
const helmet = require("helmet");
const path = require("path");
const { sequelize } = require("./models/index");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	res.setHeader("Acces-Control-Max-Age", "86400");

	next();
});

//routes
app.use("", userRoutes);
app.use("", postRoutes);
app.use("/pictures", express.static(path.join(__dirname, "pictures")));

const syncDatabase = async function () {
	await sequelize.sync({ alter: true });
	require("./config/admin");
};
const databaseTestConnection = async function () {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
databaseTestConnection();
syncDatabase();

module.exports = app;
