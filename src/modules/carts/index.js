const setupDatabase = require('../../libs/sequelize')

const { models } = setupDatabase()
const service = require('./service.js')


module.exports = new service(models.Cart, models.CartItem, models.Product);