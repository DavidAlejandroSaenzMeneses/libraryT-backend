const express = require('express');
const myRouter = require('./src/routes/index.js');
const sequelize = require('./src/dataBase/connection.js');
const cors = require('cors');
const app = express();
require('dotenv').config();
const environment = process.env;
const port = environment.SERVER_PORT;

//CORS
app.use(cors());

//configuration server
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api/v1/', myRouter);

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});