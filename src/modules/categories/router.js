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

/**
 * @swagger
 * /api/v1/categories:
 *    get:
 *      tags:
 *        - categories
 *      summary: "Get all categories"
 *      description: This endpoint get all categories in a paginated response.
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
 *          description: Response an array of categories and all metadata information.
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
 *                           $ref: "#/components/schemas/category"
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
 * /api/v1/categories/{id}:
 *    get:
 *      tags:
 *        - categories
 *      summary: "Get category"
 *      description: This endpoint get an specifict category.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the category you want to search.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a category item.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/category"
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
router.get("/:id", validatorHandler(getCategorySchema, "params"), getCategory);


/**
 * @swagger
 * /api/v1/categories:
 *    post:
 *      tags:
 *        - categories
 *      summary: "Create category"
 *      description: This endpoint create one category to store.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/category"
 *      responses:
 *        '201':
 *          description: Return the object inserted in collection.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/category"
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
 *                    example: name must be a number
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
  "/",
  validatorHandler(createCategorySchema, "body"),
  createCategory
);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *    patch:
 *      tags:
 *        - categories
 *      summary: "Update category"
 *      description: This endpoint update an specifict category.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the category you want to update.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a category item updated.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/category"
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
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  updateCategory
);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *    delete:
 *      tags:
 *        - categories
 *      summary: "delete category"
 *      description: This endpoint delete an specifict category.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the category you want to update.
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Response a category item updated.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                      example: category {id} deleted
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
