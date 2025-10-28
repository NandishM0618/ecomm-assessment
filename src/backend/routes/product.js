const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/product');

router.get('/products', getAllProducts);

module.exports = router;