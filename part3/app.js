const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personssRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')

console.log(config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/', personssRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
morgan.token('data', (res) => JSON.stringify(res.body))
logger.info('connecting to', config.MONGODB_URI)

module.exports = app