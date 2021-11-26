const express = require('express')
const axios = require('axios')
const config = require('./config');
const qs = require('qs')

// express() creates the http server
const app = express()

app.use(express.urlencoded({extended:false}));
app.use(express.json())


app.get('/', (req, res) => {

  res.send(`hello hi world`)
})




const port = 3000

app.listen(port)    