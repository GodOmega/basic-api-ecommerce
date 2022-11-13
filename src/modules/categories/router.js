const express = require("express");
const router = express.Router();

const service = require("./index");
const validatorHandler = require("../../middlewares/validator.handler");

const {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} = require("./validationSchema");

// ROUTER
router.get("/", getAll);
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

async function getCategory(req, res) {
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

async function createCategory(req, res) {
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

async function updateCategory(req, res) {
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

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

module.exports = router;
