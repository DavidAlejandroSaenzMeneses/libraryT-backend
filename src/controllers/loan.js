const Loan = require('../models/Loan');
const validator = require('validator');

module.exports = {
    create: async (req, res) => {
        const params = req.body;
        if (!(params.id_book>0) && !(params.id_library_user>0)) {
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
                const loanData = await Loan.findOne({ where: { id_loan: IdLoan } });
                if (!loanData) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'resource not found'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    loanData
                });
            } catch (error) {
                return res.status(404).send({
                    status: 'error2',
                    message: error
                })
            }
        }
        try {
            const loanData = await Loan.findAll();
            if (!loanData) {
                return res.status(404).send({
                    status: 'error',
                    message: 'resource not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                loanData
            });

        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error
            })
        }

    },
    update: async (req, res) => {

    }
}