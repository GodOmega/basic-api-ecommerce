const express = require("express");
const router = express.Router();
const service = require("./index");

router.get("/", getAll);
router.post("/", createCart);
router.get("/:id", getCart);
router.patch("/:id", updateCart);
router.delete("/:id", deleteCart);
router.post("/:id/add-item", addOrUpdateCartItem);
router.post("/:id/delete-item", deleteCartItem);

async function getAll(req, res, next) {
  try {
    const response = await service.getAll();
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function getCart(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.getOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function createCart(req, res, next) {
  try {
    const { body } = req;
    const newCart = await service.create(body);
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
}

async function updateCart(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await service.update(id, body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function deleteCart(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function addOrUpdateCartItem(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await service.addOrUpdateItem(id, body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function deleteCartItem(req, res, next) {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    const response = await service.deleteItem(id, productId);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
