'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
class Genre extends Model {
    static associate(models) {
    }
}
Genre.init({
    id_genre: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: 'id_genre_unique'
    },
    literary_genres_description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'genre',
    timestamps: false
});
module.exports = Genre;