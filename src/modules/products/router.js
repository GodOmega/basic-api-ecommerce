const express = require('express')
const router = express.Router();
const service = require('./index')

router.get('/', getAll);
router.get('/:id', getProduct);


async function getAll(req, res) {
    res.send('All products')
}


async function getProduct(req, res) {
    res.send('one product')
}




module.exports = router;