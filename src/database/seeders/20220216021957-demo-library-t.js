'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('books', [{
          title: 'La Metamorfosis',
          author_name: 'Franz Kafka',
          prologue: 'Gregorio Samsa es un comerciante que trabaja para mantener a su familia y vive agobiado por sus condiciones de trabajo. Una manana, despierta convertido en un insecto que llena de terror a su hermana y a sus padres, situacion que pondra a todos en un serio predicamento. Esta historia coloca en perspectiva los pesares de la vida cotidiana mediante el uso de la fantasia, y te lleva a reflexionar si realmente estarias mejor de otra manera.',
          genre: 'Literatura Fantastica',
          image: 'metamorfosis.jpg'
        }, {
          title: 'Iliada',
          author_name:'Homero',
          prologue: 'La Ilíada de Homero, uno de los logros más importantes de la literatura occidental, narra el episodio más oscuro de la guerra de Troya. En el centro está Aquiles, el mayor guerrero-campeón de los griegos y su negativa a luchar tras ser humillado por su líder Agamenón. Pero cuando el troyano Héctor mata a Patroclo, el amigo íntimo de Aquiles, éste vuelve a la batalla para vengarse, aunque sabe que esto le asegurará una muerte temprana. En esta trágica secuencia de acontecimientos se entremezclan descripciones poderosamente conmovedoras del flujo y reflujo de la batalla, del mundo doméstico dentro de la ciudad asediada de Troya, Ilión, y de los conflictos entre los dioses en el Olimpo mientras discuten sobre el destino de los mortales.',
          genre: 'Pesia',
          image: 'illiada.jpg'
        }, {
          title: 'El mito de Sisifo',
          author_name: 'Albert Camus',
          prologue: `ElmitodeSísifo es el ensayo fundacional de la filosofía del absurdo, una obra mayúscula que dio a conocer el gran talento de Albert Camus. Publicada en 1942, el mismo año que Elextranjero, fue una de las primeras obras que revelaron al público la inteligencia y la sensibilidad del autor.
          El título del ensayo hace referencia a un personaje de la mitología griega que enfadó a los dioses por su extraordinaria astucia y fue condenado a empujar perpetuamente una piedra enorme montaña arriba. Al llegar a la cima, la piedra volvía a caer hasta el valle, desde donde Sísifo debía volver a empujarla hasta la cumbre, y así eternamente. Por medio de esta alegoría, Camus discute la cuestión del suicidio y el valor de la vida, presentando a Sísifo como imagen del esfuerzo inútil e incesante del hombre. De este modo plantea la filosofía del absurdo, según la cual nuestras vidas son insignificantes y no tienen más valor que el de lo que creamos. Siendo el mundo tan fútil, pregunta Camus, ¿qué alternativa hay al suicidio?`,
          genre: 'Filosofia',
          image: 'sisifo.jpg'
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
      queryInterface.bulkDelete('genres', null, {}),
      queryInterface.bulkDelete('users', null, {})
    ];
  }
};
