const setupDatabase = require("../../src/libs/sequelize");

exports.mochaHooks = {
  afterAll(done) {
    const db = setupDatabase();
    db.close();
    done();
  },
};
