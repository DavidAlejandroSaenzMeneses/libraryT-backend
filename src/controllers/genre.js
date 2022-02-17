const Genre = require('../models/Genre');
const validator = require('validator');

module.exports = {
    read: async (req, res) => {
        const idGenre = (req.params.idGenre !== undefined) ? req.params.idGenre : '';
        const validateIdGenre = !validator.isEmpty(idGenre);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdGenre) {
            try {
                const genreData = await Genre.findOne({ where: { id_genre: idGenre } });
                if (!genreData) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'resource not found'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    genreData
                });
            } catch (error) {
                return res.status(404).send({
                    status: 'error2',
                    message: error
                })
            }
        }
        try {
            const genreData = await Genre.findAll();
            if (!genreData) {
                return res.status(404).send({
                    status: 'error',
                    message: 'resource not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                genreData
            });

        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error
            })
        }

    }
}