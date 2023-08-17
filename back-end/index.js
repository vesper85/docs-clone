// const express = require('express')
import express from 'express';
import cors from 'cors';
import user from './routes/user.js'
import document from './routes/document.js'


const port = 3000

const app = express();
app.use(cors())
app.use(express.json())




app.get('/',(req,res)=>{
    res.send('the connection works')
})

// app.use('pathname', callbackfunction)



app.listen(port, ()=>{
    console.log(`express server: ${port} ` );
})

app.use('/api/user',user)
app.use('/api/document',document)
