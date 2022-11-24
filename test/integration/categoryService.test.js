const CategoryService = require("../../src/modules/categories/service");
const CategoryMock = require("../mocks/models/category.model.mock");
const {
  generateManyCategories,
  generateOneCategory,
} = require("../fakes/categories.fake");

describe("Testing Category service", () => {
  let categoryService;
  let categoryModelMock;

  beforeAll(() => {
    const categorysFake = generateManyCategories(2);
    categoryModelMock = new CategoryMock(categorysFake);
    categoryService = new CategoryService(categoryModelMock);
  });

  test("Should get all categories", async () => {
    const { totalItems, data } = await categoryService.getAll({});
    expect(totalItems).toBe(2);
    expect(data.length).toBe(2);
  });

  test("Should find one category", async () => {
    const category = await categoryService.getOne(1);
    expect(category.name).toBe(categoryModelMock.categories[1].name);
  });

  test("Should create one category", async () => {
    const category = generateOneCategory();
    const newCategory = await categoryService.create(category);
    expect(newCategory).toMatchObject(category);
  });

  test("Should update one category", async () => {
    const changes = {
      name: "updated category",
    };
    const category = await categoryService.update(1, changes);
    expect(category.name).toEqual(changes.name);
  });

  test("Should delete one category", async () => {
    const response = await categoryService.delete(1);
    expect(response.message).toEqual("category 1 deleted");
  });
});
