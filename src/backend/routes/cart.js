const express = require('express')

const { addToCart, getCartItem, deleteCartItem, checkoutItem } = require('../controllers/cart')
const authMiddleware = require('../auth/authMiddleware')

const router = express.Router();

router.post("/cart", authMiddleware, addToCart);
router.get('/cart', authMiddleware, getCartItem);
router.delete('/cart/:id', deleteCartItem)
router.post('/checkout', checkoutItem)

module.exports = router