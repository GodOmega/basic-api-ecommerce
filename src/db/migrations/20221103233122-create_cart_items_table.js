'use strict';

const { PRODUCT_TABLE } = require("../models/product.model");
const { CART_TABLE } = require("../models/cart.model");
const { CART_ITEM_TABLE } = require("../models/cartItem.model");
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CART_ITEM_TABLE, {
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
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CART_ITEM_TABLE);
  }
};
