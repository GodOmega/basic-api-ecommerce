const apiV1 = require('./v1')


module.exports = (app) => {
    app.use('/api/v1', apiV1)
}