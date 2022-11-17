const boom = require("@hapi/boom");

const getPaginationValues = require("../../utils/getPaginationValues");
const getPaginatedStructure = require("../../utils/getPaginatedStructure");

class ProductService {
  constructor(Product) {
    this.productModel = Product;
  }
  async getAll({ page, size }) {
    const { limit, offset } = getPaginationValues(page, size);
    const products = await this.productModel.findAndCountAll({
      limit,
      offset,
    });
    const dataPaginated = getPaginatedStructure(products, page, limit);

    return dataPaginated;
  }

  async getOne(id) {
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw boom.notFound("Product not found");
    }

    return product;
  }

  async create(data) {
    const newProduct = await this.productModel.create(data);
    return newProduct;
  }

  async update(id, changes) {
    const product = await this.getOne(id);
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  async delete(id) {
    const product = await this.getOne(id);
    await product.destroy();
    return {
      message: `product ${id} deleted`,
    };
  }
}

module.exports = ProductService;
