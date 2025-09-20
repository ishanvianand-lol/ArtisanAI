"use client";

import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/web/utils/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Initialize Google Auth Provider
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  const router = useRouter(); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        console.log('Auth state changed - User signed in:', user.email);
        // Load user role from Firestore
        await loadUserRole(user.uid);
      } else {
        console.log('Auth state changed - No user');
        setRole(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Load user role from Firestore
  const loadUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setRole(userData.role || null);
        console.log('User role loaded:', userData.role);
      }
    } catch (error) {
      console.error('Error loading user role:', error);
    }
  };

  // Save user data to Firestore
  const saveUserData = async (user, additionalData = {}) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // New user - create profile
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL || null,
          createdAt: new Date().toISOString(),
          role: null, // Will be set when user selects role
          ...additionalData
        };
        
        await setDoc(userRef, userData);
        console.log('New user profile created');
      } else {
        // Existing user - update last login
        await setDoc(userRef, {
          lastLogin: new Date().toISOString()
        }, { merge: true });
        console.log('User login time updated');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Email/Password Login
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      console.log('Attempting email login with:', email);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email login successful:', userCredential.user.email);
      
      // Save/update user data
      await saveUserData(userCredential.user);
      
      return userCredential.user;
    } catch (error) {
      console.error('Email login error:', error);
      
      // User-friendly error messages
      let errorMessage = error.message;
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Google Login - UNCHANGED
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Attempting Google login...');
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google login successful:', result.user.email);
      
      // Save/update user data
      await saveUserData(result.user);
      
      return result.user;
    } catch (error) {
      console.error('Google login error:', error);
      
      let errorMessage = error.message;
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up blocked. Please allow pop-ups and try again.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Sign-in was cancelled.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Registration - UPDATED
  const handleRegister = async (email, password, displayName = '') => {
    // Validate inputs
    if (!email || !email.trim()) {
      const errorMessage = 'Email is required.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
    
    if (!password || password.length < 6) {
      const errorMessage = 'Password must be at least 6 characters long.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      setLoading(true);
      setError('');
      console.log('Attempting registration with:', email);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      
      // Update profile with display name if provided
      const finalDisplayName = displayName.trim() || email.split('@')[0];
      
      if (finalDisplayName) {
        await updateProfile(userCredential.user, {
          displayName: finalDisplayName
        });
      }
      
      console.log('Registration successful:', userCredential.user.email);
      
      // Save user data to Firestore with improved error handling
      try {
        await saveUserData(userCredential.user, { 
          displayName: finalDisplayName,
          emailVerified: userCredential.user.emailVerified 
        });
      } catch (firestoreError) {
        console.error('Error saving user data to Firestore:', firestoreError);
        // Still return the user even if Firestore fails
      }
      
      return userCredential.user;
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password registration is not enabled.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        default:
          errorMessage = error.message || 'Registration failed. Please try again.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      setLoading(true);
      console.log('Signing out...');
      
      await signOut(auth);
      setUser(null);
      setRole(null);
      setError('');
      
      console.log('Signed out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Role Selection - UPDATED
  const handleRoleSelect = async (selectedRole) => {
    // Validate inputs
    if (!selectedRole || (selectedRole !== 'seller' && selectedRole !== 'client')) {
      const errorMessage = 'Please select a valid role (seller or client).';
      setError(errorMessage);
      throw new Error(errorMessage);
    }

    if (!user) {
      const errorMessage = 'No user found. Please sign in first.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      setError('');
      console.log('Attempting to save role:', selectedRole);
      
      // Optimistic update
      setRole(selectedRole);
      
      // Save role to Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        role: selectedRole,
        roleSelectedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      console.log('Role saved successfully:', selectedRole);
      return selectedRole;
      
    } catch (error) {
      console.error('Error saving role:', error);
      
      // Revert optimistic update
      setRole(null);
      
      let errorMessage = 'Failed to save role. Please try again.';
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please sign in again.';
      } else if (error.code === 'network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

   // Fixed Continue after role selection
  const handleContinue = () => {
    // Clear any existing errors
    setError('');
    
    // Validate user and role
    if (!user) {
      const errorMessage = 'Please sign in to continue.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
    
    if (!role) {
      const errorMessage = 'Please select a role to continue.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
    
    console.log('Continue validation passed - User:', user.email, 'Role:', role);
    
    // Return success with redirect path
    return { 
      success: true, 
      user, 
      role,
      redirectPath: role === 'seller' ? '/web/seller/dashboard' : '/web/client/dashboard'
    };
  };
  
  // Clear error
  const clearError = () => setError('');

  return {
    // State
    user,
    role,
    loading,
    error,
    
    // Actions
    handleLogin,           // Email/password login
    handleGoogleLogin,     // Google login
    handleRegister,        // Email/password registration - UPDATED
    handleLogout,          // Sign out
    handleRoleSelect,      // Select user role - UPDATED
    handleContinue,        // Continue after role selection - UPDATED
    setError,             // Set error message
    clearError,           // Clear error message
    loadUserRole,         // Reload user role from Firestore
  };
}
