import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../web/utils/auth';
import RoleCard from '../components/roleCard';
import { styles } from '../web/styles/styles';
import { FaStore, FaShoppingCart } from 'react-icons/fa';

export default function SelectRole() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      // Redirect unauthenticated users back to the login page
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleContinue = () => {
    if (selectedRole === 'seller') {
      router.push('/seller');
    } else if (selectedRole === 'client') {
      router.push('/client');
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
    <>
      <Head>
        <title>Select Role | Artisan Marketplace</title>
      </Head>
      <main style={styles.roleSection}>
        <h1 style={styles.sectionTitle}>Choose Your Role</h1>
        <p style={styles.roleSubtitle}>
          Select your primary role to access the right dashboard.
        </p>
        <div style={styles.roleCards}>
          <RoleCard
            icon={<FaStore />}
            title="I am an Artisan"
            description="Manage your product listings, track sales, and connect with other creators."
            features={['Product Management (CRUD)', 'Sales Analytics', 'Community Access']}
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
          disabled={!selectedRole}
          style={{
            ...styles.continueBtn,
            ...(!selectedRole && styles.disabledBtn),
          }}
        >
          Continue
        </button>
      </main>
    </>
  );
}