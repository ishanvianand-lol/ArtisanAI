'use client'

import React from 'react';

const Navbar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: '👤',
      color: 'text-blue-600'
    },
    {
      key: 'products',
      label: 'Products',
      icon: '🏺',
      color: 'text-orange-600'
    },
    {
      key: 'workshop',
      label: 'Workshop',
      icon: '🏭',
      color: 'text-green-600'
    },
    {
      key: 'orders',
      label: 'Orders',
      icon: '📦',
      color: 'text-purple-600'
    },
    {
      key: 'impact',
      label: 'Impact',
      icon: '💝',
      color: 'text-pink-600'
    }
  ];

  return (
    <div className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-20">
      {/* App Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-4 py-3">
        <div className="text-center">
          <h1 className="text-white text-lg font-bold flex items-center justify-center gap-2">
            <span className="text-xl">🎨</span>
            ArtisanAI
            <span className="text-yellow-300">✦</span>
          </h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`flex-shrink-0 flex flex-col items-center px-4 py-3 min-w-[70px] transition-all duration-200 ${
              activeSection === item.key
                ? 'bg-orange-50 border-b-2 border-orange-500 text-orange-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;