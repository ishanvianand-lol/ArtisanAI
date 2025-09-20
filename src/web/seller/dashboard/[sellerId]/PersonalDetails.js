import React from 'react';

const PersonalDetails = ({ seller }) => {
  const detailItems = [
    {
      icon: '👤',
      label: 'Full Name',
      value: seller.name,
      color: 'text-blue-600'
    },
    {
      icon: '📍',
      label: 'Location',
      value: seller.location,
      color: 'text-green-600'
    },
    {
      icon: '🎨',
      label: 'Craft Specialty',
      value: seller.craftType,
      color: 'text-purple-600'
    },
    {
      icon: '⏳',
      label: 'Experience',
      value: `${seller.yearsExperience} Years`,
      color: 'text-orange-600'
    },
    {
      icon: '🗣️',
      label: 'Languages',
      value: seller.languages?.join(', ') || 'Hindi, English',
      color: 'text-teal-600'
    }
  ];

  return (
    <div className="mx-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            <h3 className="font-bold text-gray-800 text-lg">Personal Details</h3>
          </div>
        </div>

        {/* Details List */}
        <div className="p-5 space-y-4">
          {detailItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-sm">{item.icon}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                <div className={`font-medium ${item.color} text-sm`}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Cards */}
        <div className="px-5 pb-5">
          <div className="grid grid-cols-2 gap-3">
            {/* Heritage Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-lg border border-orange-100">
              <div className="text-center">
                <div className="text-xl mb-1">🏛️</div>
                <div className="text-xs text-gray-600 mb-1">Heritage</div>
                <div className="text-sm font-medium text-orange-700">Traditional</div>
              </div>
            </div>

            {/* Quality Badge */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100">
              <div className="text-center">
                <div className="text-xl mb-1">✅</div>
                <div className="text-xs text-gray-600 mb-1">Quality</div>
                <div className="text-sm font-medium text-green-700">Verified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Direct Contact Available</span>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors">
              💬 Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;