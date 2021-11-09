const express = require('express')

// express() creates the http server
const app = express()

app.use(express.json())
// express.json() returns a piece of middleware. app.use means we want to use middleware in request processing pipeline
// So this statement automatically parses json object in request processing pipeline

app.get('/', (req, res) => {
  res.send('Hello World, hi hello')
})


const courses = [
  {id: 1, name: 'Heelo course'},
  {id: 2, name: 'peelo course'},
]
app.get('/api/courses/:id', (req, res) => {
  if(req.params.id <= courses.length){
    res.send(courses[req.params.id -1])
  }
  
  //400 bad request
  res.status(400).send()
})
app.get('/api/courses', (req, res) => {
  
  if(req.query?.id <= courses.length){

    res.send(courses[req.query?.id - 1])
  }
  //400 bad request
  res.status(400).send()
})

app.post('/api/courses', (req,res) => {
  
  const course = {
    id: courses.length + 1,
    // a request has many props like params, headers, body etc.
    name: req.body.name             // we get JSON object but we have used express.json() middleware so this object gets automatically parsed
  }
  
  courses.push(course)
  res.send(course)
  
})

const port = process.env.PORT || 3000

app.listen(port)