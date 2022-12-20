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
          quantity: {
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
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/modules/*/router.js"],
};

module.exports = swaggerJSDoc(swaggerOptions);
