const User = require('../models/User');
const validator = require('validator');
module.exports = {
    read: async (req, res) => {
        const idUSer = (req.params.idUser !== undefined) ? req.params.idUser : '';
        const validateIdUSer = !validator.isEmpty(idUSer);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdUSer) {
            try {
                const userData = await User.findOne({where:{id_library_user: idUSer}});
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