// const express = require('express');
import {Router} from 'express'
import pg from 'pg'

const client = new pg.Client({
    port: 5432,
    database: 'docs_store',
    user: 'postgres',
    password: 'qwerty',
  });

// const text = 'INSERT INTO user(name, password) VALUES($1, $2) RETURNING *'
// const values = ['brianc', '13579']

await client.connect();
const result = await client.query('SELECT * from d_user')
console.log(result)

const router = Router();



router.get('/createuser',(req,res) =>{
    console.log('create user req endpoint');
    return res.status(200).send('asdf')
})

client.end()

export default router;
