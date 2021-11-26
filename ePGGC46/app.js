const express = require('express')

const app = express()

app.use(express.json())

// var mysql = require('mysql')
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'dbuser',
//   password: 's3kreee7',
//   database: 'my_db'
// })

// connection.connect()

app.get('/', (req, res) => {
  res.send("jelllo")
})

const port = process.env.PORT || 3000
// const port = 3306

app.listen(port, () => console.log('listening on port', port))