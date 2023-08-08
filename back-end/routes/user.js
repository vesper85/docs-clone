// const express = require('express');
import {Router} from 'express'
import pg from 'pg'
import { Sequelize } from 'sequelize';
import 'dotenv/config'
import User from '../models/User.js';
import sequelize from '../config/db.js';


const router = Router();


// /api/user/createuser register user to pg db
router.get('/getuser',async (req,res) =>{
  try {
    console.log('get user req endpoint');
    const searched_user = await User.findOne({where:{email:'asdf@gmail.com'}})
    return res.status(200).send(searched_user)
  } catch (error) {
    console.log(error);
  }
    
})

router.post('/createuser',async(req,res) =>{
  // console.log('create user req endpoint');
  try {
    const info = req.body
    const newUser = await User.create({...info})
    return res.status(200).send('new user created')
  } catch (error) {
    console.log(error);
  }

})



export default router;
