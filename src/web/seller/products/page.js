// products/[sellerId]/page.js
import React from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

const ProductCatalogPage = ({ params }) => {
  const sellerId = params.sellerId;
  // Fetch products for this specific seller
  const products = [
    { id: 1, name: "Terracotta Pot", price: 500, image: "/path/to/image1.jpg" },
    { id: 2, name: "Hand-painted Saree", price: 2500, image: "/path/to/image2.jpg" },
    // more products...
  ];

  return (
    <div className="bg-artisan-cream font-sans text-artisan-brown min-h-screen">
      <Navbar />

      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-artisan-blue mb-6 border-b-2 border-artisan-saffron pb-2">
          Products from [Seller Name]
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductCatalogPage;