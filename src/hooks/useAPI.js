// hooks/useAPI.js - Complete API hook for client features
import { useState } from 'react';
import { useAuth } from './useAuth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function useAPI() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get auth token for API calls
  const getAuthToken = async () => {
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  // Generic API call function
  const apiCall = async (endpoint, options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const token = await getAuthToken();
      
      const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        ...options,
      };

      if (options.body && typeof options.body === 'object') {
        config.body = JSON.stringify(options.body);
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('API call error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // CLIENT API CALLS
  const clientAPI = {
    // Browse artisans
    getArtisans: (filters = {}) => apiCall('/client/artisans', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Convert filters to query params
      // In real implementation, you'd append query params
    }),

    // Get artisan details
    getArtisan: (artisanId) => apiCall(`/client/artisans/${artisanId}`),

    // Search artisans
    searchArtisans: (query, filters = {}) => apiCall('/client/artisans/search', {
      method: 'POST',
      body: { query, filters },
    }),

    // Get client orders
    getOrders: (status = 'all') => apiCall(`/client/orders?status=${status}`),

    // Get order details
    getOrder: (orderId) => apiCall(`/client/orders/${orderId}`),

    // Place new order
    createOrder: (orderData) => apiCall('/client/orders', {
      method: 'POST',
      body: orderData,
    }),

    // Cancel order
    cancelOrder: (orderId) => apiCall(`/client/orders/${orderId}/cancel`, {
      method: 'PUT',
    }),

    // Submit review
    submitReview: (orderId, reviewData) => apiCall(`/client/orders/${orderId}/review`, {
      method: 'POST',
      body: reviewData,
    }),

    // Get favorites
    getFavorites: () => apiCall('/client/favorites'),

    // Add to favorites
    addFavorite: (artisanId) => apiCall('/client/favorites', {
      method: 'POST',
      body: { artisanId },
    }),

    // Remove from favorites
    removeFavorite: (artisanId) => apiCall(`/client/favorites/${artisanId}`, {
      method: 'DELETE',
    }),

    // Get client profile
    getProfile: () => apiCall('/client/profile'),

    // Update client profile
    updateProfile: (profileData) => apiCall('/client/profile', {
      method: 'PUT',
      body: profileData,
    }),

    // Get dashboard data
    getDashboard: () => apiCall('/client/dashboard'),
  };

  // AI API CALLS (Enhanced for client)
  const aiAPI = {
    // Generate product ideas
    generateIdeas: (description, preferences = {}) => apiCall('/ai/generate-ideas', {
      method: 'POST',
      body: { description, preferences },
    }),

    // Generate custom design
    generateDesign: (productType, requirements = {}) => apiCall('/ai/generate-design', {
      method: 'POST',
      body: { productType, requirements },
    }),

    // Analyze product feasibility
    analyzeFeasibility: (productDescription, constraints = {}) => apiCall('/ai/analyze-feasibility', {
      method: 'POST',
      body: { productDescription, constraints },
    }),

    // Get AI suggestions for artisans
    suggestArtisans: (productDescription, requirements = {}) => apiCall('/ai/suggest-artisans', {
      method: 'POST',
      body: { productDescription, requirements },
    }),

    // Get AI history
    getHistory: () => apiCall('/ai/history'),

    // Save AI generation
    saveGeneration: (generationData) => apiCall('/ai/save', {
      method: 'POST',
      body: generationData,
    }),
  };

  // CHAT API CALLS
  const chatAPI = {
    // Get conversations
    getConversations: () => apiCall('/chat/conversations'),

    // Get conversation messages
    getMessages: (conversationId) => apiCall(`/chat/conversations/${conversationId}/messages`),

    // Send message
    sendMessage: (conversationId, message) => apiCall('/chat/messages', {
      method: 'POST',
      body: { conversationId, message },
    }),

    // Start new conversation
    startConversation: (artisanId, message) => apiCall('/chat/conversations', {
      method: 'POST',
      body: { artisanId, message },
    }),

    // Mark messages as read
    markAsRead: (conversationId) => apiCall(`/chat/conversations/${conversationId}/read`, {
      method: 'PUT',
    }),
  };

  // PRODUCT API CALLS
  const productAPI = {
    // Get products by artisan
    getArtisanProducts: (artisanId) => apiCall(`/products/artisan/${artisanId}`),

    // Get product details
    getProduct: (productId) => apiCall(`/products/${productId}`),

    // Search products
    searchProducts: (query, filters = {}) => apiCall('/products/search', {
      method: 'POST',
      body: { query, filters },
    }),

    // Get featured products
    getFeaturedProducts: () => apiCall('/products/featured'),

    // Get categories
    getCategories: () => apiCall('/products/categories'),
  };

  // UTILITY FUNCTIONS
  const utilAPI = {
    // Upload image
    uploadImage: async (file, type = 'general') => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', type);

      const token = await getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      return response.json();
    },

    // Get locations
    getLocations: () => apiCall('/utils/locations'),

    // Get app statistics
    getStats: () => apiCall('/utils/stats'),
  };

  return {
    // State
    loading,
    error,
    setError,
    
    // API Groups
    clientAPI,
    aiAPI,
    chatAPI,
    productAPI,
    utilAPI,
    
    // Generic function for custom calls
    apiCall,
  };
}