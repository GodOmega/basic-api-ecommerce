const Joi = require("joi");

const id = Joi.number().integer();
const status = Joi.string().min(4);
const sku = Joi.string().min(5);
const productId = Joi.number().integer();
const quantity = Joi.number().integer();

const getCartSchema = Joi.object({
  id: id.required(),
});

const createCartSchema = Joi.object({
  status: status.required(),
});

const updateCartSchema = Joi.object({
  status,
});

const addOrUpdateItemSchema = Joi.object({
  productId: productId.required(),
  quantity: quantity.required(),
});

const removeItemSchema = Joi.object({
  productId: productId.required(),
});

module.exports = {
  getCartSchema,
  createCartSchema,
  updateCartSchema,
  addOrUpdateItemSchema,
  removeItemSchema,
};
