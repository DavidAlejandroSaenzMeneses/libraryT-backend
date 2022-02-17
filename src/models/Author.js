'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class Author extends Model { }
Author.init({
    id_author: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: 'id_author_unique'
    },
    author_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'author',
    timestamps: false
});
module.exports = Author;