'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return [
        queryInterface.createTable('authors', {
          id_author: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: 'id_author_unique'
          },
          author_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          }
        }),
        queryInterface.createTable('publishing_houses', {
          id_publishing_house: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: 'id_publishing_house_unique'
          },
          publishing_house_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          }
        }),
        queryInterface.createTable('genres', {
          id_genre: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: 'id_genre_unique'
          },
          literary_genres_description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          }
        }),
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
          id_author: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
              model: {
                tableName: 'authors',
                schema: 'public'
              },
              key: 'id_author'
            },
            allowNull: false,
          },
          id_publishing_house: {
            type: Sequelize.DataTypes.INTEGER,
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
            type: Sequelize.DataTypes.INTEGER,
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
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
          }
        }),
        queryInterface.createTable('users', {
          id_user: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: 'id_user_unique'
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
                tableName: 'users',
                schema: 'public'
              },
              key: 'id_user'
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
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
