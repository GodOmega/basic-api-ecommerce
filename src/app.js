const express = require('express')
const helmet = require("helmet");
const app = express()


const {errorHandler, boomErrorHandler} = require('./middlewares/errors.handler')
const setRoutes = require('./routes')

// CONFIG
app.use(helmet());
app.use(express.json());

// ROUTES
setRoutes(app)

// Handling Erros

app.use(boomErrorHandler)
app.use(errorHandler)


module.exports = app;