import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "@/web/styles/components";
import { hoverLift } from "@/web/utils/animations";

export default function Header({ user, loading, handleLogin, handleGoogleLogin, handleLogout }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Email/Password Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLoginError('Please enter both email and password');
      return;
    }

    try {
      setLoginLoading(true);
      setLoginError('');
      console.log('Attempting email login with:', email);
      
      await handleLogin(email, password);
      
      // Close modal and reset form on success
      setShowLoginModal(false);
      resetForm();
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Google Login
  const handleGoogleLoginClick = async () => {
    try {
      setLoginLoading(true);
      setLoginError('');
      console.log('Attempting Google login...');
      
      await handleGoogleLogin();
      
      // Close modal on success
      setShowLoginModal(false);
      setShowRegisterModal(false);
      resetForm();
      console.log('Google login successful!');
    } catch (error) {
      console.error('Google login failed:', error);
      setLoginError(error.message || 'Google login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Registration (if you want to add this feature)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLoginError('Please enter both email and password');
      return;
    }

    try {
      setLoginLoading(true);
      setLoginError('');
      console.log('Attempting registration with:', email);
      
      // You'll need to add handleRegister to your useAuth hook
      // await handleRegister(email, password, displayName);
      
      // For now, just do login
      await handleLogin(email, password);
      
      setShowRegisterModal(false);
      resetForm();
      console.log('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      setLoginError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setLoginError('');
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
    resetForm();
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
    resetForm();
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    resetForm();
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      width: '90%',
      maxWidth: '400px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    modalHeader: {
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#2C1810',
      margin: '0 0 0.5rem 0'
    },
    modalSubtitle: {
      color: '#6B7280',
      margin: 0
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box'
    },
    submitBtn: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#2C1810',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      marginBottom: '1rem',
      transition: 'background-color 0.2s'
    },
    googleBtn: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: 'white',
      color: '#374151',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s'
    },
    cancelBtn: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: 'transparent',
      color: '#6B7280',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    error: {
      backgroundColor: '#FEE2E2',
      border: '1px solid #FECACA',
      color: '#DC2626',
      padding: '0.75rem',
      borderRadius: '6px',
      marginBottom: '1rem',
      fontSize: '0.875rem'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '1rem 0',
      color: '#6B7280',
      fontSize: '0.875rem'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      backgroundColor: '#E5E7EB'
    },
    dividerText: {
      padding: '0 1rem'
    },
    switchText: {
      textAlign: 'center',
      color: '#6B7280',
      fontSize: '0.875rem',
      marginTop: '1rem'
    },
    switchLink: {
      color: '#2C1810',
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  };

  return (
    <>
      <motion.header 
        style={styles.header} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1, transition: { duration: 0.4 } }}
      >
        <div style={styles.nav}>
          <div style={styles.logoSection}>
            <svg width="32" height="32" viewBox="0 0 36 36" style={styles.logoSvg}>
              <path d="M18 6L13.5 10.5H9v4.5h4.5L18 10.5l4.5 4.5H27V10.5h-4.5L18 6z" stroke="#2C1810" strokeWidth="1.5" fill="none" />
              <path d="M9 15v9h18v-9M6 24h24v4.5H6z" stroke="#2C1810" strokeWidth="1.5" fill="none" />
              <circle cx="18" cy="19.5" r="2" stroke="#2C1810" strokeWidth="1.5" fill="none" />
            </svg>
            <h2 style={styles.logo}>Heritage Craft</h2>
          </div>

          <nav style={styles.navCenter}>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#artisans" style={styles.navLink}>Artisans</a>
            <a href="#crafts" style={styles.navLink}>Crafts</a>
            <a href="#heritage" style={styles.navLink}>Heritage</a>
          </nav>

          <div style={styles.navRight}>
            {!user ? (
              <div style={styles.authButtons}>
                <motion.button 
                  {...hoverLift} 
                  style={styles.signInBtn} 
                  onClick={openLoginModal} 
                  disabled={loading}
                >
                  {loading ? "..." : "Sign In"}
                </motion.button>
                <motion.button 
                  {...hoverLift} 
                  style={styles.joinBtn} 
                  onClick={openRegisterModal} 
                  disabled={loading}
                >
                  {loading ? "..." : "Join Heritage"}
                </motion.button>
              </div>
            ) : (
              <div style={styles.userSection}>
                <div style={styles.userAvatar}>
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" style={styles.avatarImage} />
                  ) : (
                    <div style={styles.avatarPlaceholder}>
                      {(user.displayName || user.email).charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span style={styles.userName}>
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <button style={styles.logoutBtn} onClick={handleLogout} disabled={loading}>
                  {loading ? "..." : "Exit"}
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            style={modalStyles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModals}
          >
            <motion.div
              style={modalStyles.modal}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={modalStyles.modalHeader}>
                <h3 style={modalStyles.modalTitle}>Welcome Back</h3>
                <p style={modalStyles.modalSubtitle}>Sign in to your Heritage Craft account</p>
              </div>

              {loginError && (
                <div style={modalStyles.error}>
                  {loginError}
                </div>
              )}

              {/* Google Login Button */}
              <button
                type="button"
                style={modalStyles.googleBtn}
                onClick={handleGoogleLoginClick}
                disabled={loginLoading}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M18 9.2c0-.6-.1-1.2-.2-1.8H9.2v3.4h4.9c-.2 1.1-.8 2-1.7 2.6v2.2h2.7C16.8 13.9 18 11.8 18 9.2z"/>
                  <path fill="#34A853" d="M9.2 18c2.4 0 4.4-.8 5.9-2.2l-2.7-2.2c-.8.5-1.8.8-3.2.8-2.4 0-4.4-1.6-5.1-3.8H1.4v2.3C2.9 15.4 5.9 18 9.2 18z"/>
                  <path fill="#FBBC04" d="M4.1 10.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V4.9H1.4C.5 6.6 0 7.8 0 9.2s.5 2.6 1.4 4.3l2.7-2.8z"/>
                  <path fill="#EA4335" d="M9.2 3.6c1.4 0 2.6.5 3.6 1.4L15.5 2C14 .7 11.9 0 9.2 0 5.9 0 2.9 2.1 1.4 5.4L4.1 7.7C4.8 5.2 6.8 3.6 9.2 3.6z"/>
                </svg>
                {loginLoading ? 'Signing in...' : 'Continue with Google'}
              </button>

              <div style={modalStyles.divider}>
                <div style={modalStyles.dividerLine}></div>
                <span style={modalStyles.dividerText}>or</span>
                <div style={modalStyles.dividerLine}></div>
              </div>

              <div>
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Email</label>
                  <input
                    type="email"
                    style={modalStyles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loginLoading}
                  />
                </div>

                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Password</label>
                  <input
                    type="password"
                    style={modalStyles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loginLoading}
                  />
                </div>

                <button
                  type="button"
                  style={modalStyles.submitBtn}
                  onClick={handleLoginSubmit}
                  disabled={loginLoading}
                >
                  {loginLoading ? 'Signing in...' : 'Sign In'}
                </button>

                <button
                  type="button"
                  style={modalStyles.cancelBtn}
                  onClick={closeModals}
                  disabled={loginLoading}
                >
                  Cancel
                </button>

                <div style={modalStyles.switchText}>
                  Don't have an account?{' '}
                  <span style={modalStyles.switchLink} onClick={openRegisterModal}>
                    Sign up
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <AnimatePresence>
        {showRegisterModal && (
          <motion.div
            style={modalStyles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModals}
          >
            <motion.div
              style={modalStyles.modal}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={modalStyles.modalHeader}>
                <h3 style={modalStyles.modalTitle}>Join Heritage</h3>
                <p style={modalStyles.modalSubtitle}>Create your Heritage Craft account</p>
              </div>

              {loginError && (
                <div style={modalStyles.error}>
                  {loginError}
                </div>
              )}

              {/* Google Signup Button */}
              <button
                type="button"
                style={modalStyles.googleBtn}
                onClick={handleGoogleLoginClick}
                disabled={loginLoading}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M18 9.2c0-.6-.1-1.2-.2-1.8H9.2v3.4h4.9c-.2 1.1-.8 2-1.7 2.6v2.2h2.7C16.8 13.9 18 11.8 18 9.2z"/>
                  <path fill="#34A853" d="M9.2 18c2.4 0 4.4-.8 5.9-2.2l-2.7-2.2c-.8.5-1.8.8-3.2.8-2.4 0-4.4-1.6-5.1-3.8H1.4v2.3C2.9 15.4 5.9 18 9.2 18z"/>
                  <path fill="#FBBC04" d="M4.1 10.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V4.9H1.4C.5 6.6 0 7.8 0 9.2s.5 2.6 1.4 4.3l2.7-2.8z"/>
                  <path fill="#EA4335" d="M9.2 3.6c1.4 0 2.6.5 3.6 1.4L15.5 2C14 .7 11.9 0 9.2 0 5.9 0 2.9 2.1 1.4 5.4L4.1 7.7C4.8 5.2 6.8 3.6 9.2 3.6z"/>
                </svg>
                {loginLoading ? 'Creating account...' : 'Continue with Google'}
              </button>

              <div style={modalStyles.divider}>
                <div style={modalStyles.dividerLine}></div>
                <span style={modalStyles.dividerText}>or</span>
                <div style={modalStyles.dividerLine}></div>
              </div>

              <div>
                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Display Name (Optional)</label>
                  <input
                    type="text"
                    style={modalStyles.input}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                    disabled={loginLoading}
                  />
                </div>

                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Email</label>
                  <input
                    type="email"
                    style={modalStyles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loginLoading}
                  />
                </div>

                <div style={modalStyles.formGroup}>
                  <label style={modalStyles.label}>Password</label>
                  <input
                    type="password"
                    style={modalStyles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    disabled={loginLoading}
                  />
                </div>

                <button
                  type="button"
                  style={modalStyles.submitBtn}
                  onClick={handleRegisterSubmit}
                  disabled={loginLoading}
                >
                  {loginLoading ? 'Creating account...' : 'Create Account'}
                </button>

                <button
                  type="button"
                  style={modalStyles.cancelBtn}
                  onClick={closeModals}
                  disabled={loginLoading}
                >
                  Cancel
                </button>

                <div style={modalStyles.switchText}>
                  Already have an account?{' '}
                  <span style={modalStyles.switchLink} onClick={openLoginModal}>
                    Sign in
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}