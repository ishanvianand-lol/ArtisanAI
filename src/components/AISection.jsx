// components/sections/AISection.jsx
import { useState } from 'react';

export default function AISection({
  desc,
  setDesc,
  ideas,
  images,
  ideasLoading,
  imagesLoading,
  ideasError,
  imagesError,
  handleGenerateIdeas,
  handleGenerateImages,
  clearIdeas,
  clearImages,
  user,
  role
}) {
  const [activeTab, setActiveTab] = useState('ideas');
  const [selectedImage, setSelectedImage] = useState(null);

  // Quick suggestions for artisan crafts
  const suggestions = [
    "Jaipuri wall art, peacock motifs, deep maroon and ivory colors",
    "Handwoven textiles, geometric patterns, vibrant traditional colors",
    "Brass artifacts, temple bells, golden finish, spiritual decor",
    "Blue pottery style, floral designs, Jaipur heritage ceramics",
    "Carved wooden sculptures, elephant motifs, warm brown tones",
    "Embroidered cushions, mirror work, Rajasthani festive colors"
  ];

  const downloadImage = (imageUrl, index) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `artisan-craft-${index + 1}.jpg`;
    link.target = '_blank';
    link.click();
  };

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            AI Corner Ideas Generator
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Describe your corner's aesthetic and generate beautiful artisan craft ideas
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% Free AI Generation
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Quick Suggestions */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Ideas (click to use):
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setDesc(suggestion)}
                  className="text-left p-3 bg-amber-50 hover:bg-amber-100 rounded-lg text-sm text-gray-700 transition-colors border border-amber-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label htmlFor="aesthetic" className="block text-sm font-medium text-gray-700 mb-2">
              Describe Your Corner Aesthetic
            </label>
            <textarea
              id="aesthetic"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g., Jaipuri wall art, peacock motifs, deep maroon/ivory palette, traditional patterns"
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('ideas')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'ideas'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Text Ideas
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'images'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              AI Images
              {(!user || role !== 'seller') && (
                <span className="ml-2 px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">
                  Seller Only
                </span>
              )}
            </button>
          </div>

          {/* Generate Buttons */}
          <div className="flex space-x-4 mb-8">
            {activeTab === 'ideas' ? (
              <>
                <button
                  onClick={handleGenerateIdeas}
                  disabled={!desc.trim() || ideasLoading}
                  className="bg-amber-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {ideasLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    'Generate Ideas'
                  )}
                </button>
                {ideas.length > 0 && (
                  <button
                    onClick={clearIdeas}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400"
                  >
                    Clear
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => handleGenerateImages(user, role)}
                  disabled={!desc.trim() || imagesLoading || !user || role !== 'seller'}
                  className="bg-amber-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {imagesLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Images...
                    </>
                  ) : (
                    'Generate Free Images'
                  )}
                </button>
                {images.length > 0 && (
                  <button
                    onClick={clearImages}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400"
                  >
                    Clear Images
                  </button>
                )}
              </>
            )}
          </div>

          {/* Results */}
          {activeTab === 'ideas' && (
            <>
              {ideasError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {ideasError}
                </div>
              )}
              
              {ideas.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Artisan Craft Ideas for Your Corner:
                  </h3>
                  <ul className="space-y-3">
                    {ideas.map((idea, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 leading-relaxed">{idea}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {activeTab === 'images' && (
            <>
              {imagesError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {imagesError}
                </div>
              )}

              {(!user || role !== 'seller') && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Free AI image generation is available only for registered sellers. Complete your seller registration to access this feature.
                  </div>
                </div>
              )}
              
              {images.length > 0 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Generated Artisan Craft Images
                    </h3>
                    <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      ✨ Powered by Pollinations.ai
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {images.map((imageUrl, index) => (
                      <div key={index} className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-square">
                          <img
                            src={imageUrl}
                            alt={`Artisan craft idea ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => setSelectedImage(imageUrl)}
                              className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 shadow-md"
                            >
                              View Full
                            </button>
                            <button
                              onClick={() => downloadImage(imageUrl, index)}
                              className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 shadow-md"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h4 className="font-medium text-gray-800">
                            Artisan Craft #{index + 1}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            AI generated from your description
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal for full-size image */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
              <img
                src={selectedImage}
                alt="Full size view"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}