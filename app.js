const express = require('express');

const app = express()
app.use(express.json());

const ruta = require('./index')
app.use(ruta)


const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log('listen port ', port)})