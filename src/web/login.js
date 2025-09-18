import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../web/utils/auth';
import { signInWithGoogle } from '../web/utils/firebase';
import { styles } from '../web/styles/styles';

export default function Login() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/select-role');
    }
  }, [user, loading, router]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading || user) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login | Artisan Marketplace</title>
      </Head>
      <main style={styles.roleSection}>
        <h1 style={styles.sectionTitle}>Join the Community</h1>
        <p style={styles.roleSubtitle}>Sign in to get started on your journey.</p>
        <button onClick={handleGoogleLogin} style={styles.primaryBtn}>
          Sign in with Google
        </button>
      </main>
    </>
  );
}