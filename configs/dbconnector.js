const config = {
	host: "localhost",
	database: "REST",
	username: "postgres",
	password: "admin123",
	port: 5432,
	dialect: "postgres",
};

var Sequelize = require("sequelize");
var sequelize = new Sequelize(config);

module.exports = sequelize;
