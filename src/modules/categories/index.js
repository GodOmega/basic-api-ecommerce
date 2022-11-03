const setupDatabase = require('../../libs/sequelize')

const database = setupDatabase()
const service = require('./service.js')


module.exports = new service(database);

