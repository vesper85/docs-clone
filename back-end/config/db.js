import { Sequelize } from 'sequelize';
import 'dotenv/config'



const user = process.env.P_USER;
const user_pass = process.env.P_PASS;
const db_name = process.env.DB_NAME;
// console.log(user, user_pass, db_name);


const sequelize = new Sequelize(db_name, user, user_pass,{
  dialect:'postgres'
})


try {
    await sequelize.authenticate();
    console.log('PostgresSQL DB connection has been established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


export default sequelize;