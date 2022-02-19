const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
require('dotenv').config();
const environment = process.env;

const createConnectionDB = async () => {
    const sequelizeConnect = new Sequelize(environment.DB_NAME, environment.DB_USER, environment.DB_PASS, {
        host: environment.DB_HOST,
        dialect: 'postgres',
        logging: false,
        define: {
            timestamps: false
        }
    });

    const db = {};

    // Sequelize and methods
    db.Sequelize = Sequelize;
    db.sequelizeConnect = sequelizeConnect;
    db.Op = Sequelize.Op;

    // Models
    db.books = require("./Book")(sequelizeConnect, Sequelize);
    db.author = require("./Author")(sequelizeConnect, Sequelize);
    // Create Associations

    // Category ->  Articles
    db.books.belongsTo(db.author, { foreignKey: 'id_author' })
    db.author.hasMany(db.books, { foreignKey: 'id_author' })


    // Synchonize Database when it is need
    //db.sequelizeConnect.sync();
    db.sequelizeConnect.authenticate();

    return Promise.resolve(db)
}

module.exports = createConnectionDB;