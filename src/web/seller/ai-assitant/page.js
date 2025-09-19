// src/app/seller/ai-assistant/page.js
"use client";

import { useState } from 'react';
import { 
  SparklesIcon, 
  ChatBubbleLeftIcon,
  ChartBarIcon,
  CurrencyRupeeIcon,
  PhotoIcon,
  ShareIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import GeminiService from '@/services/geminiService';

const aiFeatures = [
  {
    id: 'product-description',
    title: 'Product Description Generator',
    description: 'Upload product images and get compelling descriptions',
    icon: PhotoIcon,
    color: 'bg-blue-500'
  },
  {
    id: 'pricing-optimizer',
    title: 'Smart Pricing',
    description: 'Get AI-powered pricing suggestions for your products',
    icon: CurrencyRupeeIcon,
    color: 'bg-green-500'
  },
  {
    id: 'social-content',
    title: 'Social Media Content',
    description: 'Generate posts for Instagram, Facebook, and more',
    icon: ShareIcon,
    color: 'bg-purple-500'
  },
  {
    id: 'business-insights',
    title: 'Business Insights',
    description: 'Analyze your sales and get growth recommendations',
    icon: ChartBarIcon,
    color: 'bg-orange-500'
  },
  {
    id: 'heritage-story',
    title: 'Heritage Story Creator',
    description: 'Craft compelling stories about your artisan journey',
    icon: LightBulbIcon,
    color: 'bg-amber-500'
  },
  {
    id: 'customer-chat',
    title: 'Customer Service Assistant',
    description: 'AI-powered responses to customer inquiries',
    icon: ChatBubbleLeftIcon,
    color: 'bg-indigo-500'
  }
];

export default function AIAssistantPage() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const handleFeatureSelect = (feature) => {
    setActiveFeature(feature);
    setInput('');
    setOutput('');
    setChatMessages([]);
  };

  const handleProductDescription = async (imageFile, details) => {
    setLoading(true);
    try {
      const result = await GeminiService.generateProductDescription(imageFile, details);
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePricingSuggestion = async (productData) => {
    setLoading(true);
    try {
      const result = await GeminiService.suggestPricing(productData);
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialContent = async (productData) => {
    setLoading(true);
    try {
      const result = await GeminiService.generateSocialContent(productData);
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerQuery = async (query) => {
    setLoading(true);
    const newMessage = { type: 'user', content: query };
    setChatMessages(prev => [...prev, newMessage]);
    
    try {
      const response = await GeminiService.handleCustomerQuery(query);
      setChatMessages(prev => [...prev, { type: 'ai', content: response }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { type: 'ai', content: `Error: ${error.message}` }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const renderFeatureContent = () => {
    if (!activeFeature) return null;

    switch (activeFeature.id) {
      case 'product-description':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleProductDescription(e.target.files[0], {
                      category: 'Handicraft',
                      materials: 'Traditional materials'
                    });
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              />
            </div>
          </div>
        );

      case 'pricing-optimizer':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product category"
                className="px-3 py-2 border rounded-lg"
                onChange={(e) => setInput(prev => ({ ...prev, category: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Materials used"
                className="px-3 py-2 border rounded-lg"
                onChange={(e) => setInput(prev => ({ ...prev, materials: e.target.value }))}
              />
            </div>
            <button
              onClick={() => handlePricingSuggestion(input)}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Get Pricing Suggestion'}
            </button>
          </div>
        );

      case 'social-content':
        return (
          <div className="space-y-4">
            <textarea
              rows={3}
              placeholder="Describe your product briefly..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <button
              onClick={() => handleSocialContent({ name: input, category: 'Handicraft' })}
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Social Content'}
            </button>
          </div>
        );

      case 'customer-chat':
        return (
          <div className="space-y-4">
            <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-xs ${
                      message.type === 'user'
                        ? 'bg-amber-600 text-white'
                        : 'bg-white border'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-left">
                  <div className="inline-block p-3 rounded-lg bg-gray-200 animate-pulse">
                    AI is typing...
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCustomerQuery(input)}
                placeholder="Type customer question to test AI response..."
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <button
                onClick={() => handleCustomerQuery(input)}
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Feature coming soon...
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
        <p className="text-gray-600 mt-2">
          Powerful AI tools to help you grow your artisan business
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feature Selection */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Tools</h2>
          <div className="space-y-3">
            {aiFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureSelect(feature)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  activeFeature?.id === feature.id
                    ? 'border-amber-500 bg-amber-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center">
                  <div className={`${feature.color} p-2 rounded-lg mr-3`}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Content */}
        <div className="lg:col-span-2">
          {activeFeature ? (
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center mb-6">
                <div className={`${activeFeature.color} p-3 rounded-lg mr-4`}>
                  <activeFeature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {activeFeature.title}
                  </h2>
                  <p className="text-gray-600">{activeFeature.description}</p>
                </div>
              </div>

              {renderFeatureContent()}

              {output && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AI Generated Output:
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                      {output}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-12 text-center">
              <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Choose an AI Tool
              </h2>
              <p className="text-gray-600">
                Select a feature from the left to get started with AI assistance
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}