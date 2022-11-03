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
      createdAt: "created_at",
      updateAt: "update_at",
      deletedAt: 'deleted_at'
    };
  }
}

module.exports = { ORDER_TABLE, orderSchema, Order };
