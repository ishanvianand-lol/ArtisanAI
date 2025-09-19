// Updated SelectRole component with minimal CSS
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Adjust path as needed
import { useAuth } from '../web/utils/auth';
import RoleCard from '../components/roleCard';
import { styles } from '../web/styles/styles'; // Updated import path
import { FaStore, FaShoppingCart } from 'react-icons/fa';

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
    if (!selectedRole || !user) return;

    setSaving(true);
    setError('');

    try {
      // Save user role to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email,
        role: selectedRole,
        createdAt: new Date(),
        updatedAt: new Date()
      }, { merge: true });

      // Navigate to appropriate dashboard
      if (selectedRole === 'seller') {
        router.push('/seller/dashboard');
      } else if (selectedRole === 'client') {
        router.push('/client/dashboard');
      }
    } catch (error) {
      console.error('Error saving role:', error);
      setError('Failed to save your role. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.spinner}></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <main style={styles.roleSection}>
      <h1 style={styles.sectionTitle}>Choose Your Role</h1>
      <p style={styles.roleSubtitle}>
        Select your primary role to access the right dashboard.
      </p>
      
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #fecaca'
        }}>
          {error}
        </div>
      )}

      <div style={styles.roleCards}>
        <RoleCard
          icon={<FaStore />}
          title="I am an Artisan"
          description="Manage your product listings, track sales, and connect with other creators."
          features={['Product Management (CRUD)', 'Sales Analytics', 'AI Assistant', 'Porter Integration']}
          selected={selectedRole === 'seller'}
          onClick={() => setSelectedRole('seller')}
        />
        <RoleCard
          icon={<FaShoppingCart />}
          title="I am a Client"
          description="Explore and purchase unique handcrafted items from our marketplace."
          features={['Browse Marketplace', 'Shopping Cart', 'Order Tracking']}
          selected={selectedRole === 'client'}
          onClick={() => setSelectedRole('client')}
        />
      </div>
      
      <button
        onClick={handleContinue}
        disabled={!selectedRole || saving}
        style={{
          ...styles.continueBtn,
          ...(!selectedRole && styles.disabledBtn)
        }}
      >
        {saving ? 'Saving...' : 'Continue'}
      </button>
    </main>
  );
}