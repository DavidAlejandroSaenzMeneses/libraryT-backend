const Author = require('../models/Author');
const validator = require('validator');

module.exports = {
    read: async (req, res) => {
        const idAuthor = (req.params.idAuthor !== undefined) ? req.params.idAuthor : '';
        const validateIdAuthor = !validator.isEmpty(idAuthor);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdAuthor) {
            try {
                const authorData = await Author.findOne({ where: { id_author: idAuthor } });
                if (!authorData) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'resource not found'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    authorData
                });
            } catch (error) {
                return res.status(404).send({
                    status: 'error2',
                    message: error
                })
            }
        }
        try {
            const authorData = await Author.findAll();
            if (!authorData) {
                return res.status(404).send({
                    status: 'error',
                    message: 'resource not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                authorData
            });

        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error
            })
        }

    }
}