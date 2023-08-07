// const express = require('express')
import express from 'express';
import cors from 'cors';
import user from './routes/user.js'
// const cors = require('cors')


const app = express();

app.use(cors())
app.use(express.json())


const port = 3000

app.get('/',(req,res)=>{
    res.send('the connection works')
})

// app.use('pathname', callbackfunction)



app.listen(port, ()=>{
    console.log(`listening on port ${port} `)
})

app.use('/api/user',user)
