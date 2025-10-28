import Link from "next/link";

export default function Header() {

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
                        </div>
                        <div className="hidden md:flex md:items-center md:ml-6">
                            <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Products</Link>
                            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">About</Link>
                            <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Contact</Link>
                            <Link href="/favorites" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Favorites</Link>
                            <Link href="/cart" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Cart</Link>
                            <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}