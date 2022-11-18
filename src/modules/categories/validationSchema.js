const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3);
const description = Joi.string().min(10);
const size = Joi.number().positive();
const page = Joi.number().positive();

const getCategorySchema = Joi.object({
  id: id.required(),
});

const createCategorySchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

const updateCategorySchema = Joi.object({
  name,
  description,
});

const filterSchema = Joi.object({
  size,
  page,
});

module.exports = {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
  filterSchema,
};
