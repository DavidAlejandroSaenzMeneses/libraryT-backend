const User = require('../models/User');
const validator = require('validator');

module.exports = {
    create: async (req, res) => {
        const params = req.body;
        try {
            const validateIdentification = !validator.isEmpty(params.identification);
            const validateNombre = !validator.isEmpty(params.fullName);
            const validatePhoneNumber = !validator.isEmpty(params.phoneNumber);
            if(!validateIdentification || !validateNombre || !validatePhoneNumber){
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
        const idUser = (req.params.idUser !== undefined) ? req.params.idUser : '';
        const validateIdUSer = !validator.isEmpty(idUser);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdUSer) {
            try {
                const userData = await User.findOne({ where: { id_library_user: idUser } });
                if (!userData) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'resource not found'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    userData
                });
            } catch (error) {
                return res.status(404).send({
                    status: 'error2',
                    message: error
                })
            }
        }
        try {
            const userData = await User.findAll();
            if (!userData) {
                return res.status(404).send({
                    status: 'error',
                    message: 'resource not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                userData
            });

        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error
            })
        }

    }
}