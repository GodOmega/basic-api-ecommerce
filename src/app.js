const express = require('express')
const app = express()


const {errorHandler, boomErrorHandler} = require('./middlewares/errors.handler')
const setRoutes = require('./routes')

// CONFIG
app.use(express.json());


// ROUTES
setRoutes(app)

// Handling Erros

app.use(boomErrorHandler)
app.use(errorHandler)


module.exports = app;