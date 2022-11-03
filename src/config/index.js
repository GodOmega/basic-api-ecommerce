require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    database: {
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST || 'localhost',
        type: process.env.DATABASE_TYPE,
        name: process.env.DATABASE_NAME,
        URI: process.env.DATABASE_URI,
    }
  }
  
  module.exports = config;