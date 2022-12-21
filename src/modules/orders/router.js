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

/**
 * @swagger
 * /api/v1/orders:
 *    get:
 *      tags:
 *        - orders
 *      summary: "Get all orders"
 *      description: This endpoint get all orders in a paginated response.
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
 *          description: Response an array of orders and all metadata information.
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
 *                           $ref: "#/components/schemas/order"
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
router.get("/", validatorHandler(filterSchema, "query"), getAll);

/**
 * @swagger
 * /api/v1/orders:
 *    post:
 *      tags:
 *        - orders
 *      summary: "Create order"
 *      description: This endpoint create order in the store.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  cartId:
 *                    type: number
 *                    example: 1
 *      responses:
 *        '201':
 *          description: Return the object inserted in collection.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/order"
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
 *                    example: cartId must be a number
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
router.post("/", validatorHandler(createOrderSchema, "body"), createOrder);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *    get:
 *      tags:
 *        - orders
 *      summary: "Get order"
 *      description: This endpoint get an specifict order.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the order you want to search.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a order.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: PROCESS
 *                  total:
 *                    type: number
 *                    example: 100
 *                  orderItems:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/orderItem"
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
router.get("/:id", validatorHandler(getOrderSchema, "params"), getOrder);


/**
 * @swagger
 * /api/v1/orders/{id}:
 *    patch:
 *      tags:
 *        - orders
 *      summary: "Update order"
 *      description: This endpoint update an specifict order.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the order you want to update.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a order item updated.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/order"
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
  validatorHandler(getOrderSchema, "params"),
  validatorHandler(updateOrderSchema, "body"),
  updateOrder
);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *    delete:
 *      tags:
 *        - orders
 *      summary: "delete order"
 *      description: This endpoint delete an specifict order.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the order you want to delete.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a order delete.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                      example: order {id} deleted
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

async function getOrder(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.getOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const { body } = req;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await service.update(id, body);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
