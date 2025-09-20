"use client";
import { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, Star, MessageCircle, Download, RefreshCw } from 'lucide-react';

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [userId, filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/orders?userId=${userId}&filter=${filter}`);
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      // Mock data for demo
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipped': return <Truck className="h-5 w-5 text-blue-500" />;
      case 'processing': return <Package className="h-5 w-5 text-orange-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'processing', label: 'Processing' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button
            onClick={fetchOrders}
            className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Start shopping to see your orders here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
            <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <span className="text-xl font-bold text-gray-900">₹{order.total}</span>
          </div>
        </div>

        {/* Order Progress */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-gray-600">Ordered</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200">
            <div className={`h-full bg-orange-500 ${order.status !== 'pending' ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className="flex items-center gap-2">
            <Truck className={`h-4 w-4 ${['shipped', 'delivered'].includes(order.status) ? 'text-blue-500' : 'text-gray-300'}`} />
            <span className={`text-sm ${['shipped', 'delivered'].includes(order.status) ? 'text-gray-900' : 'text-gray-400'}`}>Shipped</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200">
            <div className={`h-full bg-blue-500 ${order.status === 'delivered' ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className={`h-4 w-4 ${order.status === 'delivered' ? 'text-green-500' : 'text-gray-300'}`} />
            <span className={`text-sm ${order.status === 'delivered' ? 'text-gray-900' : 'text-gray-400'}`}>Delivered</span>
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {order.items.slice(0, 3).map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg border-2 border-white object-cover"
              />
            ))}
            {order.items.length > 3 && (
              <div className="w-12 h-12 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                +{order.items.length - 3}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
            <p className="text-sm text-gray-600">From {order.artisan.name}</p>
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      {expanded && (
        <div className="p-6 space-y-6">
          {/* Items List */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{item.name}</h5>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                      <span className="font-medium text-gray-900">₹{item.price}</span>
                    </div>
                  </div>
                  {order.status === 'delivered' && (
                    <button className="flex items-center gap-1 px-3 py-1 text-sm text-orange-600 hover:text-orange-700 border border-orange-200 hover:border-orange-300 rounded-lg transition-colors">
                      <Star className="h-4 w-4" />
                      Rate
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Shipping Information</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Address:</span>
                <span className="text-gray-900">{order.shippingAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tracking ID:</span>
                <span className="text-gray-900 font-mono">{order.trackingId || 'Not available'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Delivery:</span>
                <span className="text-gray-900">{order.expectedDelivery}</span>
              </div>
            </div>
          </div>

          {/* Artisan Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Artisan Information</h4>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={order.artisan.avatar}
                alt={order.artisan.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h5 className="font-medium text-gray-900">{order.artisan.name}</h5>
                <p className="text-sm text-gray-600">{order.artisan.location}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{order.artisan.rating}</span>
                  <span className="text-sm text-gray-600">({order.artisan.reviews} reviews)</span>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <MessageCircle className="h-4 w-4" />
                Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-100 flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
        >
          {expanded ? 'Show Less' : 'View Details'}
        </button>
        
        <div className="flex items-center gap-3">
          {order.status === 'delivered' && (
            <>
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <Download className="h-4 w-4" />
                Invoice
              </button>
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg font-medium transition-colors">
                Buy Again
              </button>
            </>
          )}
          {order.status === 'shipped' && (
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg font-medium transition-colors">
              Track Order
            </button>
          )}
          {order.status === 'processing' && (
            <button className="px-4 py-2 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 text-sm rounded-lg font-medium transition-colors">
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Mock data for demo purposes
const mockOrders = [
  {
    id: 'ORD-2024-001',
    createdAt: '2024-01-15',
    status: 'delivered',
    total: 4999,
    items: [
      {
        name: 'Handwoven Banarasi Saree',
        description: 'Pure silk with golden zari work',
        price: 4999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&h=200&fit=crop'
      }
    ],
    artisan: {
      name: 'Raj Kumar Textiles',
      location: 'Varanasi, UP',
      rating: 4.8,
      reviews: 234,
      avatar: 'https://ui-avatars.com/api/?name=RK&background=f97316&color=ffffff'
    },
    shippingAddress: 'Plot 123, Sector 21, Ghaziabad, UP 201001',
    trackingId: 'TRK123456789',
    expectedDelivery: '2024-01-20'
  },
  {
    id: 'ORD-2024-002',
    createdAt: '2024-01-10',
    status: 'shipped',
    total: 2499,
    items: [
      {
        name: 'Brass Decorative Lamp',
        description: 'Traditional design with intricate patterns',
        price: 1299,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop'
      },
      {
        name: 'Handmade Pottery Vase',
        description: 'Blue ceramic with floral motifs',
        price: 1200,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&h=200&fit=crop'
      }
    ],
    artisan: {
      name: 'Artisan Crafts Co.',
      location: 'Jaipur, RJ',
      rating: 4.6,
      reviews: 156,
      avatar: 'https://ui-avatars.com/api/?name=AC&background=3b82f6&color=ffffff'
    },
    shippingAddress: 'Plot 123, Sector 21, Ghaziabad, UP 201001',
    trackingId: 'TRK987654321',
    expectedDelivery: '2024-01-18'
  }
];

// Helper function to get status color (used in component)
const getStatusColor = (status) => {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'shipped': return 'bg-blue-100 text-blue-800';
    case 'processing': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default OrderHistory;