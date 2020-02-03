const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

// Custom error handler
app.use((error, request, response, next) => {
  if (error.isJoi) {
    return response.sendStatus(400)
  }
  console.log(error)
  response.status(500).send(error.message)
})

module.exports = app