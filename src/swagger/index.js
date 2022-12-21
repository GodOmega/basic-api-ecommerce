const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Ecommerce API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      product: {
        type: "object",
        required: [
          "title",
          "description",
          "slug",
          "sku",
          "categoryId",
          "quantity",
          "price",
        ],
        properties: {
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          slug: {
            type: "string",
          },
          sku: {
            type: "string",
          },
          categoryId: {
            type: "number",
          },
          quantity: {
            type: "number",
          },
          price: {
            type: "number",
          },
        },
      },
      category: {
        type: "object",
        required: ["name", "description"],
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
      cart: {
        type: "object",
        required: ["status"],
        properties: {
          status: {
            type: "string",
            example: "ACTIVE",
          },
        },
      },
      cartItem: {
        type: "object",
        required: ["productId", "quantity"],
        properties: {
          productId: {
            type: "number",
            example: 1,
          },
          cartId: {
            type: "number",
            example: 1,
          },
          active: {
            type: "boolean",
            example: true,
          },
          price: {
            type: "number",
            example: 100,
          },
          quantity: {
            type: "number",
            example: 5,
          },
          sku: {
            type: "string",
            example: "0123910a3",
          },
        },
      },
      order: {
        type: "object",
        properties: {
          status: {
            type: "string",
            example: "PROCESS",
          },
          total: {
            type: "number",
            example: 100,
          },
        },
      },
      orderItem: {
        type: "object",
        properties: {
          productId: {
            type: "number",
            example: 1,
          },
          orderId: {
            type: "number",
            example: 1,
          },
          price: {
            type: "number",
            example: 100,
          },
          quantity: {
            type: "number",
            example: 5,
          },
          sku: {
            type: "string",
            example: "0123910a3",
          },
        },
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/modules/*/router.js"],
};

module.exports = swaggerJSDoc(swaggerOptions);
