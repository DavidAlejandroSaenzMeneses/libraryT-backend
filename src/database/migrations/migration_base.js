'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return [
        queryInterface.createTable('books', {
          id_book: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: 'id_book_unique'
          },
          title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          author_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          prologue: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false
          },
          genre: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          stock: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
          },
          image: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
          }
        }),
        queryInterface.createTable('library_users', {
          id_library_user: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: 'id_library_user_unique'
          },
          identification: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          full_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          phone_number: {
            type: Sequelize.DataTypes.NUMERIC,
            allowNull: false
          }
        }),
        queryInterface.createTable('loans', {
          id_loan: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: 'id_loan_unique'
          },
          id_book: {
            type: Sequelize.DataTypes.INTEGER,
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
            type: Sequelize.DataTypes.INTEGER,
            references: {
              model: {
                tableName: 'library_users',
                schema: 'public'
              },
              key: 'id_library_user'
            },
            allowNull: false
          },
          date_record: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          },
          date_return: {
            type: 'TIMESTAMP',
            allowNull: true
          },
          return_book: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
          }
        })
      ];

    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
