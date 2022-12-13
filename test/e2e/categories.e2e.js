const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../src/app");
const { generateManyCategories } = require("../fakes/categories.fake");
const setupDatabase = require("../../src/libs/sequelize");

describe("[e2e TEST] Category API", function () {
  let sequelize = null;
  let models = null;
  let server = null;
  let categoriesMock;
  before(async () => {
    sequelize = setupDatabase();
    await sequelize.sync({ force: true });
    server = app.listen(3001);
    models = sequelize.models;
    categoriesMock = generateManyCategories(1);
    await models.Category.bulkCreate(categoriesMock);
  });

  after(async () => {
    await server.close();
  });

  it("should get all categories without errors", function (done) {
    request(app)
      .get("/api/v1/categories")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const categories = res.body.data;
        expect(categories).to.be.a("array");
        expect(categories[0].title).to.equal(categoriesMock[0].title);
        done();
      });
  });

  it("should create one category without errors", function (done) {
    request(app)
      .post("/api/v1/categories")
      .send({
        name: "phones",
        description: "Category for all types of smartphones",
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          console.log("[ERROR]", err);
          done(err);
        }
        const category = res.body;
        expect(category).to.be.a("object");
        expect(category.id).to.equal(2);
        expect(category.name).to.equal("phones");
        done();
      });
  });

  it("should get one category without errors", function (done) {
    request(app)
      .get("/api/v1/categories/2")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const category = res.body;
        expect(category).to.be.a("object");
        expect(category.id).to.equal(2);
        done();
      });
  });

  it("should update one category without errors", function (done) {
    request(app)
      .patch("/api/v1/categories/1")
      .send({ name: "category updated" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const category = res.body;
        expect(category).to.be.a("object");
        expect(category.id).to.equal(1);
        expect(category.name).to.equal("category updated");
        done();
      });
  });

  it("should delete one category without errors", function (done) {
    request(app)
      .delete("/api/v1/categories/2")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const response = res.body;
        expect(response).to.be.a("object");
        expect(response.message).to.equal("category 2 deleted");
        done();
      });
  });
});
