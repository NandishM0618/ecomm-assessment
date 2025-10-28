'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '../../services/apiService';
import { useEffect } from 'react';

export default function CheckoutPage() {
    const [form, setForm] = useState({ name: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cart, setCartItems] = useState({ items: [], total: 0 });
    const [receiptVisible, setReceiptVisible] = useState(false);

    const api = new apiClient();

    async function getCartItems() {
        try {
            const res = await api.get('cart');
            console.log(res);
            setCartItems(res)
        } catch (error) {
            console.log("failed to fetch", error);
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email) return alert('Please fill all fields');

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setReceiptVisible(true);
        }, 1500);
    };

    const handleCloseReceipt = () => {
        setReceiptVisible(false);
        window.location.href = '/'
    };

    useEffect(() => {
        getCartItems();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">

                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 font-semibold rounded-xl text-white transition ${isSubmitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-blue-700'
                                    }`}
                            >
                                {isSubmitting ? 'Processing...' : 'Submit Order'}
                            </button>
                        </form>
                    </div>

                    {/* Right Section – Order Summary */}
                    <div className="bg-gray-100 p-8 border-l">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">
                            Order Summary
                        </h3>
                        <div className="space-y-4">
                            {cart.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <div>
                                        <p className="font-medium text-gray-700">{item.product.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                    </div>
                                    <p className="font-semibold text-gray-800">
                                        ₹{item.product.price * item.qty}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between mt-6 text-lg font-semibold">
                            <span>Total:</span>
                            <span className="text-green-600">₹{cart.total}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Receipt Modal */}
            <AnimatePresence>
                {receiptVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full"
                        >
                            <h2 className="text-2xl font-bold text-green-600 mb-4">
                                ✅ Order Confirmed
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Thank you, <span className="font-medium">{form.name}</span>!
                                A receipt has been sent to <span className="font-medium">{form.email}</span>.
                            </p>

                            <div className="border-t pt-4 mt-4">
                                <p className="text-gray-800 font-semibold mb-2">
                                    Total Paid: ₹{cart.total}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Order ID: #{Math.floor(Math.random() * 1000000)}
                                </p>
                            </div>

                            <button
                                onClick={handleCloseReceipt}
                                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
