const { Sequelize } = require("sequelize");
const { database } = require("../config");

const USER = encodeURIComponent(database.user);
const PASSWORD = encodeURIComponent(database.password);
let URI = `${database.type}://${USER}:${PASSWORD}@${database.host}:${database.port}/${database.name}`;

if (database.URI) {
  URI = database.URI;
}

const options = {
    dialect: database.type,
    logging: database.isProd ? false : console.log,
  }

let sequelize = null;

function setupDatabase () {

    if(!sequelize) {
        sequelize = new Sequelize(URI, options);
        console.log('INIT SEQUELIZE') 
      }
      
    return sequelize
}

module.exports = setupDatabase;
