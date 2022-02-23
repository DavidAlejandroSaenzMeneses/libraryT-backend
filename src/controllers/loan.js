const { DateTime } = require('luxon');
const Loan = require('../models/Loan');
const validator = require('validator');
const User = require('../models/User');
const Book = require('../models/Book');
module.exports = {
    create: async (req, res) => {
        const params = req.body;
        if (!(params.id_book > 0) && !(params.id_library_user > 0)) {
            return res.status(400).send({
                status: 'error',
                message: 'incomplete data'
            });
        }
        try {
            const result = await Loan.create({
                id_book: params.id_book,
                id_user: params.id_library_user
            });
            return res.status(201).send({
                status: 'success',
                result
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                error
            });
        }
    },
    read: async (req, res) => {
        const IdLoan = (req.params.IdLoan !== undefined) ? req.params.IdLoan : '';
        const validateIdLoan = !validator.isEmpty(IdLoan);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdLoan) {
            try {
                const result = await Loan.findOne({ where: { id_loan: IdLoan } });
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
            const result = await Loan.findAll({
                include: [{
                    model: User,
                    association: User.Loan,
                    required: true,
                    as:'loan_library_user'
                },{
                    model: Book,
                    association: User.Book,
                    required: true,
                    as:'loan_book'
                }],order: [['id_loan', 'DESC']]
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
        const params = req.params;
        if (!(params.idBook > 0)) {
            return res.status(400).send({
                status: 'error',
                message: 'incomplete data'
            });
        }
        try {
            const result = await Loan.update({
                date_return: DateTime.now(),
                return_book: true
            }, { where: { id_book: params.idBook, return_book: false } });
            return res.status(200).send({
                status: 'success',
                result
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                error
            });
        }
    }
}