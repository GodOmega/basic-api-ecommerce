const express = require('express')
const router = express.Router();
const service = require('./index')

router.get('/', getAll);
router.get('/:id', getOne);


async function getAll(req, res) {
    res.send('All')
}


async function getOne(req, res) {
    res.send('one category')
}




module.exports = router;