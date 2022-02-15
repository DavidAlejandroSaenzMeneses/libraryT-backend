'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        id_book: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: 'id_book_unique'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_author: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_publishing_house: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_literary_genre: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'book',
        timestamps: false
    });
    return User;
};