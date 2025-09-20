import React, { useState } from 'react';

const ProductCatalog = ({ products }) => {
  const [filter, setFilter] = useState('all');
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productId) => {
    setCartItems(prev => [...prev, productId]);
    // Add some visual feedback
    setTimeout(() => {
      setCartItems(prev => prev.filter(id => id !== productId));
    }, 1000);
  };

  const categories = ['all', 'vases', 'pots', 'decorative', 'utility'];

  // This is the correct way to filter products based on the 'filter' state
  const filteredProducts = products
    ? products.filter(product => filter === 'all' || product.category === filter)
    : [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🏺</span>
          <h3 className="text-xl font-bold text-gray-800">My Products</h3>
          <span className="text-2xl">✨</span>
        </div>
        <p className="text-gray-600 text-sm">
          Handcrafted with love and tradition
        </p>
      </div>

      ---

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">{products?.length || 0}</div>
            <div className="text-xs text-gray-600">Total Products</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              ₹{products?.reduce((sum, p) => sum + p.price, 0) || 0}
            </div>
            <div className="text-xs text-gray-600">Collection Value</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">4.8⭐</div>
            <div className="text-xs text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>

      ---

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              filter === category
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      ---

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                    ✅ Available
                  </span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-black/50 text-white px-2 py-1 text-xs rounded-full">
                    🏺 Handmade
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-3">
                <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
                  {product.name}
                </h4>
                {/* Story snippet */}
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {product.story}
                </p>
                {/* Price and Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-orange-600">
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-gray-500 line-through">
                      ₹{Math.round(product.price * 1.3)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-xs text-gray-600">4.8</span>
                  </div>
                </div>
                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product.id)}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    cartItems.includes(product.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                  }`}
                >
                  {cartItems.includes(product.id) ? (
                    <span className="flex items-center justify-center gap-1">
                      <span className="text-base">✓</span>
                      Added!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <span className="text-base">🛒</span>
                      Add to Cart
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="text-center py-12 col-span-2">
            <div className="text-6xl mb-4">🏺</div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">No Products Yet</h4>
            <p className="text-gray-500 text-sm">
              Check back soon for amazing handcrafted items!
            </p>
          </div>
        )}
      </div>

      ---

      {/* Featured Banner */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎯</div>
          <div>
            <h4 className="font-bold text-purple-800">Featured Collection</h4>
            <p className="text-purple-600 text-sm">Each piece tells a unique story of craftsmanship</p>
          </div>
        </div>
      </div>

      ---

      {/* Custom Order CTA */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 border border-amber-200">
        <div className="text-center">
          <div className="text-2xl mb-2">🎨</div>
          <h4 className="font-bold text-amber-800 mb-1">Custom Orders Available</h4>
          <p className="text-amber-700 text-sm mb-3">
            Want something special? I can create custom pieces just for you!
          </p>
          <button className="bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-amber-700 transition-colors">
            Request Custom Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;