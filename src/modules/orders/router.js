const express = require("express");
const router = express.Router();

const service = require("./index");
const validatorHandler = require("../../middlewares/validator.handler");

const {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  filterSchema,
} = require("./validationSchema");

router.get("/", validatorHandler(filterSchema, "query"), getAll);
router.post("/", validatorHandler(createOrderSchema, "body"), createOrder);
router.get("/:id", validatorHandler(getOrderSchema, "params"), getOrder);

router.patch(
  "/:id",
  validatorHandler(getOrderSchema, "params"),
  validatorHandler(updateOrderSchema, "body"),
  updateOrder
);
router.delete("/:id", validatorHandler(getOrderSchema, "params"), deleteOrder);

async function getAll(req, res, next) {
  try {
    const { query } = req;
    const response = await service.getAll(query);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function getOrder(req, res) {
  try {
    const { id } = req.params;
    const response = await service.getOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res) {
  try {
    const { body } = req;
    const newOrder = await service.create(body);
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await service.update(id, body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
