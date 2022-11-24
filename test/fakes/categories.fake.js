const fake = require("@ngneat/falso");

const generateOneCategory = () => ({
  _id: fake.randUuid(),
  name: fake.randProductName(),
  price: fake.randNumber({ min: 10, max: 500 }),
});

const generateManyCategories = (size) => {
  const limit = size ?? 10;
  const fakeCategory = [];
  for (let index = 0; index < limit; index += 1) {
    fakeCategory.push(generateOneCategory());
  }

  return [...fakeCategory];
};

module.exports = {
  generateOneCategory,
  generateManyCategories,
};
