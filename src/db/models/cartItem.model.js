const { Model, DataTypes } = require("sequelize");

const { PRODUCT_TABLE } = require("./product.model");
const { CART_TABLE } = require("./cart.model");

const CART_ITEM_TABLE = "cart_items";

const cartItemSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  productId: {
    field: "product_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: "id",
    },
  },
  cartId: {
    field: "cart_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CART_TABLE,
      key: "id",
    },
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "updated_at",
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "deleted_at",
  },
};

class CartItem extends Model {
  static associate(models) {
    this.belongsTo(models.Cart, {
      as: "cart",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CART_ITEM_TABLE,
      modelName: "CartItem",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updateAt: "update_at",
      deletedAt: "deleted_at",
    };
  }
}

module.exports = { CART_ITEM_TABLE, cartItemSchema, CartItem };
