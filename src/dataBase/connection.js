const { Sequelize } = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];

const connection = (new Sequelize(config.database, config.username, config.password, config));
module.exports = connection;