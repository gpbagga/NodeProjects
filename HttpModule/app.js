const http = require('http')

//const server = http.createServer((clientReq, serverResponse) => {
const server = http.createServer((req, res) => {
  if(req.url === '/'){
    //argument must be of type string or an instance of Buffer or Uint8Array
    // res.write({a:'Hello world'}) // this will give an error
    res.write(JSON.stringify(['Hello world']))
    res.end()
  } 
})

server.listen(3000)

console.log('Listening to port 3000....')