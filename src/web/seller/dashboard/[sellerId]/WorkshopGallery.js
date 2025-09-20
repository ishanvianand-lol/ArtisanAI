import React, { useState } from 'react';

const WorkshopGallery = ({ images, sellerName }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    { id: 1, url: images?.[0] || '/api/placeholder/300/200', caption: 'Main workshop area where the magic happens' },
    { id: 2, url: images?.[1] || '/api/placeholder/300/200', caption: 'Traditional tools passed down through generations' },
    { id: 3, url: images?.[2] || '/api/placeholder/300/200', caption: 'Clay preparation and shaping process' },
    { id: 4, url: images?.[3] || '/api/placeholder/300/200', caption: 'Firing kiln - where pottery comes to life' },
    { id: 5, url: '/api/placeholder/300/200', caption: 'Finished pieces ready for customers' },
    { id: 6, url: '/api/placeholder/300/200', caption: 'Natural drying area under the sun' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">📸</span>
          <h3 className="text-xl font-bold text-gray-800">Workshop Glimpse</h3>
          <span className="text-2xl">🏛️</span>
        </div>
        <p className="text-gray-600 text-sm">
          Step into {sellerName?.split(' ')[0]}'s traditional workshop
        </p>
      </div>

      {/* Main Featured Image */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <img 
          src={galleryItems[0].url}
          alt="Main workshop"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-sm font-medium">
            {galleryItems[0].caption}
          </p>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            📍 Live Workshop
          </span>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-3">
        {galleryItems.slice(1).map((item, index) => (
          <div 
            key={item.id}
            className="relative group cursor-pointer"
            onClick={() => setSelectedImage(item)}
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-md">
              <img 
                src={item.url}
                alt={`Workshop ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xs font-medium line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Process Timeline */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-orange-100">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">⚡</span>
          Craft Process
        </h4>
        <div className="space-y-3">
          {[
            { step: 1, title: 'Clay Selection', desc: 'Carefully choosing the finest clay' },
            { step: 2, title: 'Shaping', desc: 'Hand-molding with traditional techniques' },
            { step: 3, title: 'Drying', desc: 'Natural air-drying process' },
            { step: 4, title: 'Firing', desc: 'High-temperature kiln firing' },
            { step: 5, title: 'Finishing', desc: 'Final touches and quality check' }
          ].map((process, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {process.step}
              </div>
              <div>
                <div className="font-medium text-gray-800 text-sm">{process.title}</div>
                <div className="text-gray-600 text-xs">{process.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-xl max-w-sm w-full">
            <img 
              src={selectedImage.url}
              alt="Workshop detail"
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <p className="text-gray-700 text-sm">{selectedImage.caption}</p>
              <button 
                onClick={() => setSelectedImage(null)}
                className="mt-3 w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopGallery;