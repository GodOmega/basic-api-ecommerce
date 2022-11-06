const express = require('express')
const router = express.Router();

// Modules Routes
const productsRouter= require('../../modules/products/router')
const categoriesRouter= require('../../modules/categories/router')
const cartsRouter= require('../../modules/carts/router')

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/carts', cartsRouter);


module.exports = router;