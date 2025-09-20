// Profile Component
const Profile = ({ user }) => {
  const [profile, setProfile] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    preferences: {
      categories: [],
      priceRange: [0, 50000],
      notifications: {
        orderUpdates: true,
        newArrivals: true,
        offers: true,
        artisanUpdates: false
      }
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid, profile })
      });
      
      if (response.ok) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Sarees', 'Jewelry', 'Home Decor', 'Handicrafts', 'Textiles', 'Pottery'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-orange-600 hover:text-orange-700 border border-orange-200 hover:border-orange-300 rounded-lg font-medium transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Address Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                  rows="2"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={profile.state}
                    onChange={(e) => setProfile(prev => ({ ...prev, state: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={profile.pincode}
                    onChange={(e) => setProfile(prev => ({ ...prev, pincode: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <img
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=f97316&color=ffffff&size=128`}
              alt={user?.displayName}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold text-gray-900">{user?.displayName}</h3>
            <p className="text-gray-600 text-sm">{user?.email}</p>
            <button className="mt-4 px-4 py-2 text-orange-600 hover:text-orange-700 border border-orange-200 hover:border-orange-300 rounded-lg text-sm font-medium transition-colors">
              Change Photo
            </button>
          </div>

          {/* Shopping Preferences */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shopping Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Favorite Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        if (!isEditing) return;
                        setProfile(prev => ({
                          ...prev,
                          preferences: {
                            ...prev.preferences,
                            categories: prev.preferences.categories.includes(category)
                              ? prev.preferences.categories.filter(c => c !== category)
                              : [...prev.preferences.categories, category]
                          }
                        }));
                      }}
                      disabled={!isEditing}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        profile.preferences.categories.includes(category)
                          ? 'bg-orange-100 border-orange-300 text-orange-700'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:border-gray-400'
                      } disabled:cursor-not-allowed`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
            
            <div className="space-y-3">
              {Object.entries(profile.preferences.notifications).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        notifications: {
                          ...prev.preferences.notifications,
                          [key]: e.target.checked
                        }
                      }
                    }))}
                    disabled={!isEditing}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 disabled:cursor-not-allowed"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data
const mockWishlistItems = [
  {
    id: 'WISH-001',
    name: 'Handwoven Banarasi Saree',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop',
    artisan: 'Raj Kumar Textiles',
    location: 'Varanasi, UP',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    addedAt: '2024-01-10'
  },
  {
    id: 'WISH-002',
    name: 'Traditional Kundan Jewelry Set',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    artisan: 'Royal Jewelers',
    location: 'Jaipur, RJ',
    rating: 4.9,
    reviews: 89,
    inStock: false,
    addedAt: '2024-01-08'
  }
];

export { Wishlist, Profile };