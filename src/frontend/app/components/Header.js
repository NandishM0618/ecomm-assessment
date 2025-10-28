'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion';


export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setShowDropdown(false);
        window.location.href = '/';
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const toggleDropdown = () => setShowDropdown((prev) => !prev);
    return (
        <nav className="">
            <div className="bg-none fixed top-0 left-0 z-40 w-full mx-auto px-2 sm:px-6 lg:px-8 bg-gray-100 text-black">
                <div className="mx-auto flex items-center justify-between shadow-2xl">
                    <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between w-full">
                        <div className="flex gap-10 items-center">
                            <h2 className="px-10 tracking-wider font-semibold text-lg">
                                <Link href="/" className="font-serif text-gray-800 ">E-Commerce Cart App</Link>
                            </h2>
                        </div>
                        <div className="flex md:hidden">
                            {/* Mobile menu button */}
                            <button
                                onClick={toggleMobileMenu}
                                type="button"
                                className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="hidden md:flex md:items-center md:ml-6">
                            <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Products</Link>
                            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">About</Link>
                            <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Contact</Link>
                            <Link href="/favorites" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Favorites</Link>
                            <Link href="/cart" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Cart</Link>
                            {isLoggedIn ? (
                                <div className="relative group">
                                    <button onClick={toggleDropdown} className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition">
                                        <User className="w-5 h-5 text-gray-700" />
                                        <div className="text-sm font-medium text-gray-800">
                                            Account
                                        </div>
                                    </button>
                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-md text-sm font-medium transition"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden bg-white border-t border-gray-200 shadow-lg"
                            >
                                <div className="space-y-1 px-4 py-3">
                                    <div className="md:flex md:items-stretch md:ml-6">
                                        <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Products</Link>
                                        <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">About</Link>
                                        <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Contact</Link>
                                        <Link href="/favorites" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Favorites</Link>
                                        <Link href="/cart" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Cart</Link>
                                        {isLoggedIn ? (
                                            <div className="relative group">
                                                <button onClick={toggleDropdown} className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition">
                                                    <User className="w-5 h-5 text-gray-700" />
                                                    <div className="text-sm font-medium text-gray-800">
                                                        Account
                                                    </div>
                                                </button>
                                                {showDropdown && (
                                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md">
                                                        <Link
                                                            href="/profile"
                                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                            onClick={() => setShowDropdown(false)}
                                                        >
                                                            Profile
                                                        </Link>
                                                        <button
                                                            onClick={handleLogout}
                                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                                        >
                                                            Logout
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                href="/login"
                                                className="px-4 py-2 rounded-md text-sm font-medium transition"
                                            >
                                                Login
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </nav>
    )
}