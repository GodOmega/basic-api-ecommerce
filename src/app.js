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

// SETUP SWAGGER DOC
if (process.env.NODE_ENV !== "production") {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
}

// HANDLING ERRORS
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
