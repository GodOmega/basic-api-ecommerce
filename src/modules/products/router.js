const express = require("express");
const router = express.Router();

const service = require("./index");
const validatorHandler = require("../../middlewares/validator.handler");

const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} = require("./validationSchema");

router.get("/", getAll);
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

async function getAll(req, res) {
  try {
    const response = await service.getAll();
    res.json(response);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const response = await service.getOne(id);
    res.json(response);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

async function createProduct(req, res) {
  try {
    const { body } = req;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const category = await service.update(id, body);
    res.json(category);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

module.exports = router;
