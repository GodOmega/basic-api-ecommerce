class ProductService {
    constructor(Product) {
        this.productModel = Product
    }
    async getAll() {
        const products = await this.productModel.findAll();
        return products;
      }
    
      async getOne(id) {
        const product = await this.productModel.findByPk(id);
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

module.exports = ProductService