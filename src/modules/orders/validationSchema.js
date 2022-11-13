const Joi = require("joi");

const id = Joi.number().integer();
const cartId = Joi.number().integer();
const status = Joi.string().min(4);
const total = Joi.number().positive().precision(2);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  cartId: cartId.required(),
});

const updateOrderSchema = Joi.object({
  status,
  total,
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
};
