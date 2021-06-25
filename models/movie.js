var movie = (sequelize, DataTypes) => {
	return sequelize.define(
		"movie",
		{
			name: DataTypes.STRING,
			year: DataTypes.DATE,
			rating: DataTypes.DOUBLE,
		},
		{
			timestamps: false,
		}
	);
};

module.exports = movie;
