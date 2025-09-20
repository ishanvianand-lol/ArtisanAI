'use client'

import React, { useState } from 'react';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false);

  // Better product data structure
  const products = [
    {
      id: 1,
      name: 'Traditional Terracotta Water Pot (Matka)',
      price: 450,
      originalPrice: 600,
      discount: 25,
      category: 'utility',
      image: '/api/placeholder/300/300',
      gallery: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
      rating: 4.8,
      reviews: 45,
      inStock: true,
      quantity: 15,
      description: 'Handcrafted traditional matka that keeps water naturally cool. Made from finest clay with traditional techniques passed down through generations.',
      features: ['Natural cooling', 'Eco-friendly', 'Traditional design', 'Lead-free'],
      craftTime: '3-4 days',
      tags: ['traditional', 'eco-friendly', 'bestseller']
    },
    {
      id: 2,
      name: 'Decorative Terracotta Diya Set (Pack of 12)',
      price: 320,
      originalPrice: 400,
      discount: 20,
      category: 'decorative',
      image: '/api/placeholder/300/300',
      gallery: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
      rating: 4.9,
      reviews: 78,
      inStock: true,
      quantity: 25,
      description: 'Beautiful handpainted diyas perfect for festivals and celebrations. Each diya is uniquely crafted with traditional motifs.',
      features: ['Hand-painted', 'Festival ready', 'Set of 12', 'Traditional motifs'],
      craftTime: '2-3 days',
      tags: ['festival', 'decorative', 'handpainted']
    },
    {
      id: 3,
      name: 'Artistic Terracotta Planter with Saucer',
      price: 680,
      originalPrice: 850,
      discount: 20,
      category: 'planters',
      image: '/api/placeholder/300/300',
      gallery: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
      rating: 4.7,
      reviews: 32,
      inStock: true,
      quantity: 8,
      description: 'Elegant planter with intricate carved designs. Perfect for indoor plants and garden decoration.',
      features: ['Drainage holes', 'Includes saucer', 'Carved design', 'Weather resistant'],
      craftTime: '5-6 days',
      tags: ['garden', 'artistic', 'carved']
    },
    {
      id: 4,
      name: 'Clay Cooking Handi (Medium)',
      price: 950,
      originalPrice: 1200,
      discount: 21,
      category: 'cookware',
      image: '/api/placeholder/300/300',
      gallery: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
      rating: 4.6,
      reviews: 23,
      inStock: false,
      quantity: 0,
      description: 'Traditional clay handi for healthy cooking. Enhances food flavor naturally and retains nutrients.',
      features: ['Healthy cooking', 'Flavor enhancing', 'Heat resistant', 'Easy to clean'],
      craftTime: '4-5 days',
      tags: ['cookware', 'healthy', 'traditional']
    },
    {
      id: 5,
      name: 'Decorative Terracotta Vase with Floral Design',
      price: 1200,
      originalPrice: 1500,
      discount: 20,
      category: 'decorative',
      image: '/api/placeholder/300/300',
      gallery: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
      rating: 4.9,
      reviews: 56,
      inStock: true,
      quantity: 5,
      description: 'Exquisite vase with hand-painted floral motifs. Perfect centerpiece for home decoration.',
      features: ['Hand-painted florals', 'Premium finish', 'Unique design', 'Gift worthy'],
      craftTime: '6-7 days',
      tags: ['premium', 'handpainted', 'floral', 'gift']
    },
    {
      id: 6,
      name: 'Traditional Tea Kulhad Set (Pack of 6)',
      price: 180,
      originalPrice: 240,
      discount: 25,
      category: 'utility',
      image: '/api/placeholder/300/300',
      gallery: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
      rating: 4.5,
      reviews: 89,
      inStock: true,
      quantity: 30,
      description: 'Authentic clay kulhads for tea and coffee. Enhances the taste and provides earthy aroma.',
      features: ['Set of 6', 'Authentic taste', 'Eco-friendly', 'Disposable/reusable'],
      craftTime: '1-2 days',
      tags: ['kulhad', 'tea', 'authentic', 'bulk']
    }
  ];

  const categories = [
    { key: 'all', label: 'All Products', count: products.length },
    { key: 'utility', label: 'Utility Items', count: products.filter(p => p.category === 'utility').length },
    { key: 'decorative', label: 'Decorative', count: products.filter(p => p.category === 'decorative').length },
    { key: 'planters', label: 'Planters', count: products.filter(p => p.category === 'planters').length },
    { key: 'cookware', label: 'Cookware', count: products.filter(p => p.category === 'cookware').length }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          )}
          {product.tags?.includes('bestseller') && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-sm">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
        
        <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Stock Info */}
        <div className="mb-3">
          {product.inStock ? (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              ✅ In Stock ({product.quantity} available)
            </span>
          ) : (
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
              ❌ Out of Stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button 
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              product.inStock
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button className="w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-lg text-sm font-medium hover:bg-orange-50 transition-all">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                🏺 My Products
              </h2>
              <p className="text-sm text-gray-600">
                {filteredProducts.length} products available
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-orange-600'
                      : 'text-gray-600'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-orange-600'
                      : 'text-gray-600'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.key
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏺</div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-600 text-sm">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Add Product FAB */}
      <button className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-30">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

export default ProductsPage;