const Joi = require("joi");

const id = Joi.number().integer();
const title = Joi.string().min(3);
const description = Joi.string().min(10);
const slug = Joi.string().min(5);
const sku = Joi.string().min(5);
const categoryId = Joi.number().integer();
const price = Joi.number().positive().precision(2);
const quantity = Joi.number().integer();

const size = Joi.number().positive();
const page = Joi.number().integer().min(0);

const getProductSchema = Joi.object({
  id: id.required(),
});

const createProductSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  slug: slug.required(),
  sku: sku.required(),
  categoryId: categoryId.required(),
  price: price.required(),
  quantity: quantity.required(),
});

const updateProductSchema = Joi.object({
  title,
  description,
  title,
  description,
  slug,
  sku,
  categoryId,
  price,
  quantity,
});

const filterSchema = Joi.object({
  size,
  page,
});

module.exports = {
  getProductSchema,
  filterSchema,
  createProductSchema,
  updateProductSchema,
};
