const fake = require("@ngneat/falso");

const generateOneProduct = () => ({
  _id: fake.randUuid(),
  name: fake.randProductName(),
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
