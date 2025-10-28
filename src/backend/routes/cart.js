const express = require('express')

const { addToCart, getCartItem, deleteCartItem, checkoutItem } = require('../controllers/cart')

const router = express.Router();

router.post("/cart", addToCart);
router.get('/cart', getCartItem);
router.delete('/cart/:id', deleteCartItem)
router.post('/checkout', checkoutItem)

module.exports = router