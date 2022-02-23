const User = require('../models/User');
const validator = require('validator');
const Loan = require('../models/Loan');

module.exports = {
    create: async (req, res) => {
        const params = req.body;
        try {
            const validateIdentification = !validator.isEmpty(params.identification);
            const validateNombre = !validator.isEmpty(params.full_name);
            const validatePhoneNumber = !validator.isEmpty(params.phone_number);
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
            const result = await User.create({
                identification: params.identification,
                full_name: params.full_name,
                phone_number: params.phone_number
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
        const idUser = (req.params.idUser !== undefined) ? req.params.idUser : '';
        const identification = (req.query.identification !== undefined) ? req.query.identification : '';
        const validateIdUser = !validator.isEmpty(idUser);
        const validateIdentification = !validator.isEmpty(identification);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdUser || validateIdentification) {
            try {
                let filtro = {};
                if (validateIdUser) {
                    filtro = { where: { id_library_user: idUser } };
                } else {
                    filtro = { where: { identification: identification } };
                }
                const result = await User.findOne(filtro);
                if (!result) {
                    return res.status(200).send({
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
            const result = await User.findAll({order: [['id_library_user', 'DESC']]});
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

    },
    update: async (req, res)=>{
        const params = req.body;
        const validateIdentification = !validator.isEmpty(params.identification);
        const validateNombre = !validator.isEmpty(params.full_name);
        const validatePhoneNumber = !validator.isEmpty(params.phone_number);
        const userForUpdate = req.params.idUser;
        if (!(userForUpdate>0) || !validateIdentification || !validateNombre || !validatePhoneNumber) {
            return res.status(400).send({
                status: 'error',
                message: 'incomplete data'
            });
        }
        try {           
            const result = await User.update({
                identification: params.identification,
                full_name: params.full_name,
                phone_number: params.phone_number
            },{where:{id_library_user:userForUpdate}});
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
    delete: async(req, res)=>{
        const idUser = req.params.idUser;
        if (!(idUser > 0)) {
            return res.status(400).send({
                status: 'error',
                message: 'incomplete data'
            });
        }
        const userLoans= await Loan.findAll({where:{id_user:idUser}});
        if(userLoans.length > 0) {
            return res.status(403).send({
                status: 'Denied',
                message: 'No se puede eliminar el usuario debido a que tiene registro de prestamos'
            })
        }
        try {
            const result = await User.destroy({ where: { id_library_user: idUser } });
            if (result>0) {
                return res.status(200).send({
                    status: 'success',
                    result
                });
            }
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: 'algo salio mal'
            });
        }
    }
}