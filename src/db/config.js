const { database } = require("../config");

const USER = encodeURIComponent(database.user);
const PASSWORD = encodeURIComponent(database.password);
let URI = `${database.type}://${USER}:${PASSWORD}@${database.host}:${database.port}/${database.name}`;

if (database.URI) {
  URI = database.URI;
}
module.exports = {
  development: {
    url: URI,
    dialect: database.type,
  },
  production: {
    url: URI,
    dialect: database.type,
  },
};
