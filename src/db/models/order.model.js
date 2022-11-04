const { Model, DataTypes } = require("sequelize");

const ORDER_TABLE = "orders";

const orderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: "TIMESTAMP",
    field: "created_at",
    allowNull: false,
  },
  updatedAt: {
    type: "TIMESTAMP",
    field: "updated_at",
    allowNull: true,
  },
  deletedAt: {
    type: "TIMESTAMP",
    allowNull: true,
    field: "deleted_at",
  },
};

class Order extends Model {
  static associate(models) {
    this.hasMany(models.OrderItem, {
      as: 'orderItems',
      foreignKey: 'orderId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestamps: true,
      paranoid: true,
    };
  }
}

module.exports = { ORDER_TABLE, orderSchema, Order };
