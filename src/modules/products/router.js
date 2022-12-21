const express = require("express");
const router = express.Router();

const service = require("./index");
const validatorHandler = require("../../middlewares/validator.handler");

const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  filterSchema,
} = require("./validationSchema");

/**
 * @swagger
 * /api/v1/products:
 *    get:
 *      tags:
 *        - products
 *      summary: "Get all products"
 *      description: This endpoint get all products in a paginated response.
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
 *          description: Response an array of products and all metadata information.
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
 *                           $ref: "#/components/schemas/product"
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
 * /api/v1/products/{id}:
 *    get:
 *      tags:
 *        - products
 *      summary: "Get product"
 *      description: This endpoint get an specifict product.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the product you want to search.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a product item.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/product"
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

router.get("/:id", validatorHandler(getProductSchema, "params"), getProduct);

/**
 * @swagger
 * /api/v1/products:
 *    post:
 *      tags:
 *        - products
 *      summary: "Create product"
 *      description: This endpoint is for create one product to store.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/product"
 *      responses:
 *        '201':
 *          description: Return the object inserted in collection.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/product"
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
 *                    example: price must be a number
 */
router.post("/", validatorHandler(createProductSchema, "body"), createProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *    patch:
 *      tags:
 *        - products
 *      summary: "Update product"
 *      description: This endpoint update an specifict product.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the product you want to update.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a product item updated.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/product"
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
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  updateProduct
);

/**
 * @swagger
 * /api/v1/products/{id}:
 *    delete:
 *      tags:
 *        - products
 *      summary: "delete product"
 *      description: This endpoint delete an specifict product.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the product you want to update.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a product item updated.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                      example: product {id} deleted
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

router.delete(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  deleteProduct
);

// ROUTES FUNCTIONS

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
