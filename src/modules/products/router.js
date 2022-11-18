const express = require("express");
const router = express.Router();

const service = require("./index");
const validatorHandler = require("../../middlewares/validator.handler");

const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  filterSchema
} = require("./validationSchema");

router.get("/", validatorHandler(filterSchema, "query"), getAll);
router.get("/:id", validatorHandler(getProductSchema, "params"), getProduct);
router.post("/", validatorHandler(createProductSchema, "body"), createProduct);

router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  updateProduct
);

router.delete(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  deleteProduct
);

async function getAll(req, res, next) {
  try {
    const { query } = req;
    const response = await service.getAll(query);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.getOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const { body } = req;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const category = await service.update(id, body);
    res.json(category);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
