'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
class Book extends Model {
    static associate(models) {
    }
}
Book.init(
    {
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
        author_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prologue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
    sequelize,
    modelName: 'book',
    timestamps: false
}
);
Book.associate = function (models) {
    //Book.belongsTo(Author,{primaryKey:'id_author'});
    Book.belongsTo(models.Author);
}
module.exports = Book;