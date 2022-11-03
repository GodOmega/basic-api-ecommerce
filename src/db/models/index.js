const { Category, categorySchema } = require("./category.model");
const { Product, productSchema } = require("./product.model");
const { Cart, cartSchema } = require("./cart.model");
const { CartItem, cartItemSchema } = require("./cartItem.model");
const { Order, orderSchema } = require("./order.model");
const { OrderItem, orderItemSchema } = require("./orderItem.model");

function setupModels(sequelize) {
  Category.init(categorySchema, Category.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Cart.init(cartSchema, Cart.config(sequelize));
  CartItem.init(cartItemSchema, CartItem.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));
  OrderItem.init(orderItemSchema, OrderItem.config(sequelize));

  // Relationships
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Cart.associate(sequelize.models);
  CartItem.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderItem.associate(sequelize.models);
}

module.exports = setupModels;
