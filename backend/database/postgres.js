var Sequelize = require("sequelize");

var sequelize = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.DB,
	process.env.DATABASE_PASSWORD,
	{
		dialect: process.env.DB,
		host: process.env.HOST,
		logging: false,
		define: {
			timestamps: false,
		},
	},
);

sequelize.sync();

(() => {
	try {
		sequelize.authenticate();
		console.log("DataBase Connected Successfully");
	} catch (err) {
		console.log("Somethings went Wrong!!");
	}
})();

module.exports = sequelize;
