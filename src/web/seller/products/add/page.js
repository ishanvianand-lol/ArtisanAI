// src/app/seller/products/add/page.js
"use client";

import { useState } from 'react';
import { PhotoIcon, SparklesIcon } from '@heroicons/react/24/outline';
import GeminiService from '@/services/geminiService';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    materials: '',
    technique: '',
    origin: '',
    images: []
  });
  
  const [aiGenerated, setAiGenerated] = useState({
    title: '',
    description: '',
    features: [],
    tags: '',
    pricing: null
  });
  
  const [loading, setLoading] = useState({
    description: false,
    pricing: false
  });

  const categories = [
    'Textiles', 'Pottery', 'Jewelry', 'Woodwork', 'Metalwork', 
    'Leather Goods', 'Paper Crafts', 'Stone Carving', 'Paintings'
  ];

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));

    // Auto-generate description from first image
    if (files.length > 0 && !formData.description) {
      setLoading(prev => ({ ...prev, description: true }));
      try {
        const result = await GeminiService.generateProductDescription(files[0], {
          category: formData.category,
          materials: formData.materials,
          technique: formData.technique,
          origin: formData.origin
        });
        
        setAiGenerated(prev => ({
          ...prev,
          title: result.title,
          description: result.description,
          features: result.features,
          tags: result.tags
        }));
        
        setFormData(prev => ({
          ...prev,
          name: result.title,
          description: result.description
        }));
      } catch (error) {
        console.error('Error generating description:', error);
      } finally {
        setLoading(prev => ({ ...prev, description: false }));
      }
    }
  };

  const generatePricingSuggestion = async () => {
    setLoading(prev => ({ ...prev, pricing: true }));
    try {
      const result = await GeminiService.suggestPricing({
        category: formData.category,
        materials: formData.materials,
        complexity: 'Medium', // Could be dynamic
        timeToMake: 8, // Could be input field
        materialCost: 500 // Could be input field
      });
      
      setAiGenerated(prev => ({ ...prev, pricing: result }));
      setFormData(prev => ({ ...prev, price: result.recommended_price }));
    } catch (error) {
      console.error('Error generating pricing:', error);
    } finally {
      setLoading(prev => ({ ...prev, pricing: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-1">Create a new listing with AI assistance</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Description with AI Enhancement */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Description
              </label>
              {loading.description && (
                <div className="flex items-center text-sm text-purple-600">
                  <SparklesIcon className="h-4 w-4 mr-1 animate-spin" />
                  AI generating...
                </div>
              )}
            </div>
            <textarea
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Describe your handcrafted product..."
            />
            {aiGenerated.features.length > 0 && (
              <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="text-sm font-medium text-purple-900 mb-2">AI Suggested Features:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  {aiGenerated.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Craft Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Materials Used
              </label>
              <input
                type="text"
                value={formData.materials}
                onChange={(e) => setFormData(prev => ({ ...prev, materials: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="e.g., Silk, Cotton, Brass"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Craft Technique
              </label>
              <input
                type="text"
                value={formData.technique}
                onChange={(e) => setFormData(prev => ({ ...prev, technique: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="e.g., Hand weaving, Block printing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin/Region
              </label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="e.g., Rajasthan, Kashmir"
              />
            </div>
          </div>

          {/* Pricing with AI Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Price (₹)
              </label>
              <button
                type="button"
                onClick={generatePricingSuggestion}
                disabled={loading.pricing}
                className="flex items-center px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50"
              >
                <SparklesIcon className={`h-4 w-4 mr-1 ${loading.pricing ? 'animate-spin' : ''}`} />
                {loading.pricing ? 'Calculating...' : 'AI Pricing'}
              </button>
            </div>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter price"
            />
            
            {aiGenerated.pricing && (
              <div className="mt-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="text-sm font-medium text-green-900 mb-2">AI Price Analysis:</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-green-700">Recommended:</span>
                    <p className="font-semibold text-green-900">₹{aiGenerated.pricing.recommended_price}</p>
                  </div>
                  <div>
                    <span className="text-green-700">Range:</span>
                    <p className="font-semibold text-green-900">
                      ₹{aiGenerated.pricing.price_range_min} - ₹{aiGenerated.pricing.price_range_max}
                    </p>
                  </div>
                  <div>
                    <span className="text-green-700">Reasoning:</span>
                    <p className="text-green-800 text-xs">{aiGenerated.pricing.reasoning}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          {aiGenerated.tags && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Tags (AI Generated)
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {aiGenerated.tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Porter Integration Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping & Delivery</h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="porter-delivery"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  defaultChecked
                />
                <label htmlFor="porter-delivery" className="ml-3 text-sm text-blue-900">
                  Enable Porter delivery integration for fast, reliable shipping
                </label>
              </div>
              <p className="text-xs text-blue-700 mt-2">
                Automatic pickup scheduling, real-time tracking, and professional packaging for your handcrafted items.
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 font-medium"
            >
              List Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}/* Image Upload */
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Click to upload images or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
              </label>
            </div>
            
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          