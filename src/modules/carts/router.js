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

async function getCart(req, res) {
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

async function createCart(req, res) {
  try {
    const { body } = req;
    const newCart = await service.create(body);
    res.status(201).json(newCart);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

async function updateCart(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await service.update(id, body);
    res.json(response);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

async function deleteCart(req, res) {
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

async function addOrUpdateCartItem(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await service.addOrUpdateItem(id, body);
    res.json(response);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

async function deleteCartItem(req, res) {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    const response = await service.deleteItem(id, productId);
    res.json(response);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

module.exports = router;
