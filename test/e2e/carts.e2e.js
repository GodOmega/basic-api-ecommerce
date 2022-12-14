const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../src/app");
const { generateManyCategories } = require("../fakes/categories.fake");
const { generateManyProducts } = require("../fakes/products.fake");
const setupDatabase = require("../../src/libs/sequelize");

describe("[e2e TEST] Shopping Cart API", () => {
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
  });

  it("should create shopping cart", (done) => {
    request(app)
      .post("/api/v1/carts")
      .send({ status: "ACTIVE" })
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const cart = res.body;
        expect(cart).to.be.a("object");
        expect(cart.id).to.equal(1);
        expect(cart.status).to.equal("ACTIVE");
        done();
      });
  });

  it("should get one shopping cart", (done) => {
    request(app)
      .get("/api/v1/carts/1")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const cart = res.body;
        expect(cart).to.be.a("object");
        expect(cart.id).to.equal(1);
        done();
      });
  });

  it("should add item to shopping cart", (done) => {
    request(app)
      .post("/api/v1/carts/1/add-item")
      .send({
        productId: 1,
        quantity: 1,
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const cartItem = res.body;
        expect(cartItem).to.be.a("object");
        expect(cartItem.id).to.equal(1);
        expect(cartItem.sku).to.equal(productsMock[0].sku);
        expect(cartItem.price).to.equal(productsMock[0].price);
        done();
      });
  });

  it("shopping cart should have items", (done) => {
    request(app)
      .get("/api/v1/carts/1")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const cart = res.body;
        expect(cart).to.be.a("object");
        expect(cart.cartItems).to.be.a("array");
        expect(cart.cartItems.length).to.equal(1);
        done();
      });
  });

  it("should delete item from shopping cart", (done) => {
    request(app)
      .post("/api/v1/carts/1/delete-item")
      .send({
        productId: 1,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const cartItem = res.body;
        expect(cartItem).to.be.a("object");
        expect(cartItem.message).to.equal("cart item deleted");
        done();
      });
  });

  it("should update one shopping cart", (done) => {
    request(app)
      .patch("/api/v1/carts/1")
      .send({ status: "PROCESS" })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const cart = res.body;
        expect(cart).to.be.a("object");
        expect(cart.id).to.equal(1);
        expect(cart.status).to.equal("PROCESS");
        done();
      });
  });
});
