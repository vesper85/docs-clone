const express = require('express');

const router = express.Router();


router.get('/',(req,res)=>[
    res.send('user api endpoint')
])

router.get('/createuser',(req,res) =>{
    console.log('create user req endpoint');
    res.send('new user created');
})

module.exports = router;
