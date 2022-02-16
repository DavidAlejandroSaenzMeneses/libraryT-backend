'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('authors', [{
          author_name: 'Julio Verne'
        }, {
          author_name: 'Homero'
        }, {
          author_name: 'franz kafka'
        },{
          author_name: 'Herman Melville'
        },{
          author_name: 'J. R. R. Tolkien'
        }], { transaction: t }),
        queryInterface.bulkInsert('publishing_houses', [{
          publishing_house_name: 'Tusquets'
        }, {
          publishing_house_name: 'Marcombo'
        }, {
          publishing_house_name: 'Harpercollins'
        },{
          publishing_house_name: 'Planeta'
        },{
          publishing_house_name: 'Minotauro'
        }], { transaction: t }),
        queryInterface.bulkInsert('genres', [{
          literary_genres_description: 'Narrativo'
        }, {
          literary_genres_description: 'Lirico'
        }, {
          literary_genres_description: 'Dramático'
        }, {
          literary_genres_description: 'Novela'
        }, {
          literary_genres_description: 'Autoayuda'
        }], { transaction: t }),
        queryInterface.bulkInsert('books', [{
          title: 'La Metamorfosis',
          id_author: Math.ceil(Math.random() * (5 - 1)),
          id_publishing_house: Math.ceil(Math.random() * (5 - 1)),
          id_genre: Math.ceil(Math.random() * (5 - 1)),
          image: 'metamorfosis.jpg'
        }, {
          title: 'Iliada',
          id_author: Math.ceil(Math.random() * (5 - 1)),
          id_publishing_house: Math.ceil(Math.random() * (5 - 1)),
          id_genre: Math.ceil(Math.random() * (5 - 1)),
          image: 'illiada.jpg'
        }, {
          title: 'El Sutil Arte de que todo te Importe un carajo',
          id_author: Math.ceil(Math.random() * (5 - 1)),
          id_publishing_house: Math.ceil(Math.random() * (5 - 1)),
          id_genre: Math.ceil(Math.random() * (5 - 1)),
          image: 'sutil_arte.jpg'
        }], { transaction: t }),
        queryInterface.bulkInsert('library_users', [{
          identification: 'CC-12345',
          full_name: 'Bruce Wayne',
          phone_number: 3165904580
        }, {
          identification: 'CC-67890',
          full_name: 'Peter Parker',
          phone_number: 3005908050
        }, {
          identification: 'CC-010707',
          full_name: 'Stan Lee',
          phone_number: 3018274612
        }], { transaction: t })
      ])
    });
  },

  async down(queryInterface, Sequelize) {
    return [
      queryInterface.bulkDelete('authors', null, {}),
      queryInterface.bulkDelete('publishing_houses', null, {}),
      queryInterface.bulkDelete('genres', null, {}),
      queryInterface.bulkDelete('users', null, {})
    ];
  }
};
