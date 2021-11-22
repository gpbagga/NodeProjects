const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send("jelllo")
})

const port = process.env.PORT || 3000
// const port = 3306

app.listen(port, () => console.log('listening on port', port))