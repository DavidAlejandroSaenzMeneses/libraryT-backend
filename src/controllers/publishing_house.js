const Publishing_house = require('../models/Publishing_house');
const validator = require('validator');

module.exports = {
    read: async (req, res) => {
        const idPublishingHouse = (req.params.idPublishingHouse !== undefined) ? req.params.idPublishingHouse : '';
        const validateIdPublishingHouse = !validator.isEmpty(idPublishingHouse);
        //si obtiene un id el sistema realiza una consulta individual
        if (validateIdPublishingHouse) {
            try {
                const PublishingHouseData = await Publishing_house.findOne({ where: { id_publishing_house: idPublishingHouse } });
                if (!PublishingHouseData) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'resource not found'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    PublishingHouseData
                });
            } catch (error) {
                return res.status(404).send({
                    status: 'error2',
                    message: error
                })
            }
        }
        try {
            const PublishingHouseData = await Publishing_house.findAll();
            if (!PublishingHouseData) {
                return res.status(404).send({
                    status: 'error',
                    message: 'resource not found'
                });
            }
            return res.status(200).send({
                status: 'success',
                PublishingHouseData
            });

        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error
            })
        }

    }
}