const getPaginationValues = require("../../src/utils/getPaginationValues");
const getPaginatedStructure = require("../../src/utils/getPaginatedStructure");

const { generateManyProducts } = require("../fakes/products.fake");

describe("Testing pagination values and response structure", () => {
  let products;
  beforeAll(() => {
    products = generateManyProducts(2);
  });

  test("Should return limit and offset after passing values", () => {
    const size = 3;
    const page = 1;

    const { limit, offset } = getPaginationValues(page, size);

    expect(limit).toBe(3);
    expect(offset).toBe(0);
  });

  test("Should return limit and offset without passing values", () => {
    const { limit, offset } = getPaginationValues();

    expect(limit).toBe(2);
    expect(offset).toBe(0);
  });

  test("Should return pagination structure", () => {
    const limit = 2;
    const page = 1;
    const query = {
      count: products.length,
      rows: products,
    };

    const paginationStructure = getPaginatedStructure(query, page, limit);

    const matchObject = {
      totalItems: products.length,
      data: products,
      currentPage: page,
      totalPages: Math.ceil(products.length / limit),
    };

    expect(paginationStructure).toMatchObject(matchObject);
  });
});
