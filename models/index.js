var DataTypes = require("sequelize");
var sequelize = require("../configs/dbconnector");

var models = {};

models.Movie = require("./movie")(sequelize, DataTypes);

module.exports = models;
