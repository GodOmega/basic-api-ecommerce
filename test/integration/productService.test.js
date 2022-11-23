const ProductService = require("../../src/modules/products/service");
const ProductMock = require("../mocks/models/product.model.mock");
const {
  generateManyProducts,
  generateOneProduct,
} = require("../fakes/products.fake");

describe("Testing Product service", () => {
  let productService;
  let productModelMock;

  beforeAll(() => {
    const productsFake = generateManyProducts(2);
    productModelMock = new ProductMock(productsFake);
    productService = new ProductService(productModelMock);
  });

  test("Should get all products", async () => {
    const { totalItems, data } = await productService.getAll({});
    expect(totalItems).toBe(2);
    expect(data.length).toBe(2);
  });

  test("Should find one product", async () => {
    const product = await productService.getOne(1);
    expect(product.name).toBe(productModelMock.products[1].name);
  });

  test("Should create one product", async () => {
    const product = generateOneProduct();
    const newProduct = await productService.create(product);
    expect(newProduct).toMatchObject(product);
  });

  test("Should update one product", async () => {
    const changes = {
      name: "updated product",
    };
    const product = await productService.update(1, changes);
    expect(product.name).toEqual(changes.name);
  });

  test("Should delete one product", async () => {
    const response = await productService.delete(1);
    expect(productModelMock.products.length).toBe(1);
    expect(response.message).toEqual('product 1 deleted');
  });
});
