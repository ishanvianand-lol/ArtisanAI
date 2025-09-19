// web/client/orders.js (Client Orders Page)
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import RoleBasedHeader from "@/components/common/rolebasedHeader";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function ClientOrders() {
  const { user, role, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD-001',
      productName: 'Custom Silver Necklace',
      artisanName: 'Maya Sharma',
      artisanImage: '/placeholder-artisan.jpg',
      productImage: '/placeholder-product.jpg',
      price: 2500,
      status: 'in_progress',
      orderDate: '2024-01-15',
      estimatedDelivery: '2024-02-15',
      description: 'Handcrafted silver necklace with geometric patterns',
      customizations: ['18-inch chain', 'Matte finish', 'Gift box packaging']
    },
    {
      id: 'ORD-002',
      productName: 'Wooden Coffee Table',
      artisanName: 'Rahul Crafts',
      artisanImage: '/placeholder-artisan.jpg',
      productImage: '/placeholder-product.jpg',
      price: 12000,
      status: 'completed',
      orderDate: '2023-12-10',
      deliveryDate: '2024-01-08',
      description: 'Custom teak wood coffee table with storage',
      customizations: ['120cm x 60cm', 'Natural wood finish', 'Storage compartment'],
      rating: 5,
      review: 'Absolutely beautiful craftsmanship! Exceeded my expectations.'
    },
    {
      id: 'ORD-003',
      productName: 'Ceramic Dinner Set',
      artisanName: 'Priya Pottery',
      artisanImage: '/placeholder-artisan.jpg',
      productImage: '/placeholder-product.jpg',
      price: 1800,
      status: 'pending',
      orderDate: '2024-01-20',
      estimatedDelivery: '2024-02-20',
      description: 'Hand-painted ceramic dinner set for 4 people',
      customizations: ['Blue and white design', 'Set of 16 pieces', 'Microwave safe']
    }
  ];

  const statusConfig = {
    pending: {
      label: 'Pending',
      color: 'bg-yellow-100 text-yellow-800',
      icon: '⏳',
      description: 'Waiting for artisan confirmation'
    },
    confirmed: {
      label: 'Confirmed',
      color: 'bg-blue-100 text-blue-800',
      icon: '✅',
      description: 'Order confirmed, work in progress'
    },
    in_progress: {
      label: 'In Progress',
      color: 'bg-orange-100 text-orange-800',
      icon: '🔨',
      description: 'Artisan is working on your order'
    },
    ready: {
      label: 'Ready',
      color: 'bg-purple-100 text-purple-800',
      icon: '📦',
      description: 'Order is ready for delivery'
    },
    shipped: {
      label: 'Shipped',
      color: 'bg-indigo-100 text-indigo-800',
      icon: '🚚',
      description: 'Order has been shipped'
    },
    completed: {
      label: 'Completed',
      color: 'bg-green-100 text-green-800',
      icon: '🎉',
      description: 'Order delivered successfully'
    },
    cancelled: {
      label: 'Cancelled',
      color: 'bg-red-100 text-red-800',
      icon: '❌',
      description: 'Order was cancelled'
    }
  };

  const tabs = [
    { id: 'all', label: 'All Orders', count: mockOrders.length },
    { id: 'active', label: 'Active', count: mockOrders.filter(o => ['pending', 'confirmed', 'in_progress', 'ready', 'shipped'].includes(o.status)).length },
    { id: 'completed', label: 'Completed', count: mockOrders.filter(o => o.status === 'completed').length }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = orders;
    
    if (activeTab === 'active') {
      filtered = orders.filter(order => 
        ['pending', 'confirmed', 'in_progress', 'ready', 'shipped'].includes(order.status)
      );
    } else if (activeTab === 'completed') {
      filtered = orders.filter(order => order.status === 'completed');
    }
    
    setFilteredOrders(filtered);
  }, [orders, activeTab]);

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
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📦 My Orders
          </h1>
          <p className="text-gray-600">
            Track your custom orders and view order history
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status];
              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {order.productName}
                          </h3>
                          <p className="text-blue-600 font-medium">by {order.artisanName}</p>
                          <p className="text-sm text-gray-600">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">
                            Ordered on {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">₹{order.price.toLocaleString()}</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                          <span className="mr-1">{status.icon}</span>
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                          <p className="text-gray-600 text-sm mb-4">{order.description}</p>
                          
                          <h4 className="font-medium text-gray-900 mb-2">Customizations</h4>
                          <ul className="space-y-1">
                            {order.customizations.map((custom, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                {custom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center mb-2">
                              <span className="text-lg mr-2">{status.icon}</span>
                              <span className="font-medium">{status.label}</span>
                            </div>
                            <p className="text-sm text-gray-600">{status.description}</p>
                          </div>

                          {order.estimatedDelivery && (
                            <div className="text-sm">
                              <span className="font-medium text-gray-900">Estimated Delivery: </span>
                              <span className="text-gray-600">
                                {new Date(order.estimatedDelivery).toLocaleDateString()}
                              </span>
                            </div>
                          )}

                          {order.deliveryDate && (
                            <div className="text-sm">
                              <span className="font-medium text-gray-900">Delivered: </span>
                              <span className="text-green-600">
                                {new Date(order.deliveryDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Review Section for Completed Orders */}
                      {order.status === 'completed' && (
                        <div className="border-t border-gray-200 mt-6 pt-6">
                          {order.rating ? (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Your Review</h4>
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-lg ${i < order.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                    ⭐
                                  </span>
                                ))}
                                <span className="ml-2 text-sm text-gray-600">({order.rating}/5)</span>
                              </div>
                              <p className="text-gray-700 text-sm">{order.review}</p>
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Rate this order</h4>
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                Write Review
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="border-t border-gray-200 mt-6 pt-6">
                        <div className="flex gap-3">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Contact Artisan
                          </button>
                          
                          {order.status === 'pending' && (
                            <button className="border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm">
                              Cancel Order
                            </button>
                          )}
                          
                          {order.status === 'completed' && (
                            <button className="border border-blue-300 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                              Reorder
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* No Orders State */
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring artisans and place your first custom order
            </p>
            <button
              onClick={() => window.location.href = '/web/client/browse'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse Artisans
            </button>
          </div>
        )}
      </div>
    </div>
  );
}