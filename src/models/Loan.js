'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
        }
    }
    User.init({
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
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
    return User;
};