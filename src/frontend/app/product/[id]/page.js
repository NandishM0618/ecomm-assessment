'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '../../../services/apiService'

export default function ProductPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const { id } = useParams();
    const router = useRouter();
    const api = new apiClient();

    async function fetchProduct() {
        try {
            const res = await api.get(`products/${id}`);
            setProduct(res.product || null);
        } catch (err) {
            console.error('Failed to fetch product:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const data = {
                productId: product._id,
                quantity,
            };
            const res = await api.post(`cart`, data);

            if (res.success || res.status === 200) {
                setAdded(true);
                console.log(`✅ Added ${quantity} x ${product.name} to cart`);
                setTimeout(() => setAdded(false), 2000);
            } else {
                console.error("❌ Failed to add to cart:", res);
                alert(`${res.error}`)
            }
        } catch (error) {
            console.error("🚨 Error adding to cart:", error);
        }
    };


    const incrementQty = () => setQuantity((prev) => Math.min(prev + 1, 10));
    const decrementQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-500 text-lg">
                Loading product...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-gray-600">
                <p className="mb-4 text-lg">Product not found</p>
                <Link href="/" className="text-blue-600 hover:underline">
                    ← Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Product Image */}
                    <div className="relative bg-gray-100 flex justify-center items-center">
                        <img
                            src={product.images?.[0]?.url || '/placeholder.png'}
                            alt={product.name}
                            className="object-cover h-96 md:h-full w-full rounded-l-2xl"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
                            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                            <div className="flex items-center justify-between mb-6">
                                <span className="text-3xl font-semibold text-green-600">
                                    ₹{product.price}
                                </span>
                                <span className="text-sm text-gray-500">Inclusive of all taxes</span>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center border rounded-lg overflow-hidden">
                                    <button
                                        onClick={decrementQty}
                                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-lg"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 text-lg font-medium text-gray-800 bg-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={incrementQty}
                                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Total Price */}
                            <div className="text-lg font-medium text-gray-700 mb-6">
                                Total: <span className="text-green-700 font-semibold">₹{product.price * quantity}</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-5">
                            <button
                                onClick={handleAddToCart}
                                className={`px-6 py-3 text-white font-medium rounded-xl shadow-md transition-all duration-200 ${added
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {added ? '✅ Added to Cart' : '🛒 Add to Cart'}
                            </button>

                            <Link
                                href="/"
                                className="text-gray-600 hover:text-blue-600 font-medium transition"
                            >
                                ← Back to Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
