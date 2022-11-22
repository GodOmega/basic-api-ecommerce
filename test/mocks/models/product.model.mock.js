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
    return this.products[index];
  }
}

module.exports = Product;
