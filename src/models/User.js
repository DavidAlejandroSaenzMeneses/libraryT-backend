'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

class User extends Model {}
User.init({
  id_library_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: 'id_library_user_unique'
  },
  identification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.NUMERIC,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'library_users',
  timestamps: false
});
User.associate = function (models) {
  User.Loan = User.hasMany(models.Loan, { foreignKey: 'id_book', targetKey: 'id_book', as: 'loans' });
}
module.exports = User;