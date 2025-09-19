// web/client/browse.js (Browse Artisans Page)
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import RoleBasedHeader from "@/components/common/rolebasedHeader";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function BrowseArtisans() {
  const { user, role, loading } = useAuth();
  const [artisans, setArtisans] = useState([]);
  const [filteredArtisans, setFilteredArtisans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with API call
  const mockArtisans = [
    {
      id: 1,
      name: 'Maya Sharma',
      specialty: 'Silver Jewelry',
      category: 'jewelry',
      location: 'Rajasthan',
      rating: 4.9,
      reviewCount: 156,
      completedOrders: 280,
      priceRange: '₹500 - ₹5,000',
      image: '/placeholder-artisan.jpg',
      isVerified: true,
      responseTime: '< 2 hours',
      tags: ['Custom Design', 'Traditional', 'Handcrafted']
    },
    {
      id: 2,
      name: 'Rahul Crafts',
      specialty: 'Wooden Furniture',
      category: 'woodwork',
      location: 'Kerala',
      rating: 4.8,
      reviewCount: 89,
      completedOrders: 145,
      priceRange: '₹2,000 - ₹25,000',
      image: '/placeholder-artisan.jpg',
      isVerified: true,
      responseTime: '< 4 hours',
      tags: ['Eco-friendly', 'Custom Size', 'Durable']
    },
    {
      id: 3,
      name: 'Priya Pottery',
      specialty: 'Ceramic Art',
      category: 'pottery',
      location: 'Gujarat',
      rating: 4.7,
      reviewCount: 134,
      completedOrders: 203,
      priceRange: '₹300 - ₹3,000',
      image: '/placeholder-artisan.jpg',
      isVerified: false,
      responseTime: '< 6 hours',
      tags: ['Microwave Safe', 'Custom Colors', 'Gift Packaging']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🎨' },
    { id: 'jewelry', name: 'Jewelry', icon: '💍' },
    { id: 'pottery', name: 'Pottery', icon: '🏺' },
    { id: 'textiles', name: 'Textiles', icon: '🧵' },
    { id: 'woodwork', name: 'Woodwork', icon: '🪵' },
    { id: 'metalwork', name: 'Metalwork', icon: '⚒️' },
    { id: 'painting', name: 'Painting', icon: '🖼️' }
  ];

  const locations = [
    'All Locations', 'Rajasthan', 'Gujarat', 'Kerala', 'Karnataka', 'Uttar Pradesh', 'West Bengal'
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArtisans(mockArtisans);
      setFilteredArtisans(mockArtisans);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = artisans;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(artisan =>
        artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(artisan => artisan.category === selectedCategory);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(artisan => artisan.location === selectedLocation);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'orders':
          return b.completedOrders - a.completedOrders;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredArtisans(filtered);
  }, [artisans, searchQuery, selectedCategory, selectedLocation, sortBy]);

  // Show loading if auth is still loading
  if (loading) {
    return <LoadingScreen />;
  }

  // Redirect if not client
  if (!user || role !== 'client') {
    return <div>Access Denied - Client Only</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔍 Discover Amazing Artisans
          </h1>
          <p className="text-gray-600">
            Find talented craftspeople and bring your ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Search</h3>
              <input
                type="text"
                placeholder="Search artisans or specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Location</h3>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location === 'All Locations' ? 'all' : location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Highest Rating</option>
                <option value="orders">Most Orders</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Artisans Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredArtisans.length} artisans
              </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Artisan Cards */
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArtisans.map((artisan) => (
                  <div
                    key={artisan.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gray-200">
                      {artisan.isVerified && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                          ✓ Verified
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        {artisan.responseTime}
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Name & Specialty */}
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {artisan.name}
                        </h3>
                        <p className="text-blue-600 font-medium text-sm">
                          {artisan.specialty}
                        </p>
                        <p className="text-gray-500 text-sm flex items-center">
                          📍 {artisan.location}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">⭐</span>
                          <span className="font-medium">{artisan.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">
                            ({artisan.reviewCount})
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {artisan.completedOrders} orders
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Price Range</p>
                        <p className="font-semibold text-gray-900">{artisan.priceRange}</p>
                      </div>

                      {/* Tags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {artisan.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {artisan.tags.length > 2 && (
                            <span className="text-gray-500 text-xs">
                              +{artisan.tags.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          View Profile
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          ❤️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && filteredArtisans.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No artisans found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}