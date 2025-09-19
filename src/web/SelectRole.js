"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './utils/auth';

export default function SelectRole() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleContinue = async () => {
    console.log('🚀 Continue clicked');
    console.log('📝 Selected role:', selectedRole);
    console.log('👤 User:', user?.email);
    
    if (!selectedRole || !user) {
      console.log('❌ Missing selectedRole or user');
      setError('Please select a role and ensure you are logged in.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      console.log('💾 Saving to Firestore...');
      
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email,
        role: selectedRole,
        createdAt: new Date(),
        updatedAt: new Date()
      }, { merge: true });

      console.log('✅ Firestore save successful');

      // Determine the path
      const targetPath = selectedRole === 'seller' ? '/seller/dashboard' : '/client/dashboard';
      console.log('🎯 Target path:', targetPath);

      // Try multiple navigation methods
      try {
        console.log('🔄 Attempting router.push...');
        await router.push(targetPath);
        console.log('✅ Router.push completed');
      } catch (routerError) {
        console.log('❌ Router.push failed, trying window.location');
        console.error('Router error:', routerError);
        window.location.href = targetPath;
      }

    } catch (error) {
      console.error('💥 Error in handleContinue:', error);
      setError('Failed to save your role: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Test function to check if dashboard pages work
  const testNavigation = () => {
    console.log('🧪 Testing direct navigation...');
    window.location.href = '/client/dashboard';
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Artisan Marketplace</h1>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="text-sm text-gray-600">{user?.displayName || user?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Panel - Remove this in production */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-yellow-800 mb-2">🐛 Debug Info:</h3>
          <p className="text-sm text-yellow-700">User: {user?.email || 'None'}</p>
          <p className="text-sm text-yellow-700">Selected Role: {selectedRole || 'None'}</p>
          <p className="text-sm text-yellow-700">Saving: {saving ? 'Yes' : 'No'}</p>
          
          <button
            onClick={testNavigation}
            className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded text-sm"
          >
            🧪 Test Direct Navigation
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Journey</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your role to unlock a personalized experience tailored just for you
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {/* Your existing role cards - keep them exactly as they are */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Keep your existing Artisan Card */}
          <div
            onClick={() => {
              console.log('🎨 Seller card clicked');
              setSelectedRole('seller');
            }}
            className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              selectedRole === 'seller'
                ? 'ring-2 ring-indigo-500 shadow-xl'
                : 'hover:shadow-lg'
            }`}
          >
            {/* Your existing card content */}
            <div className="bg-white rounded-xl p-8 h-full border border-gray-200">
              {selectedRole === 'seller' && (
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm an Artisan</h3>
                <p className="text-gray-600 mb-6">Share your creativity with the world and build your craft business</p>
              </div>

              {/* Keep your existing features list */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Create and manage product listings
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Track sales and analytics
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-powered business assistant
                </div>
                <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Integrated shipping with Porter
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Keep your existing Client Card */}
          <div
            onClick={() => {
              console.log('🛍️ Client card clicked');
              setSelectedRole('client');
            }}
            className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              selectedRole === 'client'
                ? 'ring-2 ring-indigo-500 shadow-xl'
                : 'hover:shadow-lg'
            }`}
          >
            <div className="bg-white rounded-xl p-8 h-full border border-gray-200">
              {selectedRole === 'client' && (
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a Client</h3>
                <p className="text-gray-600 mb-6">Discover unique handcrafted treasures from talented artisans</p>
              </div>

              {/* Keep your existing features */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Browse curated marketplace
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Smart shopping cart
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time order tracking
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Direct artisan messaging
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button - Enhanced */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole || saving}
            className={`
              px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform
              ${selectedRole && !saving
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
              ${saving ? 'animate-pulse' : ''}
            `}
          >
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Setting up your account...
              </div>
            ) : (
              `Continue to Dashboard ${selectedRole ? `(${selectedRole})` : ''}`
            )}
          </button>
          
          {selectedRole && (
            <p className="mt-4 text-sm text-gray-500">
              You selected: <span className="font-medium text-gray-700">
                {selectedRole === 'seller' ? 'Artisan' : 'Client'}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 Artisan Marketplace. Connecting creators with collectors worldwide.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
