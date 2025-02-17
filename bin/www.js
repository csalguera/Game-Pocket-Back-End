// Module dependencies
import { app } from '../server.js'
import http from 'http'
import debug from 'debug'
import { Server } from 'socket.io'
import { userInfo } from 'os'

// Get port from environment and store in Express
const port = normalizePort(process.env.PORT || '3001')
app.set('port', port)

// Create HTTP server
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  console.log("Server is up")

  socket.on('changeName', async () => { 
    setTimeout(() => {
      const user = socket
      user.emit('changeName')
    },500)
  })

  socket.on('refreshLobby', () => {
    setTimeout(() => {
      socket.broadcast.emit('refreshLobby')
    },500)
  })

  socket.on('friendRequest', () => {
    setTimeout(() => {
    socket.broadcast.emit('friendRequest')
  },500)
  })

  socket.on('refreshMessage', () => {
    setTimeout(() => {
    socket.broadcast.emit('refreshMessage')
  },500)
  })
})

// Listen on provided port, on all network interfaces
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

//Normalize a port into a number, string, or false
function normalizePort(val) {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}

// Event listener for HTTP server "error" event
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

// Event listener for HTTP server "listening" event
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  console.log(`Listening on ${bind}`)
}
