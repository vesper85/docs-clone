// const express = require('express');
import {Router} from 'express'
import pg from 'pg'
import { Sequelize } from 'sequelize';
import 'dotenv/config'



const user = process.env.P_USER;
const user_pass = process.env.P_PASS;
const db_name = process.env.DB_NAME;
console.log(user, user_pass, db_name);

const sequelize = new Sequelize(db_name, user, user_pass,{
  dialect:'postgres'
})

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


const router = Router();


// /api/user/createuser register user to pg db
router.get('/getuser',(req,res) =>{
    console.log('get user req endpoint');
    return res.status(200).send('user info')
})

router.post('/createuser',(req,res) =>{
  console.log('create user req endpoint');
  return res.status(200).send('new user created')
})


export default router;
