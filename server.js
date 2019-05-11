#!/usr/bin/env node
const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
const publicPath = path.join(__dirname, '/public')

console.log('public path', publicPath)

let port = process.env.PORT || 3000

app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/', function (req, res) {
  res.sendFile(path.join(publicPath, '/index.html'))
})

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/* Event listener for HTTP server "error" event.
*/
const onError = error => {
  if (error.syscall !== 'listen') {
    throw error
  } else {
    console.log(`${error}`)
  }
}

/**
* Event listener for HTTP server "listening" event.
*/
const onListening = () => {
  console.log(`listening on port ${port}`)
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
