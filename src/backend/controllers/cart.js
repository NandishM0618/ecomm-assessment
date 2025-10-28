const Cart = require('../models/cart')
const Product = require('../models/product')

async function addToCart(req, res) {
    try {
        const userId = req.user._id;
        const { productId, qty } = req.body;

        if (!productId || !qty) {
            return res.status(400).json({ error: "Missing productId or qty" });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [{ product: productId, qty }] });
        } else {
            const existingItem = cart.items.find(
                (item) => item.product.toString() === productId
            );
            if (existingItem) {
                existingItem.qty += qty;
            } else {
                cart.items.push({ product: productId, qty });
            }
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error adding to cart" });
    }
}



async function deleteCartItem(req, res) {
    try {
        const userId = req.user._id;
        const { id: productId } = req.params;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();
        res.json({ message: "Item removed from cart", cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error removing item" });
    }
};


async function getCartItem(req, res) {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0)
            return res.json({ items: [], total: 0 });

        const items = cart.items.map((item) => ({
            _id: item._id,
            product: {
                _id: item.product._id,
                name: item.product.name,
                price: item.product.price,
                images: item.product.images || []
            },
            qty: item.qty,
            subtotal: item.product.price * item.qty,
        }));

        const total = items.reduce((sum, item) => sum + item.subtotal, 0);

        res.json({ items, total });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching cart" });
    }
};


async function checkoutItem(req, res) {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0)
            return res.status(400).json({ message: "Cart is empty" });

        const total = cart.items.reduce(
            (sum, item) => sum + item.product.price * item.qty,
            0
        );

        const receipt = {
            total,
            timestamp: new Date().toISOString(),
            message: "Mock checkout successful",
        };

        await Cart.deleteOne({ user: userId });

        res.json(receipt);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Checkout failed" });
    }
};


module.exports = {
    getCartItem,
    addToCart,
    deleteCartItem,
    checkoutItem
}