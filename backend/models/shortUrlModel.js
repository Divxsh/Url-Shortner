const sequelize = require("../database/postgres");
const Sequelize = require("sequelize");

const shortUrlModel = sequelize.define("short_url", {
	longUrl: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	shortUrl: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	urlCode: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	click: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
});

module.exports = shortUrlModel;
