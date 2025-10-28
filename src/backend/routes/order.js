const express = require('express');
const { createOrder, getOrderById } = require('../controllers/order');

const router = express.Router();

router.post('/order/new', createOrder);
router.get('/order/:id', getOrderById);

module.exports = router;