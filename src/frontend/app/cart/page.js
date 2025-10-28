"use client";
import { useEffect, useState } from "react";
import apiClient from '../../services/apiService'
import Link from "next/link";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const api = new apiClient();

    useEffect(() => {
        fetchCart();
    }, []);

    async function fetchCart() {
        try {
            const res = await api.get("cart");
            console.log("Fetched Cart:", res);

            if (res.items) {
                setCart(res.items);
                const totalPrice = res.items.reduce(
                    (sum, item) => sum + item.product.price * item.qty,
                    0
                );
                setTotal(totalPrice);
            }
        } catch (err) {
            console.error("Failed to fetch cart:", err);
        } finally {
            setLoading(false);
        }
    }

    const handleRemove = async (productId) => {
        try {
            await api.delete(`cart/${productId}`);
            setCart(cart.filter((item) => item.product._id !== productId));
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
                Loading cart...
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-gray-600">
                <img src="/empty_cart.svg" alt="Empty cart" className="w-60 mb-6" />
                <p className="text-lg mb-4">Your cart is empty</p>
                <Link
                    href="/"
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    Continue Shopping →
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart 🛒</h1>

                {/* Cart Items */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden divide-y divide-gray-200">
                    {cart.map((item) => (
                        <div
                            key={item.product._id}
                            className="flex items-center gap-6 p-6 hover:bg-gray-50 transition"
                        >
                            <img
                                src={item.product.images[0]?.url || "/placeholder.png"}
                                alt={item.product.name}
                                className="w-24 h-24 object-cover rounded-lg shadow-sm"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {item.product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    ₹{item.product.price} × {item.qty}
                                </p>
                                <p className="text-gray-800 font-medium">
                                    Subtotal: ₹{(item.product.price * item.qty).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={() => handleRemove(item.product._id)}
                                className="text-red-600 hover:text-red-800 font-medium transition"
                            >
                                ✕ Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
                    <div className="flex justify-between text-lg font-medium text-gray-800 mb-4">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>
                    <button className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
                        Proceed to Checkout →
                    </button>
                </div>
            </div>
        </div>
    );
}
