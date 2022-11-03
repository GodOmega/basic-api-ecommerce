const express = require('express')
const router = express.Router();

// Modules Routes
const productsRouter= require('../../modules/products/router')
const categoriesRouter= require('../../modules/categories/router')

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);


module.exports = router;