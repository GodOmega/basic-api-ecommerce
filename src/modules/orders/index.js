const setupDatabase = require("../../libs/sequelize");

const db = setupDatabase();
const service = require("./service.js");

module.exports = new service(db.models.Order, db.models.OrderItem, db.models.Cart, db);
