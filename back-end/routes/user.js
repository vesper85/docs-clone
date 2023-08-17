// const express = require('express');
import {Router} from 'express'
import 'dotenv/config'
import User from '../models/User.js';
import JWT from 'jsonwebtoken';
import fetchuser from '../middleware/fetchuser.js'



const router = Router();


// /api/user/getuser register user to pg db
router.get('/getuser',fetchuser,async (req,res) =>{
  try {
    console.log(req.user);
    // console.log('get user req endpoint');
    // const searched_user = await User.findOne({where:{email:}})
    return res.status(200).json(req.user)
  } catch (error) {
    console.log(error);
  }
    
})

// /api/user/loginuser verfies the input credentials with the db cred.
router.post('/loginuser',async (req,res) =>{
  try {
      // console.log(req.body);
      const currentUser = await User.findOne({where :{email:req.body.email}})
      if(currentUser){
        // implement pasword check here 
        const data = {
          user:{
            id:currentUser.email
          }
        }
        const key = process.env.JWTSECRETKEY
        const jwt = JWT.sign(data,key)
        return res.status(200).json(jwt)
      }
      return res.status(400).json("Incorrect user credentials")
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
