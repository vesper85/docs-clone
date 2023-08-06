const express = require('express')
const app = express();


const port = 3000

app.get('/',(req,res)=>{
    res.send('the connection works')
})

// app.use('pathname', callbackfunction)



app.listen(port, ()=>{
    console.log(`listning on port ${port} `)
})

app.use('/api/user',require('./routes/user'))
