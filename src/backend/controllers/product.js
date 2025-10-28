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

module.exports = {
    getAllProducts,
};