const express = require('express')
const NodeRSA = require('node-rsa')
// express() creates the http server
const app = express()

const PublicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqOpPyfwYWk6eN5XKft+oDD1PRX517jEzbTdRJEX3OD3FFGEoWylvAmOmD5SWZogsza2IBoABurP3AukB5unkrD1r/dIq92Y5WfspXk9rZgVbFAq3Gpfg13DwxnL5Gb/cKAGNjjJ1RXNYk+tTlRs0koU52wfJ03WkqM3CmqydDK7q9/xD89iSf01YhNFIg8Io4Fl3dsjEV6KMS/rJhKwdtNob39c5VM/XeGUJvDxx+kIlaOtVoncTDLL1HAtWQ5LP9mzLD9kDEFC7kyDy2nSASYeS6FbJs7mpEa89bwS1eBuPEWi8XhbgDDT5EeWZ0x1d1VvfVS2Xh8cPbQERBdLy9QIDAQAB'

app.use(express.json())
// express.json() returns a piece of middleware. app.use means we want to use middleware in request processing pipeline
// So this statement automatically parses json object in request processing pipeline

// attach a http get request listener
app.get('/', (req, res) => {
  console.log('hello world')
  res.send('Hello World, hi hello')
})

app.post('/verifyReactNativeKey', (req, res)=> {
  console.log(req.body)
  const publicKeyBuffer = Buffer.from(PublicKey, 'base64')
  const key = new NodeRSA()
  const signer = key.importKey(publicKeyBuffer, 'public-der')
  const signatureVerified = signer.verify(Buffer.from(req.body.payload), req.body.signature, 'utf8', 'base64')
  
  console.log(signatureVerified)
})

const courses = [
  {id: 1, name: 'Heelo course'},
  {id: 2, name: 'peelo course'},
]

// attach another http get request listener
//route parameters
app.get('/api/courses/:id', (req, res) => {
  
  const receivedId = req.params?.id 
  if(receivedId <= courses.length){
    res.send(courses[receivedId -1])
  }

  //400 bad request
  res.status(400).send('No course related to passed id')
  //only one response can be sent so if 'if' block is executed and response is sent then this line will not send the response again
})

// query parameters
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

// PORT --> environment variable . We can access it by using process(a global field):
const port = process.env.PORT || 3000

app.listen(port,'192.168.1.17', () => {console.log(`Listening on port ${port}`)})
