const boom = require("@hapi/boom");

class CategoryService {
  constructor(Category) {
    this.categoryModel = Category;
  }

  async getAll() {
    const categories = await this.categoryModel.findAll();
    return categories;
  }

  async getOne(id) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw boom.notFound("Category not found");
    }

    return category;
  }

  async create(data) {
    const newCategory = await this.categoryModel.create(data);
    return newCategory;
  }

  async update(id, changes) {
    const category = await this.getOne(id);
    const updatedCategory = await category.update(changes);
    return updatedCategory;
  }

  async delete(id) {
    const category = await this.getOne(id);
    await category.destroy();
    return {
      message: `category ${id} deleted`,
    };
  }
}

module.exports = CategoryService;
