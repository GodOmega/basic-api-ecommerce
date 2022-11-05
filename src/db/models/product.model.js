const { Model, DataTypes } = require("sequelize");

const { CATEGORY_TABLE } = require("./category.model");
const PRODUCT_TABLE = "products";

const productSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  slug: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  sku: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    field: "category_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: "id",
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
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

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: "category",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: true,
      paranoid: true,
    };
  }
}

module.exports = { PRODUCT_TABLE, productSchema, Product };
