'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
class PublishingHouse extends Model {
    static associate(models) {
    }
}
PublishingHouse.init({
    id_publishing_house: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: 'id_publishing_house_unique'
    },
    publishing_house_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'publishing_house',
    timestamps: false
});
module.exports = PublishingHouse;