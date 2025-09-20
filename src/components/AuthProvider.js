"use client";

import { useAuth } from "@/hooks/useAuth";
import RoleSelectionModal from "./sections/RoleSection";
import RoleBasedHeader from "./common/rolebasedHeader";

export default function AuthProvider({ children }) {
  const { 
    user, 
    role, 
    loading, 
    handleRoleSelect, 
    handleContinue,
    clearError 
  } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Role Selection Modal - appears when user exists but no role */}
      <RoleSelectionModal
        user={user}
        role={role}
        handleRoleSelect={handleRoleSelect}
        handleContinue={handleContinue}
        onSkip={clearError}
      />
      
      {/* Role-based header - appears when user has role */}
      <RoleBasedHeader />
      
      {/* Main content */}
      {children}
    </>
  );
}