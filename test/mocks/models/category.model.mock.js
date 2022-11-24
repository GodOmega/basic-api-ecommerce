class Category {
  constructor(categories) {
    this.categories = categories;
  }

  async findAndCountAll() {
    return {
      count: this.categories.length,
      rows: this.categories,
    };
  }

  async findByPk(index) {
    return {
      ...this.categories[index],
      update: (changes) => this.update(changes),
      destroy: () => this.destroy()
    };
  }

  async create(data) {
    return {
      ...data,
    };
  }

  async update(changes) {
    return {
      ...this.categories[0],
      ...changes,
    };
  }

  async destroy() {
    return true;
  }
}

module.exports = Category;
