const boom = require("@hapi/boom");
const { QueryTypes } = require("sequelize");

class OrderService {
  constructor(Order, OrderItem, Cart, db) {
    this.orderModel = Order;
    this.orderItemModel = OrderItem;
    this.cartModel = Cart;
    this.db = db;
  }
  async getAll() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  async getOne(id) {
    const order = await this.orderModel.findByPk(id);

    if (!order) {
      throw boom.notFound("Order not found");
    }

    return order;
  }

  async create(data) {
    const { cartId } = data;
    const cart = await this.cartModel.findByPk(cartId, {
      attributes: ["id", "status"],
      include: [
        {
          association: "cartItems",
          attributes: ["productId", "cartId", "price", "sku", "quantity"],
        },
      ],
    });

    if (!cart || cart.status !== "ACTIVE") {
      throw boom.badRequest("Cart undefined or inactive");
    }

    const { cartItems } = cart.toJSON();

    if (!cartItems) {
      throw boom.badRequest("Cart items undefined");
    }

    // Total of CartItems price SUM
    const [result] = await this.db.query(
      "SELECT SUM(price * quantity) AS total FROM cart_items WHERE cart_id = :cartId",
      { replacements: { cartId }, type: QueryTypes.SELECT }
    );

    const order = await this.orderModel.create({
      status: "PROCESS",
      total: result.total,
    });

    await this.createOrderItems(cartItems, order.id);

    await cart.update({
      status: "PROCESS",
    });
    return order;
  }

  async update(id, changes) {
    const order = await this.getOne(id);
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = await this.getOne(id);
    await order.destroy();
    return {
      message: `order ${id} deleted`,
    };
  }

  async createOrderItems(items, orderId) {
    const itemsWithOrderId = items.map((item) => {
      return {
        ...item,
        orderId,
      };
    });

    return await this.orderItemModel.bulkCreate(itemsWithOrderId);
  }
}

module.exports = OrderService;
