class Product {
  constructor(products) {
    this.products = products;
  }

  async findAndCountAll() {
    return {
      count: this.products.length,
      rows: this.products,
    };
  }

  async findByPk(index) {
    return {
      ...this.products[index],
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
      ...this.products[0],
      ...changes,
    };
  }

  async destroy() {
    this.products.pop();
    return true;
  }
}

module.exports = Product;
