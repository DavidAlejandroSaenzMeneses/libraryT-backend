'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Author = require('./Author');
const Genre = require('./Genre')
const PublishingHouse = require('./PublishingHouse');
class Book extends Model {
    static associate(models) {
    }
}
Book.init({
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
        references: {
            model: {
                tableName: 'authors',
                schema: 'public'
            },
            key: 'id_author'
        },
        allowNull: false
    },
    prologue:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id_publishing_house: {
        type: DataTypes.INTEGER,
        references: {
            model: {
                tableName: 'publishing_houses',
                schema: 'public'
            },
            key: 'id_publishing_house'
        },
        allowNull: false
    },
    id_genre: {
        type: DataTypes.INTEGER,
        references: {
            model: {
                tableName: 'genres',
                schema: 'public'
            },
            key: 'id_genre'
        },
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
});
Book.associate = function (models){
    //Book.belongsTo(Author,{primaryKey:'id_author'});
    Book.belongsTo(models.Author,{foreignKey:'id_author'});
}
//Book.hasOne(Genre,{foreignKey:'id_genre'});
//Book.hasOne(PublishingHouse,{foreignKey:'id_publishing_house'});
module.exports = Book;