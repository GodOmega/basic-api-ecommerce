require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  database: {
    isProd: process.env.NODE_ENV === "production",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST || "localhost",
    type: process.env.DATABASE_TYPE,
    name: process.env.DATABASE_NAME,
    URI: process.env.DATABASE_URI,
  },
  testDatabase: {
    user: process.env.TEST_DATABASE_USER,
    password: process.env.TEST_DATABASE_PASSWORD,
    port: process.env.TEST_DATABASE_PORT,
    host: process.env.TEST_DATABASE_HOST,
    type: process.env.TEST_DATABASE_TYPE,
    name: process.env.TEST_DATABASE_NAME,
  },
};

module.exports = config;
