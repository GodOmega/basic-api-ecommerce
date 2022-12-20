const express = require("express");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const app = express();

const swaggerSetup = require("./swagger");
const {
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/errors.handler");
const setRoutes = require("./routes");

// CONFIG
app.use(helmet());
app.use(express.json());

// ROUTES
setRoutes(app);

// Setup SWAGGER DOC
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

// Handling Erros
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
