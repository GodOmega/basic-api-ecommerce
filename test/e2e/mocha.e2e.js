const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../src/app");
const { generateManyCategories } = require("../fakes/categories.fake");
const { generateManyProducts } = require("../fakes/products.fake");
const setupDatabase = require("../../src/libs/sequelize");

describe("[e2e TEST] Product api", function () {
  let sequelize = null;
  let models = null;
  let server = null;
  let productsMock;
  before(async () => {
    sequelize = setupDatabase();
    await sequelize.sync({ force: true });
    server = app.listen(3001);
    models = sequelize.models;
    productsMock = generateManyProducts(1);
    await models.Category.bulkCreate(generateManyCategories(3));
    await models.Product.bulkCreate(productsMock);
  });

  after(async () => {
    await server.close();
    await sequelize.close();
  });

  it("should get all products without errors", function (done) {
    request(app)
      .get("/api/v1/products")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const products = res.body.data;
        expect(products).to.be.a("array");
        expect(products[0].title).to.equal(productsMock[0].title);
        done();
      });
  });

  it("should create one product without errors", function (done) {
    request(app)
      .post("/api/v1/products")
      .send({
        title: "Iphone 15",
        description: "smartphone",
        slug: "iphone-15",
        sku: "310481048ee132s",
        categoryId: 1,
        quantity: 11,
        price: 1200,
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          console.log("[ERROR]", err);
          done(err);
        }
        const product = res.body;
        expect(product).to.be.a("object");
        expect(product.id).to.equal(2);
        expect(product.title).to.equal("Iphone 15");
        done();
      });
  });

  it("should get one product without errors", function (done) {
    request(app)
      .get("/api/v1/products/2")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const product = res.body;
        expect(product).to.be.a("object");
        expect(product.id).to.equal(2);
        done();
      });
  });
  it("should update one product without errors", function (done) {
    request(app)
      .patch("/api/v1/products/1")
      .send({ title: "product updated" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const product = res.body;
        expect(product).to.be.a("object");
        expect(product.id).to.equal(1);
        expect(product.title).to.equal("product updated");
        done();
      });
  });

  it("should delete one product without errors", function (done) {
    request(app)
      .delete("/api/v1/products/2")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const response = res.body;
        expect(response).to.be.a("object");
        expect(response.message).to.equal("product 2 deleted");
        done();
      });
  });
});
