'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Book = require('./Book')

class Author extends Model {
    static associate(models) {
        Author.hasMany(models.Book,{
            foreignKey:'id_author',
            as: 'books'
        });
    }
 }
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
Author.associate = function (models) {
    Author.hasMany(models.Book,{foreignKey: 'id_author',as:'books'});
};

module.exports = Author;