const express = require("express");
const router = express.Router();

const service = require("./index");
const validatorHandler = require("../../middlewares/validator.handler");

const {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
  filterSchema
} = require("./validationSchema");

// ROUTER
router.get("/", validatorHandler(filterSchema, "query"), getAll);
router.get("/:id", validatorHandler(getCategorySchema, "params"), getCategory);

router.post(
  "/",
  validatorHandler(createCategorySchema, "body"),
  createCategory
);

router.patch(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  updateCategory
);

router.delete(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  deleteCategory
);

// ROUTER FUNCTIONS
async function getAll(req, res, next) {
  try {
    const { query } = req;
    const response = await service.getAll(query);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function getCategory(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.getOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const { body } = req;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const category = await service.update(id, body);
    res.json(category);
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
