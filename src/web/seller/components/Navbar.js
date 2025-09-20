// components/Navbar.js
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <div className="text-2xl font-bold text-artisan-terracotta">
          <Link href="/">ArtisanAI</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/seller/dashboard" className="text-artisan-blue font-medium hover:text-artisan-saffron transition-colors">
            My Dashboard
          </Link>
          <Link href="/products" className="bg-artisan-saffron text-white py-1.5 px-4 rounded-full font-medium hover:bg-artisan-terracotta transition-colors">
            All Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;