const { Sequelize } = require("sequelize");
const { database } = require("../config");

const setupModels = require("../db/models");

const USER = encodeURIComponent(database.user);
const PASSWORD = encodeURIComponent(database.password);
let URI = `${database.type}://${USER}:${PASSWORD}@${database.host}:${database.port}/${database.name}`;

if (database.URI) {
  URI = database.URI;
}

const options = {
  dialect: database.type,
  logging: database.isProd ? false : console.log,
};

/**
 * Singleton to return Database instance
 */

let sequelize = null;

function setupDatabase() {
  if (sequelize) {
    return sequelize;
  }

  sequelize = new Sequelize(URI, options);
  setupModels(sequelize);
  console.log("INIT DATABASE");
  return sequelize;
}

module.exports = setupDatabase;
