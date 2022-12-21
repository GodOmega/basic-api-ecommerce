const express = require("express");
const router = express.Router();

const service = require("./index");
const validatorHandler = require("../../middlewares/validator.handler");

const {
  getCartSchema,
  createCartSchema,
  updateCartSchema,
  addOrUpdateItemSchema,
  removeItemSchema,
} = require("./validationSchema");

/**
 * @swagger
 * /api/v1/carts:
 *    get:
 *      tags:
 *        - carts
 *      summary: "Get all carts"
 *      description: This endpoint get all carts in a paginated response.
 *      parameters:
 *          - in: query
 *            name: page
 *            description: current page in pagination response, by default is 1
 *            schema:
 *              type: integer
 *          - in: query
 *            name: size
 *            description: size of items you will get in the response, by default is 2
 *            schema:
 *              type: integer
 *      responses:
 *        '200':
 *          description: Response an array of carts and all metadata information.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  totalItems:
 *                      type: number
 *                      example: 2
 *                  data:
 *                      type: array
 *                      items:
 *                           $ref: "#/components/schemas/cart"
 *                  totalPages:
 *                      type: number
 *                      example: 2
 *                  currentPage:
 *                      type: number
 *                      example: 1
 *        '5XX':
 *          description: Server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: error message
 */
router.get("/", getAll);

/**
 * @swagger
 * /api/v1/carts:
 *    post:
 *      tags:
 *        - carts
 *      summary: "Create cart"
 *      description: This endpoint create one cart in the store.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/cart"
 *      responses:
 *        '201':
 *          description: Return the object inserted in collection.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/cart"
 *        '400':
 *          description: Validation error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 400
 *                  error:
 *                    type: string
 *                    example: Bad request
 *                  message:
 *                    type: string
 *                    example: status must be a string
 *        '5XX':
 *          description: Server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error message
 */
router.post("/", validatorHandler(createCartSchema, "body"), createCart);

/**
 * @swagger
 * /api/v1/carts/{id}:
 *    get:
 *      tags:
 *        - carts
 *      summary: "Get cart"
 *      description: This endpoint get an specifict cart.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the cart you want to search.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a cart item.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: ACTIVE
 *                  cartItems:
 *                    type: array
 *                    items: 
 *                      $ref: "#/components/schemas/cartItem" 
 *        '400':
 *          description: Validation error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 400
 *                  error:
 *                    type: string
 *                    example: Bad request
 *                  message:
 *                    type: string
 *                    example: id must be a number
 *        '5XX':
 *          description: Server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: error message
 */
router.get("/:id", validatorHandler(getCartSchema, "params"), getCart);

/**
 * @swagger
 * /api/v1/carts/{id}:
 *    patch:
 *      tags:
 *        - carts
 *      summary: "Update cart"
 *      description: This endpoint update an specifict cart.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the cart you want to update.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a cart updated.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/cart"
 *        '400':
 *          description: Validation error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 400
 *                  error:
 *                    type: string
 *                    example: Bad request
 *                  message:
 *                    type: string
 *                    example: id must be a number
 *        '5XX':
 *          description: Server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: error message
 */
router.patch(
  "/:id",
  validatorHandler(getCartSchema, "params"),
  validatorHandler(updateCartSchema, "body"),
  updateCart
);

/**
 * @swagger
 * /api/v1/carts/{id}:
 *    delete:
 *      tags:
 *        - carts
 *      summary: "delete cart"
 *      description: This endpoint delete an specifict cart.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the cart you want to delete.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a cart item delete.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                      example: cart {id} deleted
 *        '400':
 *          description: Validation error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 400
 *                  error:
 *                    type: string
 *                    example: Bad request
 *                  message:
 *                    type: string
 *                    example: id must be a number
 *        '5XX':
 *          description: Server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: error message
 */
router.delete("/:id", validatorHandler(getCartSchema, "params"), deleteCart);

/**
 * @swagger
 * /api/v1/carts/{id}/add-item:
 *    post:
 *      tags:
 *        - carts
 *      summary: "Add item to cart"
 *      description: This endpoint add item to cart or also update an item.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the cart you want to add items.
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  productId:
 *                    type: number
 *                    example: 1
 *                  quantity:
 *                    type: number
 *                    example: 5
 *      responses:
 *        '201':
 *          description: Return the object inserted in collection.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/cartItem"
 *        '400':
 *          description: Validation error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 400
 *                  error:
 *                    type: string
 *                    example: Bad request
 *                  message:
 *                    type: string
 *                    example: productId must be an integer
 *        '5XX':
 *          description: Server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error message
 */
router.post(
  "/:id/add-item",
  validatorHandler(getCartSchema, "params"),
  validatorHandler(addOrUpdateItemSchema, "body"),
  addOrUpdateCartItem
);

/**
 * @swagger
 * /api/v1/carts/{id}/delete-item:
 *    post:
 *      tags:
 *        - carts
 *      summary: "Delete item from cart"
 *      description: This endpoint delete an item from cart.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the cart you want to delete items.
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  productId:
 *                    type: number
 *                    example: 1
 *      responses:
 *        '200':
 *          description: Return the object inserted in collection.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: cart item deleted
 *
 *        '400':
 *          description: Validation error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 400
 *                  error:
 *                    type: string
 *                    example: Bad request
 *                  message:
 *                    type: string
 *                    example: productId must be an integer
 *        '5XX':
 *          description: Server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Error message
 */
router.post(
  "/:id/delete-item",
  validatorHandler(getCartSchema, "params"),
  validatorHandler(removeItemSchema, "body"),
  deleteCartItem
);

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
    res.status(201).json(response);
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
