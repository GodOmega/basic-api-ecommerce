const express = require('express')
const router = express.Router();

// Modules Routes
const productsRouter= require('../../modules/products/router')

router.use('/products', productsRouter);


module.exports = router;