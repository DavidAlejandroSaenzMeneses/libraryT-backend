import express from 'express';

const myRouter = express.Router();

myRouter.get('/test', (req, res) => {
    res.status(200).send({
        status: 'success',
        message: 'Todo en orden'
    });

});

export default myRouter;