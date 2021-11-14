const EventEmitter = require('events')
const emitter = new EventEmitter()

//Registering a listener
emitter.on('hello', function(){
  console.log('Listener called after listening hello event')
})

//Raise an event
emitter.emit('hello')
/////NOTE: when we call emit method, emitter object iterates over all registered listeners
// and execute all listeners synchronously
// This implies if we have registered the listener after calling emit function then nothing would have happened

const Logger = require('./Logger')
const logger = new Logger()

logger.on('messageLogged', (arg) => {
  console.log('Listener called after listening to messageLogged event with argument: ', arg)
})

logger.log('Hello this a message sentence')