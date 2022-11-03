const express = require('express')
const app = express()

const setRoutes = require('./routes')

// CONFIG
app.use(express.json());


// ROUTES
setRoutes(app)


module.exports = app;