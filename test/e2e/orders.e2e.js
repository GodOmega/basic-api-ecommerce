const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../src/app");
const { generateManyCategories } = require("../fakes/categories.fake");
const { generateManyProducts } = require("../fakes/products.fake");
const setupDatabase = require("../../src/libs/sequelize");

describe("[e2e TEST] Orders API", () => {
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
    await models.Cart.create({
      status: "ACTIVE",
    });
    await models.CartItem.create({
      cartId: 1,
      productId: 1,
      quantity: 1,
      price: productsMock[0].price,
      sku: productsMock[0].sku,
    });
  });

  after(async () => {
    await server.close();
  });

  it("should create one order", (done) => {
    request(app)
      .post("/api/v1/orders")
      .send({ cartId: 1 })
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const order = res.body;
        expect(order).to.be.a("object");
        expect(order.id).to.equal(1);
        expect(order.status).to.equal("PROCESS");
        expect(order.total).to.equal(productsMock[0].price);
        done();
      });
  });

  it("should get all orders", (done) => {
    request(app)
      .get("/api/v1/orders")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const order = res.body.data;
        expect(order).to.be.a("array");
        expect(order.length).to.equal(1);
        done();
      });
  });

  it("should get one order", (done) => {
    request(app)
      .get("/api/v1/orders/1")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const order = res.body;
        expect(order).to.be.a("object");
        expect(order.id).to.equal(1);
        expect(order.orderItems).to.be.a("array");
        expect(order.orderItems.length).to.equal(1);
        done();
      });
  });

  it("should update one order", (done) => {
    request(app)
      .patch("/api/v1/orders/1")
      .send({ status: "REALIZED" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const order = res.body;
        expect(order).to.be.a("object");
        expect(order.id).to.equal(1);
        expect(order.status).to.equal("REALIZED");
        done();
      });
  });

  it("should delete one order", (done) => {
    request(app)
      .delete("/api/v1/orders/1")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const order = res.body;
        expect(order).to.be.a("object");
        expect(order.message).to.equal("order 1 deleted");
        done();
      });
  });
});
