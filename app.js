const express = require('express');
const path = require('path')


const app = express()
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
const ruta = require('./index')
app.use(ruta)

const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log('listen port ', port)})