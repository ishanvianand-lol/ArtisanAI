// src/app/seller/dashboard/index.js
"use client";

import { useState, useEffect } from 'react';
import { 
  ShoppingBagIcon, 
  CurrencyRupeeIcon, 
  UsersIcon,
  TruckIcon,
  SparklesIcon,
  ChartBarIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const stats = [
  { name: 'Total Products', value: '12', change: '+2 this week', icon: ShoppingBagIcon, color: 'bg-blue-500' },
  { name: 'Total Sales', value: '₹45,680', change: '+18% from last month', icon: CurrencyRupeeIcon, color: 'bg-green-500' },
  { name: 'Active Orders', value: '8', change: '3 pending delivery', icon: TruckIcon, color: 'bg-yellow-500' },
  { name: 'Customers', value: '156', change: '+12 new this month', icon: UsersIcon, color: 'bg-purple-500' },
];

const quickActions = [
  { name: 'Add New Product', href: '/seller/products/add', icon: PlusIcon, color: 'bg-amber-500' },
  { name: 'AI Assistant', href: '/seller/ai-assistant', icon: SparklesIcon, color: 'bg-purple-500' },
  { name: 'View Analytics', href: '/seller/analytics', icon: ChartBarIcon, color: 'bg-blue-500' },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Priya Sharma', product: 'Handwoven Silk Scarf', amount: '₹2,850', status: 'Processing', date: '2 hours ago' },
  { id: '#ORD-002', customer: 'Rahul Kumar', product: 'Ceramic Tea Set', amount: '₹4,200', status: 'Shipped', date: '1 day ago' },
  { id: '#ORD-003', customer: 'Anita Patel', product: 'Brass Decorative Lamp', amount: '₹3,500', status: 'Delivered', date: '2 days ago' },
];

export default function SellerDashboard() {
  const [aiInsight, setAiInsight] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading AI insights
    setTimeout(() => {
      setAiInsight('Based on recent trends, handwoven textiles are showing 25% higher demand. Consider featuring your silk products more prominently.');
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Artisan!</h1>
          <p className="text-amber-100 text-lg">
            Your heritage crafts are making an impact. Let's continue building your legacy.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-colors"
              >
                <div className={`${action.color} p-3 rounded-lg mb-3`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center mb-4">
            <SparklesIcon className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">AI Insights</h2>
          </div>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
            </div>
          ) : (
            <p className="text-purple-100 leading-relaxed">{aiInsight}</p>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/seller/orders" className="text-amber-600 hover:text-amber-700 font-medium">
              View all
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}