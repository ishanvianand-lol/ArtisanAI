import React, { useState } from 'react';

const StorytellingBio = ({ bio }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shortBio = bio?.slice(0, 150) + '...';
  const shouldShowToggle = bio && bio.length > 150;

  return (
    <div className="mx-6">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border-l-4 border-orange-400 shadow-sm">
        {/* Story Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📖</span>
          <h3 className="font-bold text-gray-800 text-lg">My Story</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
        </div>

        {/* Bio Content */}
        <div className="relative">
          <p className="text-gray-700 leading-relaxed text-sm">
            {isExpanded ? bio : (shouldShowToggle ? shortBio : bio)}
          </p>
          
          {shouldShowToggle && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  Show Less 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Read More 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-orange-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">AI Generated Story</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full font-medium">
              ✨ AI Enhanced
            </span>
          </div>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-orange-300 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorytellingBio;