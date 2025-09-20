import React from 'react';

const ProfileHeader = ({ seller }) => {
  return (
    <div className="px-6 py-6 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="flex items-center gap-4">
        {/* Profile Image with Indian border pattern */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-orange-200 overflow-hidden bg-white shadow-lg">
            <img 
              src={seller.profileImage || '/api/placeholder/80/80'} 
              alt={seller.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Verification badge */}
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-1">{seller.name}</h2>
          <p className="text-orange-600 font-medium text-sm mb-1">
            📍 {seller.location}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            🎨 {seller.craftType}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(seller.rating) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {seller.rating} ({seller.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 bg-white rounded-lg p-4 shadow-sm border border-orange-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-orange-600">{seller.yearsExperience}</div>
            <div className="text-xs text-gray-600">Years Experience</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">{seller.products?.length || 0}</div>
            <div className="text-xs text-gray-600">Products</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{seller.languages?.length || 0}</div>
            <div className="text-xs text-gray-600">Languages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;