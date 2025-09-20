import React from 'react';

const ImpactHighlight = ({ sellerName, stats }) => {
  const impactItems = [
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Support',
      description: `Your purchases help support ${sellerName?.split(' ')[0]}'s family of 4`,
      progress: 85,
      color: 'bg-blue-500'
    },
    {
      icon: '🎓',
      title: 'Children\'s Education',
      description: `${stats?.childrenSupported || 2} children's school fees covered`,
      progress: 70,
      color: 'bg-green-500'
    },
    {
      icon: '🔧',
      title: 'Better Tools',
      description: `${stats?.toolsPurchased || 3} new pottery tools purchased`,
      progress: 90,
      color: 'bg-purple-500'
    },
    {
      icon: '🏠',
      title: 'Workshop Upgrade',
      description: 'Saving for a new kiln and workspace expansion',
      progress: 45,
      color: 'bg-orange-500'
    }
  ];

  const salesProgress = ((stats?.currentSales || 7) / (stats?.salesGoal || 10)) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">💝</span>
          <h3 className="text-xl font-bold text-gray-800">Impact Story</h3>
          <span className="text-2xl">🌟</span>
        </div>
        <p className="text-gray-600 text-sm">
          See how your purchases create positive change
        </p>
      </div>

      {/* Current Goal Progress */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🎯</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Monthly Goal</h4>
            <p className="text-sm text-gray-600">Every 10 sales = new pottery wheel fund</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              {stats?.currentSales || 7} of {stats?.salesGoal || 10} sales
            </span>
            <span className="text-sm text-green-600 font-bold">
              {Math.round(salesProgress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${salesProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600">
            {(stats?.salesGoal || 10) - (stats?.currentSales || 7)} more sales needed for new equipment!
          </p>
        </div>
      </div>

      {/* Impact Cards */}
      <div className="space-y-4">
        <h4 className="font-bold text-gray-800 flex items-center gap-2">
          <span className="text-lg">📈</span>
          Your Impact
        </h4>
        
        {impactItems.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">{item.icon}</span>
              </div>
              
              <div className="flex-1">
                <h5 className="font-medium text-gray-800 mb-1">{item.title}</h5>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium text-gray-700">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-700`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community Impact */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
        <div className="text-center mb-4">
          <h4 className="font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <span className="text-xl">🤝</span>
            Community Impact
          </h4>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">25+</div>
            <div className="text-xs text-gray-600">Local Jobs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">500+</div>
            <div className="text-xs text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-600">15</div>
            <div className="text-xs text-gray-600">Years Legacy</div>
          </div>
        </div>
      </div>

      {/* Sustainability Info */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-5 border border-green-100">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-xl">🌱</span>
          Eco-Friendly Practices
        </h4>
        <div className="space-y-3">
          {[
            { practice: 'Natural Clay', desc: 'Sourced from local sustainable deposits' },
            { practice: 'Solar Drying', desc: 'Sun-powered drying process' },
            { practice: 'Minimal Waste', desc: 'Clay scraps recycled into new products' },
            { practice: 'Traditional Methods', desc: 'Low carbon footprint techniques' }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">{item.practice}:</span>
                <span className="text-sm text-gray-600 ml-1">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-5 text-white text-center">
        <h4 className="font-bold text-lg mb-2">Make a Difference Today!</h4>
        <p className="text-sm text-orange-100 mb-4">
          Every purchase directly supports traditional artisans and their families
        </p>
        <button className="bg-white text-orange-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
          Shop Now & Support
        </button>
      </div>
    </div>
  );
};

export default ImpactHighlight;