"use client";
import React from 'react';
import { Sparkles, Download, Image, Palette, Wand2 } from 'lucide-react';

const AISection = ({
  desc,
  setDesc,
  images,
  imagesLoading,
  imagesError,
  handleGenerateImages,
  clearImages,
}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 transform rotate-12 scale-150"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">AI-Powered Design</span>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Create Stunning
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"> Craft Ideas</span>
          </h2>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Transform your vision into beautiful artisan craft designs with our advanced AI. 
            Perfect for sellers looking to create unique, heritage-inspired pieces.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Input Section */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Describe Your Vision</h3>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <textarea
                  className="w-full p-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-blue-200 resize-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-lg leading-relaxed"
                  rows="5"
                  placeholder="Describe your craft vision... e.g., 'Elegant Rajasthani wall art with peacock motifs, deep maroon and gold colors, lotus patterns, traditional Jaipur style ceramics'"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <div className="absolute bottom-4 right-4 text-blue-200 text-sm">
                  {desc.length}/500
                </div>
              </div>

              {/* Example Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-blue-200 text-sm">Popular styles:</span>
                {['Rajasthani', 'Mughal', 'Bengali', 'South Indian', 'Tribal'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setDesc(prev => prev + (prev ? ', ' : '') + tag + ' style')}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full text-white text-sm transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleGenerateImages}
                  disabled={imagesLoading || !desc.trim()}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-xl"
                >
                  {imagesLoading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Images
                    </>
                  )}
                </button>
                
                {images.length > 0 && (
                  <button
                    onClick={clearImages}
                    className="px-8 py-4 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-2xl font-semibold transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {imagesError && (
                <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
                  <p className="text-red-200">{imagesError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {imagesLoading && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center mb-12">
              <div className="animate-spin w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-white mb-3">Creating Your Masterpieces</h3>
              <p className="text-blue-200">Our AI is crafting beautiful, unique designs just for you...</p>
              
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Images Display */}
          {images.length > 0 && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Your AI-Generated Craft Ideas</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {images.map((image, index) => (
                  <div key={image.id} className="group relative">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                      <img
                        src={image.url}
                        alt={`AI Generated Craft Idea ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/512x512/6366f1/white?text=Craft+Idea+${index + 1}`;
                        }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Download Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={image.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-white/90 hover:bg-white text-gray-900 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-xl"
                        >
                          <Download className="w-4 h-4" />
                          Download HD
                        </a>
                      </div>
                    </div>
                    
                    {/* Image Info */}
                    <div className="mt-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="text-white font-semibold text-lg">Design {index + 1}</h4>
                        <span className="px-3 py-1 bg-green-500/20 border border-green-400/50 text-green-300 text-sm rounded-full">
                          AI Generated
                        </span>
                      </div>
                      
                      <p className="text-blue-200 text-sm leading-relaxed">
                        {image.prompt.length > 100 
                          ? `${image.prompt.substring(0, 100)}...` 
                          : image.prompt
                        }
                      </p>
                      
                      <div className="flex gap-3">
                        <a
                          href={image.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 transition-all text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                        
                        <button
                          onClick={() => navigator.clipboard.writeText(image.prompt)}
                          className="px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-lg font-medium transition-all text-sm"
                        >
                          Copy Prompt
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Generate More Button */}
              <div className="text-center mt-8">
                <button
                  onClick={handleGenerateImages}
                  disabled={imagesLoading || !desc.trim()}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-xl font-semibold transition-all"
                >
                  <Wand2 className="w-4 h-4" />
                  Generate More Variations
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AISection;