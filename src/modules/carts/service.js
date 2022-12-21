const boom = require("@hapi/boom");

class CartService {
  constructor(Cart, CartItem, Product) {
    this.cartModel = Cart;
    this.cartItemModel = CartItem;
    this.productModel = Product;
  }
  async getAll() {
    const carts = await this.cartModel.findAll();
    return carts;
  }

  async getOne(id) {
    const cart = await this.cartModel.findByPk(id, {
      include: [
        {
          association: "cartItems",
          attributes: ["productId", "cartId", "price", "sku", "quantity"],
        },
      ],
    });

    if (!cart) {
      throw boom.notFound("Cart not found");
    }

    return cart;
  }

  async create(data) {
    const cart = await this.cartModel.create(data);
    return cart;
  }

  async update(id, changes) {
    const cart = await this.getOne(id);
    const updatedCart = await cart.update(changes);
    return updatedCart;
  }

  async delete(id) {
    const cart = await this.getOne(id);
    await cart.destroy();
    return {
      message: `cart ${id} deleted`,
    };
  }

  async addOrUpdateItem(cartId, data) {
    const cart = await this.getOne(cartId);

    if (cart.status !== "ACTIVE") {
      throw boom.badRequest("Cart is not active");
    }

    const { productId } = data;

    const item = await this.cartItemModel.findOne({
      where: { cartId, productId },
    });

    if (!item) {
      const product = await this.productModel.findByPk(productId);
      data = {
        ...data,
        cartId: cart.id,
        price: product.price,
        sku: product.sku,
      };
      const newCartItem = await this.cartItemModel.create(data);
      return newCartItem;
    }

    const updatedCartItem = item.update(data);

    return updatedCartItem;
  }

  async deleteItem(cartId, productId) {
    const cart = await this.getOne(cartId);
    const item = await this.cartItemModel.findOne({
      where: { cartId, productId },
    });

    if (cart.status !== "ACTIVE") {
      throw boom.badRequest("Cart is not active");
    }

    if (!item) {
      throw boom.notFound("Item not found");
    }

    await item.destroy();

    return {
      message: `cart item deleted`,
    };
  }
}

module.exports = CartService;
