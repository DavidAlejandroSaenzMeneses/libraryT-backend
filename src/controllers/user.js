const User = require('../models/User');
const validator = require('validator');

module.exports = {
    create: async (req, res) => {
        const params = req.body;
        try {
            const validateIdentification = !validator.isEmpty(params.identification);
            const validateNombre = !validator.isEmpty(params.fullName);
            const validatePhoneNumber = !validator.isEmpty(params.phoneNumber);
            if (!validateIdentification || !validateNombre || !validatePhoneNumber) {
                return res.status(400).send({
                    status: 'error',
                    message: 'incomplete data'
                });
            }
        } catch (err) {
            return res.status(400).send({
                status: 'error',
                message: 'incomplete data'
            });
        }

        const recordUser = await User.findOne({
            where: { identification: params.identification }
        });
        if (recordUser) {
            return res.status(400).send({
                status: 'error',
                message: 'the user already exists'
            });
        }
        try {
            const newUser = await User.create({
                identification: params.identification,
                full_name: params.fullName,
                phone_number: params.phoneNumber
            });
            return res.status(201).send({
                status: 'success',
                newUser
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                error
            });
        }
    },
    read: async (req, res) => {
        const identification = (req.params.identification !== undefined) ? req.params.identification : '';
        const validateIdentification = !validator.isEmpty(identification);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdentification) {
            try {
                const result = await User.findOne({ where: { identification: identification } });
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
                return res.status(404).send({
                    status: 'error2',
                    message: error
                })
            }
        }
        try {
            const result = await User.findAll();
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
            return res.status(500).send({
                status: 'error',
                message: error
            })
        }

    }
}