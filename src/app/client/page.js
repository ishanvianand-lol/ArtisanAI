"use client";
import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Bell, Filter, Grid, List, Sparkles } from 'lucide-react';
import SearchResults from './SearchResults';
import OrderHistory from './OrderHistory';
import Wishlist from './Wishlist';
import Profile from './Profile';

const ClientDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ ai: [], database: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    category: 'all',
    rating: 0,
    availability: 'all'
  });

  // Handle search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // Search both AI and database simultaneously
      const [aiResponse, dbResponse] = await Promise.all([
        fetch('/api/ai/generateProductImages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: searchQuery, filters })
        }),
        fetch('/api/products/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: searchQuery, filters })
        })
      ]);

      const aiData = await aiResponse.json();
      const dbData = await dbResponse.json();

      setSearchResults({
        ai: aiData.images || [],
        database: dbData.products || []
      });
      setActiveTab('search');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: Grid },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Heritage Craft</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for sarees, jewelry, crafts... or describe what you want"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {isSearching ? (
                    <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                  ) : (
                    <Sparkles className="h-5 w-5 text-orange-500 hover:text-orange-600 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              
              <div className="flex items-center gap-2">
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=f97316&color=ffffff`}
                  alt={user?.displayName}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700 font-medium">{user?.displayName}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && <HomeContent onSearch={setSearchQuery} />}
        {activeTab === 'search' && (
          <SearchResults
            query={searchQuery}
            results={searchResults}
            isLoading={isSearching}
            viewMode={viewMode}
            setViewMode={setViewMode}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        {activeTab === 'orders' && <OrderHistory userId={user?.uid} />}
        {activeTab === 'wishlist' && <Wishlist userId={user?.uid} />}
        {activeTab === 'profile' && <Profile user={user} />}
      </main>
    </div>
  );
};

// Home Content Component
const HomeContent = ({ onSearch }) => {
  const categories = [
    { name: 'Sarees', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&h=200&fit=crop', count: '2.5k+ items' },
    { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop', count: '1.8k+ items' },
    { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop', count: '3.2k+ items' },
    { name: 'Handicrafts', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop', count: '900+ items' },
    { name: 'Textiles', image: 'https://images.unsplash.com/photo-1558618666-fbd162c5cd37?w=300&h=200&fit=crop', count: '1.5k+ items' },
    { name: 'Pottery', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&h=200&fit=crop', count: '650+ items' }
  ];

  const trending = [
    'Banarasi sarees', 'Kundan jewelry', 'Rajasthani crafts', 'Block print fabrics', 
    'Brass artifacts', 'Handwoven textiles', 'Traditional pottery', 'Embroidered dupattas'
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">Discover Authentic Indian Crafts</h2>
          <p className="text-xl mb-6 opacity-90">AI-powered search meets traditional craftsmanship</p>
          <div className="flex gap-4">
            <button
              onClick={() => onSearch('beautiful handwoven saree')}
              className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Try AI Search
            </button>
            <button className="px-6 py-3 border border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Browse Categories
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
      </div>

      {/* Categories */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group cursor-pointer"
              onClick={() => onSearch(category.name.toLowerCase())}
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-semibold text-gray-900 text-center">{category.name}</h4>
              <p className="text-sm text-gray-500 text-center">{category.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Searches */}
      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Trending Searches</h3>
        <div className="flex flex-wrap gap-3">
          {trending.map((term) => (
            <button
              key={term}
              onClick={() => onSearch(term)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:border-orange-500 hover:text-orange-600 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </section>

      {/* AI-Powered Features */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-semibold">AI-Powered</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Product Discovery</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Describe what you're looking for in natural language. Our AI will generate visual ideas and find matching products from our artisan marketplace.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">Natural Language Search</h4>
              <p className="text-gray-600 text-sm">Search using descriptions like "elegant red saree for wedding"</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">AI-Generated Ideas</h4>
              <p className="text-gray-600 text-sm">Get visual inspiration when exact matches aren't available</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Personalized Results</h4>
              <p className="text-gray-600 text-sm">Results improve based on your preferences and history</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientDashboard;