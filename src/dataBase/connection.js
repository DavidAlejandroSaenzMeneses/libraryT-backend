const { Sequelize } = require('sequelize');
require('dotenv').config();
const environment = process.env;

const connection = (new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: false
    }
}));
module.exports = connection;