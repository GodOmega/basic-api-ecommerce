const express = require('express')
const router = express.Router();
const service = require("./index");


router.get("/", getAll);
router.post("/", createOrder);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);


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

async function getOrder(req, res) {
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

async function createOrder(req, res) {
  try {
    const { body } = req;
    const newOrder = await service.create(body);
    res.json(newOrder);
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

async function updateOrder(req, res) {
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

async function deleteOrder(req, res) {
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