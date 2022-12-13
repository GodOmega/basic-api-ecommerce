const fake = require("@ngneat/falso");

const generateOneCategory = () => ({
  name: fake.randProductCategory(),
  description: fake.randProductDescription(),
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
