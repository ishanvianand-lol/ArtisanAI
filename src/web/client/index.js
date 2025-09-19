// web/client/index.js (Enhanced Client Dashboard)
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import RoleBasedHeader from "@/components/common/rolebasedHeader";
import LoadingScreen from "@/components/common/LoadingScreen";
import Link from "next/link";

export default function ClientDashboard() {
  const { user, role, loading } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    recentOrders: [],
    favoriteArtisans: [],
    recommendations: [],
    stats: {
      totalOrders: 0,
      activeOrders: 0,
      completedOrders: 0,
      savedArtisans: 0
    }
  });

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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.displayName || 'Client'}! 👋
          </h1>
          <p className="text-gray-600">
            Discover amazing artisans and create your dream products
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.stats.totalOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">🔄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.stats.activeOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.stats.completedOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-pink-100 rounded-lg">
                <span className="text-2xl">❤️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Saved Artisans</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.stats.savedArtisans}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/web/client/customize"
                  className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <span className="text-2xl mr-3">🎨</span>
                  <div>
                    <p className="font-medium text-blue-900">AI Customize</p>
                    <p className="text-xs text-blue-700">Create with AI assistance</p>
                  </div>
                </Link>

                <Link
                  href="/web/client/browse"
                  className="w-full flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                >
                  <span className="text-2xl mr-3">🔍</span>
                  <div>
                    <p className="font-medium text-purple-900">Browse Artisans</p>
                    <p className="text-xs text-purple-700">Find talented makers</p>
                  </div>
                </Link>

                <Link
                  href="/web/client/orders"
                  className="w-full flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                >
                  <span className="text-2xl mr-3">📋</span>
                  <div>
                    <p className="font-medium text-green-900">Track Orders</p>
                    <p className="text-xs text-green-700">See order progress</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Categories
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Jewelry', icon: '💍', count: '150+ artisans' },
                  { name: 'Pottery', icon: '🏺', count: '80+ artisans' },
                  { name: 'Textiles', icon: '🧵', count: '200+ artisans' },
                  { name: 'Woodwork', icon: '🪵', count: '120+ artisans' },
                ].map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders & Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Orders
                </h3>
                <Link
                  href="/web/client/orders"
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  View all
                </Link>
              </div>
              
              {dashboardData.recentOrders.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.recentOrders.map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3"></div>
                        <div>
                          <p className="font-medium">{order.productName}</p>
                          <p className="text-sm text-gray-600">by {order.artisanName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{order.price}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl block mb-2">📦</span>
                  <p>No orders yet</p>
                  <Link
                    href="/web/client/browse"
                    className="text-blue-600 text-sm hover:text-blue-700"
                  >
                    Start shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Recommended Artisans */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended for You
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Maya Crafts',
                    specialty: 'Silver Jewelry',
                    rating: 4.9,
                    orders: 150,
                    image: '/placeholder-artisan.jpg'
                  },
                  {
                    name: 'Wooden Wonders',
                    specialty: 'Handcrafted Furniture',
                    rating: 4.8,
                    orders: 89,
                    image: '/placeholder-artisan.jpg'
                  }
                ].map((artisan, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">{artisan.name}</p>
                        <p className="text-sm text-gray-600">{artisan.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        ⭐ {artisan.rating} ({artisan.orders} orders)
                      </span>
                      <button className="text-blue-600 hover:text-blue-700">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}