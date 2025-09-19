// web/client/customize.js (Enhanced version)
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAI } from "@/hooks/useAI";
import { useState } from "react";
import RoleBasedHeader from "@/components/common/rolebasedHeader";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function ClientCustomize() {
  const { user, role, loading } = useAuth();
  const {
    desc,
    setDesc,
    ideas,
    ideasLoading,
    ideasError,
    handleGenerateIdeas,
    clearIdeas,
  } = useAI();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');

  // Show loading if auth is still loading
  if (loading) {
    return <LoadingScreen />;
  }

  // Redirect if not client
  if (!user || role !== 'client') {
    return <div>Access Denied - Client Only</div>;
  }

  const categories = [
    { id: 'jewelry', name: 'Jewelry', icon: '💍' },
    { id: 'pottery', name: 'Pottery', icon: '🏺' },
    { id: 'textiles', name: 'Textiles', icon: '🧵' },
    { id: 'woodwork', name: 'Woodwork', icon: '🪵' },
    { id: 'metalwork', name: 'Metalwork', icon: '⚒️' },
    { id: 'painting', name: 'Painting', icon: '🎨' },
  ];

  const budgetRanges = [
    { id: 'under-1000', name: 'Under ₹1,000', value: '< 1000' },
    { id: '1000-5000', name: '₹1,000 - ₹5,000', value: '1000-5000' },
    { id: '5000-10000', name: '₹5,000 - ₹10,000', value: '5000-10000' },
    { id: 'above-10000', name: 'Above ₹10,000', value: '> 10000' },
  ];

  const timelineOptions = [
    { id: '1-week', name: '1 Week', value: '7 days' },
    { id: '2-weeks', name: '2 Weeks', value: '14 days' },
    { id: '1-month', name: '1 Month', value: '30 days' },
    { id: '2-months', name: '2+ Months', value: '60+ days' },
  ];

  const handleEnhancedGeneration = () => {
    const enhancedDesc = `
      Product Description: ${desc}
      Category: ${selectedCategory}
      Budget Range: ${budget}
      Timeline: ${timeline}
      
      Please generate creative ideas considering these constraints.
    `;
    
    // Use your existing AI generation with enhanced description
    handleGenerateIdeas(enhancedDesc);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleBasedHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎨 AI Product Customization
          </h1>
          <p className="text-gray-600">
            Describe what you want, and our AI will help you create the perfect custom product
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Product Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What do you want to create?
              </h3>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Describe your dream product... (e.g., 'A unique silver necklace with geometric patterns inspired by Art Deco style')"
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Category Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Category
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedCategory === category.name
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-sm font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget & Timeline */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Budget */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Budget Range
                </h3>
                <div className="space-y-2">
                  {budgetRanges.map((range) => (
                    <label key={range.id} className="flex items-center">
                      <input
                        type="radio"
                        name="budget"
                        value={range.value}
                        checked={budget === range.value}
                        onChange={(e) => setBudget(e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      <span className="text-sm">{range.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Timeline
                </h3>
                <div className="space-y-2">
                  {timelineOptions.map((option) => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="radio"
                        name="timeline"
                        value={option.value}
                        checked={timeline === option.value}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      <span className="text-sm">{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={handleEnhancedGeneration}
                disabled={!desc.trim() || ideasLoading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {ideasLoading ? 'Generating Ideas...' : '✨ Generate Ideas'}
              </button>
              
              {ideas.length > 0 && (
                <button
                  onClick={clearIdeas}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Error Display */}
            {ideasError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{ideasError}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Generated Ideas
            </h3>
            
            {ideasLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : ideas.length > 0 ? (
              <div className="space-y-4">
                {ideas.map((idea, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Idea {index + 1}
                    </h4>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      {idea}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded">
                        Find Artisans
                      </button>
                      <button className="text-xs border border-blue-600 text-blue-600 px-3 py-1 rounded">
                        Save Idea
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <div className="text-6xl mb-4">💡</div>
                <p>Your AI-generated ideas will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}