const fake = require("@ngneat/falso");

const generateOneProduct = () => ({
  title: fake.randProductName(),
  slug: fake.randSlug(),
  description: fake.randProductDescription(),
  sku: fake.randNumber({min:600000, max:10000000}),
  quantity: fake.randNumber({min: 1, max: 100}),
  categoryId: fake.randNumber({min: 1, max: 3}),
  price: fake.randNumber({ min: 10, max: 500 }),
});

const generateManyProducts = (size) => {
  const limit = size ?? 10;
  const fakeProducts = [];
  for (let index = 0; index < limit; index += 1) {
    fakeProducts.push(generateOneProduct());
  }

  return [...fakeProducts];
};

module.exports = {
  generateOneProduct,
  generateManyProducts,
};
