// src/services/porterService.js

class PorterService {
  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_PORTER_API_KEY;
    this.baseURL = 'https://api.porter.in/v1';
  }

  // Create a delivery request
  async createDelivery(orderData) {
    const deliveryRequest = {
      pickup_details: {
        lat: orderData.seller.latitude,
        lng: orderData.seller.longitude,
        address: orderData.seller.address,
        contact: {
          name: orderData.seller.name,
          phone: orderData.seller.phone
        }
      },
      drop_details: {
        lat: orderData.customer.latitude,
        lng: orderData.customer.longitude,
        address: orderData.customer.address,
        contact: {
          name: orderData.customer.name,
          phone: orderData.customer.phone
        }
      },
      additional_comments: `Heritage artisan product: ${orderData.product.name}. Handle with care - handcrafted item.`,
      is_fragile: true, // Most artisan products are fragile
      package_value: orderData.product.price,
      package_details: {
        weight: orderData.product.weight || 1, // kg
        dimensions: orderData.product.dimensions || { length: 30, width: 25, height: 15 }
      }
    };

    try {
      const response = await fetch(`${this.baseURL}/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(deliveryRequest)
      });

      const result = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          orderId: result.order_id,
          trackingId: result.tracking_id,
          estimatedDelivery: result.estimated_delivery_time,
          cost: result.delivery_cost
        };
      } else {
        throw new Error(result.message || 'Failed to create delivery');
      }
    } catch (error) {
      console.error('Porter API Error:', error);
      throw new Error('Failed to schedule delivery with Porter');
    }
  }

  // Track delivery status
  async trackDelivery(orderId) {
    try {
      const response = await fetch(`${this.baseURL}/orders/${orderId}/track`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      const result = await response.json();
      
      if (response.ok) {
        return {
          status: result.status,
          currentLocation: result.current_location,
          estimatedDelivery: result.estimated_delivery_time,
          deliveryPartner: result.delivery_partner,
          timeline: result.timeline
        };
      } else {
        throw new Error('Failed to track delivery');
      }
    } catch (error) {
      console.error('Tracking Error:', error);
      throw error;
    }
  }

  // Get delivery quote
  async getDeliveryQuote(pickupLocation, dropLocation, packageDetails) {
    const quoteRequest = {
      pickup_lat: pickupLocation.lat,
      pickup_lng: pickupLocation.lng,
      drop_lat: dropLocation.lat,
      drop_lng: dropLocation.lng,
      package_weight: packageDetails.weight || 1,
      is_fragile: true
    };

    try {
      const response = await fetch(`${this.baseURL}/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(quoteRequest)
      });

      const result = await response.json();
      
      if (response.ok) {
        return {
          cost: result.delivery_cost,
          estimatedTime: result.estimated_delivery_time,
          distance: result.distance,
          vehicleType: result.recommended_vehicle
        };
      } else {
        throw new Error('Failed to get delivery quote');
      }
    } catch (error) {
      console.error('Quote Error:', error);
      return {
        cost: 150, // Default fallback cost
        estimatedTime: '2-4 hours',
        distance: 'Unknown',
        vehicleType: 'Bike'
      };
    }
  }

  // Cancel delivery
  async cancelDelivery(orderId, reason) {
    try {
      const response = await fetch(`${this.baseURL}/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({ reason })
      });

      const result = await response.json();
      return response.ok;
    } catch (error) {
      console.error('Cancel Error:', error);
      return false;
    }
  }

  // Get delivery history for seller
  async getDeliveryHistory(sellerId, limit = 20) {
    try {
      const response = await fetch(`${this.baseURL}/orders/history?seller_id=${sellerId}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      const result = await response.json();
      
      if (response.ok) {
        return result.orders.map(order => ({
          id: order.order_id,
          trackingId: order.tracking_id,
          status: order.status,
          createdAt: order.created_at,
          deliveredAt: order.delivered_at,
          customerName: order.drop_details.contact.name,
          deliveryCost: order.delivery_cost
        }));
      } else {
        throw new Error('Failed to get delivery history');
      }
    } catch (error) {
      console.error('History Error:', error);
      return [];
    }
  }

  // Format status for display
  formatStatus(status) {
    const statusMap = {
      'created': 'Order Created',
      'assigned': 'Delivery Partner Assigned',
      'pickup_requested': 'Pickup Requested',
      'picked_up': 'Package Picked Up',
      'in_transit': 'In Transit',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
      'failed': 'Delivery Failed'
    };

    return statusMap[status] || status;
  }

  // Get status color for UI
  getStatusColor(status) {
    const colorMap = {
      'created': 'text-blue-600 bg-blue-100',
      'assigned': 'text-purple-600 bg-purple-100',
      'pickup_requested': 'text-yellow-600 bg-yellow-100',
      'picked_up': 'text-orange-600 bg-orange-100',
      'in_transit': 'text-indigo-600 bg-indigo-100',
      'delivered': 'text-green-600 bg-green-100',
      'cancelled': 'text-red-600 bg-red-100',
      'failed': 'text-red-600 bg-red-100'
    };

    return colorMap[status] || 'text-gray-600 bg-gray-100';
  }
}

export default new PorterService();