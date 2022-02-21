const fileSystem = require('fs');
const path = require('path');
const validator = require('validator');
const Book = require('../models/Book');

module.exports = {
    read: async (req, res) => {
        const idBook = (req.params.idBook !== undefined) ? req.params.idBook : '';
        const validateIdBook = !validator.isEmpty(idBook);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdBook) {
            try {
                const result = await Book.findOne({
                    where: { id_book: idBook }
                });
                if (!result) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'resource not found'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    result
                });
            } catch (error) {
                return res.status(404).send({
                    status: 'error2',
                    message: error
                })
            }
        }
        try {
            const result = await Book.findAll({
            });
            if (!result) {
                return res.status(404).send({
                    status: 'error',
                    message: 'resource not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                result
            });

        } catch (error) {
            throw new Error(error);
            return res.status(500).send({
                status: 'error',
                message: error
            })
        }

    },
    getImage: (req, res) => {
        const file = req.params.imageBook;
        const pathFile = './src/image/' + file;
        fileSystem.exists(pathFile, (exist) => {
            if (exist) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(500).send({
                    status: 'success',
                    message: 'la imagen no existe'
                });
            }
        });
    }
}