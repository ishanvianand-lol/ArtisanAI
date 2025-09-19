// src/app/profile/page.js
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { updateProfile, updatePassword } from 'firebase/auth';
import { db } from '@/firebase/config';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  BuildingStorefrontIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  CameraIcon,
  ShoppingBagIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState({});
  const [userRole, setUserRole] = useState(null);
  
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    bio: '',
    profileImage: '',
    // Seller-specific fields
    shopName: '',
    craftType: '',
    experience: '',
    specialization: '',
    // Client-specific fields
    interests: '',
    preferredStyle: ''
  });
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserRole(data.role);
        setProfileData({
          displayName: data.displayName || user.displayName || '',
          email: data.email || user.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || '',
          bio: data.bio || '',
          profileImage: data.profileImage || user.photoURL || '',
          // Seller fields
          shopName: data.shopName || '',
          craftType: data.craftType || '',
          experience: data.experience || '',
          specialization: data.specialization || '',
          // Client fields
          interests: data.interests || '',
          preferredStyle: data.preferredStyle || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field) => {
    setEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleCancel = (field) => {
    setEditing(prev => ({ ...prev, [field]: false }));
    loadProfileData();
  };

  const handleSave = async (field) => {
    setSaving(true);
    setError('');
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        [field]: profileData[field],
        updatedAt: new Date()
      });

      if (field === 'displayName') {
        await updateProfile(user, {
          displayName: profileData[field]
        });
      }

      setEditing(prev => ({ ...prev, [field]: false }));
      setSuccess(`${field} updated successfully`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      setError('New passwords do not match');
      return;
    }

    if (passwords.new.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSaving(true);
    try {
      await updatePassword(user, passwords.new);
      setPasswords({ current: '', new: '', confirm: '' });
      setSuccess('Password updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderEditableField = (field, label, icon, type = 'text', placeholder = '') => {
    const isEditing = editing[field];
    
    return (
      <div className="flex items-center justify-between p-4 border-b last:border-b-0">
        <div className="flex items-center space-x-3">
          {icon}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            {isEditing ? (
              <input
                type={type}
                value={profileData[field]}
                onChange={(e) => setProfileData(prev => ({ ...prev, [field]: e.target.value }))}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            ) : (
              <p className="text-gray-900">
                {profileData[field] || <span className="text-gray-500">Not provided</span>}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={() => handleSave(field)}
                disabled={saving}
                className="p-2 text-green-600 hover:text-green-700"
              >
                <CheckIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleCancel(field)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => handleEdit(field)}
              className="p-2 text-amber-600 hover:text-amber-700"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Success/Error Messages */}
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          backgroundColor: '#d1fae5',
          color: '#065f46',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #a7f3d0'
        }}>
          {success}
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 bg-amber-600 rounded-full p-2 cursor-pointer hover:bg-amber-700">
              <CameraIcon className="w-4 h-4 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {profileData.displayName || 'User Profile'}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              {userRole === 'seller' ? (
                <>
                  <BuildingStorefrontIcon className="w-5 h-5 text-amber-600" />
                  <span className="text-amber-600 font-medium">Artisan Seller</span>
                </>
              ) : userRole === 'client' ? (
                <>
                  <UserGroupIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">Client</span>
                </>
              ) : (
                <span className="text-gray-500">Role not selected</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
        </div>
        <div>
          {renderEditableField('displayName', 'Full Name', <UserIcon className="w-5 h-5 text-gray-400" />, 'text', 'Enter your full name')}
          {renderEditableField('email', 'Email', <EnvelopeIcon className="w-5 h-5 text-gray-400" />, 'email', 'your@email.com')}
          {renderEditableField('phone', 'Phone Number', <PhoneIcon className="w-5 h-5 text-gray-400" />, 'tel', '+91 XXXXX XXXXX')}
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Address Details</h2>
        </div>
        <div>
          {renderEditableField('address', 'Street Address', <MapPinIcon className="w-5 h-5 text-gray-400" />, 'text', 'Enter your address')}
          {renderEditableField('city', 'City', <MapPinIcon className="w-5 h-5 text-gray-400" />, 'text', 'Enter your city')}
          {renderEditableField('state', 'State', <MapPinIcon className="w-5 h-5 text-gray-400" />, 'text', 'Enter your state')}
          {renderEditableField('pincode', 'PIN Code', <MapPinIcon className="w-5 h-5 text-gray-400" />, 'text', '000000')}
        </div>
      </div>

      {/* Role-Specific Information */}
      {userRole === 'seller' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Artisan Details</h2>
          </div>
          <div>
            {renderEditableField('shopName', 'Shop/Business Name', <BuildingStorefrontIcon className="w-5 h-5 text-gray-400" />, 'text', 'Enter your shop name')}
            {renderEditableField('craftType', 'Craft Type', <ShoppingBagIcon className="w-5 h-5 text-gray-400" />, 'text', 'e.g., Pottery, Textiles, Jewelry')}
            {renderEditableField('experience', 'Years of Experience', <UserIcon className="w-5 h-5 text-gray-400" />, 'number', 'Enter years of experience')}
            {renderEditableField('specialization', 'Specialization', <ShoppingBagIcon className="w-5 h-5 text-gray-400" />, 'text', 'Your area of expertise')}
          </div>
        </div>
      )}

      {userRole === 'client' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
          </div>
          <div>
            {renderEditableField('interests', 'Interests', <UserGroupIcon className="w-5 h-5 text-gray-400" />, 'text', 'e.g., Traditional crafts, Modern designs')}
            {renderEditableField('preferredStyle', 'Preferred Style', <ShoppingBagIcon className="w-5 h-5 text-gray-400" />, 'text', 'e.g., Minimalist, Ethnic, Contemporary')}
          </div>
        </div>
      )}

      {/* Bio Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {userRole === 'seller' ? 'About Your Craft' : 'About You'}
          </h2>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {editing.bio ? (
                <textarea
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder={userRole === 'seller' ? 
                    'Tell customers about your craft, heritage, and what makes your work special...' : 
                    'Tell us about yourself and what you love about handcrafted items...'
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              ) : (
                <p className="text-gray-900 leading-relaxed">
                  {profileData.bio || (
                    <span className="text-gray-500">
                      {userRole === 'seller' ? 
                        'Share your story and what makes your craft special...' : 
                        'Tell us about yourself...'
                      }
                    </span>
                  )}
                </p>
              )}
            </div>
            <div className="ml-4">
              {editing.bio ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSave('bio')}
                    disabled={saving}
                    className="p-2 text-green-600 hover:text-green-700"
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleCancel('bio')}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit('bio')}
                  className="p-2 text-amber-600 hover:text-amber-700"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
        </div>
        <div className="p-6 space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwords.new}
            onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
          <button
            onClick={handlePasswordChange}
            disabled={saving || !passwords.current || !passwords.new || !passwords.confirm}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  );
}