'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
class Loan extends Model {
    static associate(models) {
    }
}
Loan.init({
    id_loan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: 'id_loan_unique'
    },
    id_book: {
        type: DataTypes.INTEGER,
        references: {
            model: {
                tableName: 'books',
                schema: 'public'
            },
            key: 'id_book'
        },
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: {
                tableName: 'users',
                schema: 'public'
            },
            key: 'id_user'
        },
        allowNull: false
    },
    date_record: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    date_return: {
        type: 'TIMESTAMP',
        allowNull: true
    },
    return_book: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'loan',
    timestamps: false
});
module.exports = Loan;