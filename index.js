const http = require('http')
const app = require('./app')

const server = http.createServer(app)
const port = process.env.PORT || 7000

server.listen(port, () => {
  console.log('Server is listening on port:', port)
})