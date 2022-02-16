const router = require('express').Router();

//controllers
const User = require('../controllers/user');

//usuario
router.get('/users/:idUser?',User.read);
router.get('/test', (req, res) => {
    res.status(200).send({
        status: 'success',
        message: 'Todo en orden'
    });

});

module.exports = router;