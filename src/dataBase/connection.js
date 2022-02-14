import Sequelize from 'sequelize';
import dotenv from 'dotenv';

//dotenv configuration
await dotenv.config({ path: '../../.env' });

console.log(process.env.BD_USER);
const connection = (new Sequelize(process.env.DB_NAME,'postgres','5b05b7717', {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
}));
export default connection;