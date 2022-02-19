const { Sequelize } = require('sequelize');
require('dotenv').config();
const environment = process.env;

const connection = (new Sequelize(environment.DB_NAME, environment.DB_USER, environment.DB_PASS, {
    host: environment.DB_HOST,
    dialect: 'postgres',
    define: {
        timestamps: false
    }
}));
module.exports = connection;