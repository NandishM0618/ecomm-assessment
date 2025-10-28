const Order = require('../models/order');

async function createOrder(req, res, next) {
    try {
        const { shippingInfo, orderItems, paymentInfo, totalAmount } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            totalAmount,
        });
        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        next(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function getOrderById(req, res, next) {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }
        res.status(200).json({

            success: true,
            order,
        });
    } catch (error) {
        next(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    createOrder,
    getOrderById,
};