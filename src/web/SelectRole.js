"use client";

import { useState } from 'react';

export default function RoleSelectionPopup() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleContinue = () => {
    if (!selectedRole) return;
    
    console.log('Selected role:', selectedRole);
    // In your app, this would save to Firebase and navigate
    // For demo, we'll just hide the popup
    setIsVisible(false);
    
    // Simulate navigation
    setTimeout(() => {
      alert(`Navigating to ${selectedRole} dashboard...`);
    }, 500);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Heritage Craft</h2>
          <p className="text-gray-600">Role selection completed</p>
          <button 
            onClick={() => setIsVisible(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Show Role Selection Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="relative p-8 pb-6 border-b border-gray-100">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose Your Path</h2>
            <p className="text-gray-600">Select your role to personalize your Heritage Craft experience</p>
          </div>
        </div>

        {/* Role Options */}
        <div className="p-8">
          <div className="grid gap-4 mb-8">
            {/* Artisan Option */}
            <div
              onClick={() => setSelectedRole('seller')}
              className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:scale-[1.02] ${
                selectedRole === 'seller'
                  ? 'border-amber-500 bg-amber-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selectedRole === 'seller' 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">I'm an Artisan</h3>
                  <p className="text-sm text-gray-600">Share your craftsmanship and build your heritage business</p>
                </div>
                {selectedRole === 'seller' && (
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  AI Storytelling
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Global Marketplace
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Authentic Heritage
                </span>
              </div>
            </div>

            {/* Client Option */}
            <div
              onClick={() => setSelectedRole('client')}
              className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:scale-[1.02] ${
                selectedRole === 'client'
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selectedRole === 'client' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">I'm a Collector</h3>
                  <p className="text-sm text-gray-600">Discover authentic handcrafted treasures and their stories</p>
                </div>
                {selectedRole === 'client' && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Curated Stories
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Fair Trade Promise
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                  Direct Connection
                </span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
              selectedRole
                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedRole ? 'Continue to Dashboard' : 'Please select a role'}
          </button>

          {selectedRole && (
            <p className="text-center text-sm text-gray-500 mt-3">
              You'll be taken to your {selectedRole === 'seller' ? 'artisan' : 'collector'} workspace
            </p>
          )}
        </div>
      </div>
    </div>
  );
}