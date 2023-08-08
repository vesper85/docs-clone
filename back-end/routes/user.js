// const express = require('express');
import {Router} from 'express'
import pg from 'pg'
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('docs_store', 'postgres', 'qwerty',{
  dialect:'postgres'
})

// const client = new pg.Client({
//     port: 5432,
//     database: 'docs_store',
//     user: 'postgres',
//     password: 'qwerty',
//   });

// const text = 'INSERT INTO user(name, password) VALUES($1, $2) RETURNING *'
// const values = ['brianc', '13579']


// const result = await client.query('SELECT * from d_user')
// console.log(result)

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
