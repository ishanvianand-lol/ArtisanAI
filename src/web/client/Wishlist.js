// Wishlist Component
"use client";
import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, Trash2, Share2, Eye } from 'lucide-react';

const Wishlist = ({ userId }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/wishlist?userId=${userId}`);
      const data = await response.json();
      setWishlistItems(data.items || mockWishlistItems);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      setWishlistItems(mockWishlistItems);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await fetch(`/api/wishlist/${itemId}`, { method: 'DELETE' });
      setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const moveToCart = async (item) => {
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: item.id, quantity: 1 })
      });
      removeFromWishlist(item.id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-t-xl"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="h-12 w-12 text-pink-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h3>
        <p className="text-gray-600 mb-8">Save items you love to buy them later</p>
        <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          My Wishlist ({wishlistItems.length} items)
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
          <Share2 className="h-4 w-4" />
          Share Wishlist
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <WishlistCard
            key={item.id}
            item={item}
            onRemove={removeFromWishlist}
            onMoveToCart={moveToCart}
          />
        ))}
      </div>
    </div>
  );
};

const WishlistCard = ({ item, onRemove, onMoveToCart }) => (
  <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
    {/* Product Image */}
    <div className="relative aspect-square overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      {/* Actions Overlay */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900">
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {/* Stock Status */}
      {!item.inStock && (
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Out of Stock
        </div>
      )}
    </div>

    {/* Product Info */}
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
      
      {/* Artisan & Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <span>{item.artisan}</span>
        <span>•</span>
        <span>{item.location}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{item.rating}</span>
        <span className="text-sm text-gray-600">({item.reviews})</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
        {item.originalPrice && (
          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={() => onMoveToCart(item)}
          disabled={!item.inStock}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4" />
          {item.inStock ? 'Move to Cart' : 'Notify When Available'}
        </button>
      </div>
    </div>
  </div>
);