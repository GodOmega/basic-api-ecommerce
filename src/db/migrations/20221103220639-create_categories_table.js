"use strict";

const { CATEGORY_TABLE } = require("../models/category.model");
const { DataTypes, Sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        field: "created_at",
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        allowNull: true,
        type: "TIMESTAMP",
        field: "updated_at",
        allowNull: true,
      },
      deletedAt: {
        type: "TIMESTAMP",
        allowNull: true,
        field: "deleted_at",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
