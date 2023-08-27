// const express = require('express')
import express from 'express';
import cors from 'cors';
import user from './routes/user.js'
import document from './routes/document.js'
import {createServer} from "http";
import {Server} from "socket.io"


const port = 3000

const app = express();
app.use(cors())
app.use(express.json())

const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors: {
    origin: "http://localhost:5173"
  }
})

io.on("connection",(socket)=>{
    console.log(socket.id);
    // if we get a new-ops event then broadcast it to everybody
    socket.on("new-ops",(data)=>{
        console.log("new-ops server");
        socket.broadcast.emit("new-remote-ops",data)
    })
})



// app.use('pathname', callbackfunction)
app.get('/',(req,res)=>{
    res.send('the connection works')
})



app.use('/api/user',user)
app.use('/api/document',document)
httpServer.listen(port)
