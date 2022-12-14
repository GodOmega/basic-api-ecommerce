const fake = require("@ngneat/falso");

const generateOneProduct = () => ({
  title: fake.randProductName() + fake.randNumber({ min: 1, max: 1000000 }),
  slug: fake.randSlug() + "-slug" + fake.randNumber({ min: 1, max: 1000000 }),
  description:
    fake.randProductDescription() + fake.randNumber({ min: 1, max: 1000000 }),
  sku: fake.randUuid(),
  quantity: fake.randNumber({ min: 1, max: 100 }),
  categoryId: fake.randNumber({ min: 1, max: 3 }),
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
