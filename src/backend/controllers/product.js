const Product = require('../models/product');

async function getAllProducts(req, res, next) {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        next(error);
    }
}

async function getProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getAllProducts,
    getProduct
};