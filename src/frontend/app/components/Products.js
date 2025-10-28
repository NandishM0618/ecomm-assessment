'use client'
import { useEffect, useState } from 'react';
import apiClient from '../../services/apiService'
import Link from 'next/link';

export default function Products() {
    const [products, setProducts] = useState([]);

    const api = new apiClient();

    async function getProducts(params) {
        try {
            const res = await api.get("products");
            console.log(res.products);
            setProducts(res.products);
        } catch (error) {
            console.log("falied to fetch products")
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <div className="pt-20 text-center mb-8">
                <h1 className="text-4xl font-bold mb-8" id="products">Products List</h1>
                <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
                    {products && products.length > 0 ? (
                        products.map((product, index) => (
                            <div
                                key={index}
                                className="bg-white cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                {product.images && product.images.length > 0 && (
                                    <img
                                        src={product.images[0].url}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-5 flex flex-col justify-between h-full">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-gray-900">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {product.description?.substring(0, 80)}...
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-green-600">
                                                <span className='text-black/70'>Price:</span> ₹{product.price}
                                            </span>
                                            <a href={`/product/${product._id}`}>
                                                <button
                                                    className="px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-200"
                                                >
                                                    Add to Cart
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-lg col-span-full">No products found</p>
                    )}
                </div >
            </div >
        </>
    )
}