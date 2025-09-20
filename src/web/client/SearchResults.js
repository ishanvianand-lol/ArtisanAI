"use client";
import { useState } from 'react';
import { Heart, ShoppingCart, Star, Filter, Grid, List, Sparkles, MapPin, Truck, Shield } from 'lucide-react';

const SearchResults = ({ query, results, isLoading, viewMode, setViewMode, filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const ProductCard = ({ product, isAI = false }) => (
    <div 
      className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
        viewMode === 'list' ? 'flex' : ''
      }`}
      onClick={() => setSelectedProduct(product)}
    >
      {/* Product Image */}
      <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'} overflow-hidden`}>
        <img
          src={product.image || product.url}
          alt={product.name || product.prompt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* AI Badge */}
        {isAI && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI Generated
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
        </button>

        {/* Quick Actions */}
        {!isAI && (
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="flex-1 bg-white/90 hover:bg-white text-gray-900 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
              Quick View
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors">
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {product.name || `AI-Generated ${query} Design`}
          </h3>
          {!isAI && product.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Artisan Info */}
        {!isAI && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{product.artisan?.name || 'Heritage Craftsman'}</span>
            <span>•</span>
            <span>{product.location || 'India'}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description || product.prompt || 'Beautiful handcrafted item made with traditional techniques'}
        </p>

        {/* Price & Actions */}
        <div className="flex items-center justify-between">
          {!isAI ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">₹{product.price || '2,999'}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>
          ) : (
            <span className="text-sm text-purple-600 font-medium">Inspiration • Request Custom</span>
          )}

          <button 
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isAI 
                ? 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {isAI ? 'Get Custom Quote' : 'Add to Cart'}
          </button>
        </div>

        {/* Trust Badges */}
        {!isAI && (
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Shield className="h-3 w-3" />
              <span>Authentic</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Truck className="h-3 w-3" />
              <span>Free Shipping</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Searching for "{query}"</h3>
          <p className="text-gray-600">Finding products and generating AI inspiration...</p>
        </div>
      </div>
    );
  }

  const totalResults = results.database.length + results.ai.length;

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Search Results for "{query}"
          </h2>
          <p className="text-gray-600 mt-1">
            {totalResults} results found ({results.database.length} products + {results.ai.length} AI ideas)
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [0, parseInt(e.target.value)]
                  }))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Categories</option>
                <option value="sarees">Sarees</option>
                <option value="jewelry">Jewelry</option>
                <option value="home-decor">Home Decor</option>
                <option value="handicrafts">Handicrafts</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="0">All Ratings</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Items</option>
                <option value="in-stock">In Stock</option>
                <option value="custom-order">Custom Order</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Database Results Section */}
      {results.database.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Available Products</h3>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {results.database.length} items
            </span>
          </div>
          
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {results.database.map((product, index) => (
              <ProductCard key={`db-${index}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* AI Results Section */}
      {results.ai.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-xl font-semibold text-gray-900">AI-Generated Ideas</h3>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {results.ai.length} ideas
            </span>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <p className="text-purple-800 text-sm">
              <strong>Can't find what you're looking for?</strong> These AI-generated designs show what's possible. 
              Contact our artisans to create custom pieces based on these inspirations.
            </p>
          </div>
          
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {results.ai.map((item, index) => (
              <ProductCard key={`ai-${index}`} product={item} isAI={true} />
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {totalResults === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-6">Try different keywords or browse our categories</p>
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
            Browse All Categories
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;