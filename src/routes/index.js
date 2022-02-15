const express = require('express');

const myRouter = express.Router();

myRouter.get('/test', (req, res) => {
    res.status(200).send({
        status: 'success',
        message: 'Todo en orden'
    });

});

module.exports = myRouter;