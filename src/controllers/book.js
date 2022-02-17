const Book = require('../models/Book');
const validator = require('validator');

module.exports = {
    read: async (req, res) => {
        const idBook = (req.params.idBook !== undefined) ? req.params.idBook : '';
        const validateIdBook = !validator.isEmpty(idBook);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdBook) {
            try {
                const bookData = await Book.findOne({ where: { id_book: idBook } });
                if (!bookData) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'resource not found'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    bookData
                });
            } catch (error) {
                return res.status(404).send({
                    status: 'error2',
                    message: error
                })
            }
        }
        try {
            const bookData = await Book.findAll();
            if (!bookData) {
                return res.status(404).send({
                    status: 'error',
                    message: 'resource not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                bookData
            });

        } catch (error) {
            throw new Error(error);
            return res.status(500).send({
                status: 'error',
                message: error
            })
        }

    }
}