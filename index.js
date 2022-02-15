const express = require('express');
const myRouter = require('./src/routes/index.js');
const sequelize = require('./src/dataBase/connection.js');

const app = express();
const port = 3000;
app.use('/api/v1/', myRouter);

app.listen(port, async () => {
    console.log('listen on port:' + port);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

});