// components/ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-artisan-blue truncate">{product.name}</h3>
        <p className="text-sm text-artisan-brown mt-1 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-artisan-saffron">₹{product.price}</span>
          <button className="bg-artisan-terracotta text-white text-sm font-medium py-1.5 px-3 rounded-full hover:bg-artisan-brown transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;