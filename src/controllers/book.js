const fileSystem = require('fs');
const path = require('path');
const validator = require('validator');
const Book = require('../models/Book');
const Loan = require('../models/Loan');
module.exports = {
    read: async (req, res) => {
        const idBook = (req.params.idBook !== undefined) ? req.params.idBook : '';
        const validateIdBook = !validator.isEmpty(idBook);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdBook) {
            try {
                const result = await Book.findOne({
                    include: [
                        {
                            model: Loan,
                            association: Loan.Book,
                            where: { return_book: false },
                            required: false
                        }
                    ],
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
                include: [
                    {
                        model: Loan,
                        association: Loan.Book,
                        where: { return_book: false },
                        required: false,
                        as: 'loan_book'
                    }
                ],
                order: [['id_book', 'DESC']]
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
    update: async (req, res) => {
        const idBook = req.params.idBook;
        const params = req.body;
        const validateTitle = !validator.isEmpty(params.title);
        const validateAuthor = !validator.isEmpty(params.author_name);
        const validatePrologue = !validator.isEmpty(params.prologue);
        const validateGenre = !validator.isEmpty(params.genre);
        if (!(idBook > 0) || !validateTitle || !validateAuthor || !validatePrologue || !validateGenre) {
            return res.status(400).send({
                status: 'error',
                message: 'incomplete data'
            });
        }
        try {
            const result = await Book.update({
                title: params.title,
                author_name: params.author_name,
                prologue: params.prologue,
                genre: params.genre
            }, { where: { id_book: idBook } });
            return res.status(200).send({
                status: 'success',
                result
            });
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: 'algo salio mal'
            });
        }
    },
    uploadImage: async (req, res) => {
        const idBook = req.params.idBook;
        const file_Name = 'Imagen no subida';
        if (!req.files) {
            return res.status(500).send({
                status: 'error',
                message: file_Name
            });
        }
        let file_path = req.files.file0.path;
        let fileName = file_path.split('/')[2] || file_path.split('\\')[2];
        let fileExtension = fileName.split('\.')[1];
        const extensionsAccepted = ['png', 'jpg', 'jpeg', 'gift'];
        if (!extensionsAccepted.includes(fileExtension)) {
            fileSystem.unlink(file_path, (err) => {
                return res.status(500).send({
                    status: 'error',
                    message: 'extension del archivo es invalida'
                });
            });
        } else {
            try {
                const result = await Book.update({ image: fileName }, { where: { id_book: idBook } });
                return res.status(200).send({
                    status: 'success',
                    result
                });
            } catch (error) {
                return res.status(500).send({
                    status: 'success',
                    message: 'error al guardar la imagen del articulo'
                });
            }
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