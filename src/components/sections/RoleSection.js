import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock styles for demo - replace with your actual styles
const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3000,
    padding: '1rem'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '3rem 2rem',
    width: '90%',
    maxWidth: '600px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#6B7280',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'background-color 0.2s'
  },
  roleHeader: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: '0.5rem',
    margin: 0
  },
  roleSubtitle: {
    color: '#6B7280',
    fontSize: '1.1rem',
    margin: 0
  },
  roleCards: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  roleCard: {
    border: '2px solid #E5E7EB',
    borderRadius: '12px',
    padding: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    backgroundColor: 'white',
    position: 'relative'
  },
  roleCardSelected: {
    borderColor: '#2C1810',
    backgroundColor: '#FEF7ED',
    boxShadow: '0 8px 25px rgba(44, 24, 16, 0.15)'
  },
  roleCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)'
  },
  cardIcon: {
    width: '48px',
    height: '48px',
    margin: '0 auto 1rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem'
  },
  sellerIcon: {
    backgroundColor: '#FEF3C7',
    color: '#92400E'
  },
  buyerIcon: {
    backgroundColor: '#E0F2FE',
    color: '#0369A1'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: '0.5rem',
    margin: 0
  },
  cardSubtitle: {
    color: '#8B5CF6',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.75rem',
    margin: 0
  },
  cardDescription: {
    color: '#6B7280',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    margin: 0
  },
  checkMark: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#10B981',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem'
  },
  continueBtn: {
    width: '100%',
    padding: '1rem 2rem',
    backgroundColor: '#2C1810',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '1rem'
  },
  disabledBtn: {
    backgroundColor: '#D1D5DB',
    color: '#9CA3AF',
    cursor: 'not-allowed'
  },
  skipBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'transparent',
    color: '#6B7280',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  countdown: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: '0.875rem',
    marginBottom: '1rem'
  },
  mobileCards: {
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem'
    }
  }
};

// Role Card Component
function RoleCard({ title, subtitle, description, selected, onClick, icon, iconStyle }) {
  return (
    <motion.div
      style={{
        ...styles.roleCard,
        ...(selected ? styles.roleCardSelected : {})
      }}
      onClick={onClick}
      whileHover={styles.roleCardHover}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {selected && (
        <div style={styles.checkMark}>
          ✓
        </div>
      )}
      
      <div style={{ ...styles.cardIcon, ...iconStyle }}>
        {icon}
      </div>
      
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardSubtitle}>{subtitle}</p>
      <p style={styles.cardDescription}>{description}</p>
    </motion.div>
  );
}

export default function RoleSelectionModal({ user, role, handleRoleSelect, handleContinue, onSkip }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(role);
  const [countdown, setCountdown] = useState(5);

  // Show modal after user logs in and doesn't have a role
  useEffect(() => {
    if (user && !role) {
      // Start countdown
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setShowModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else {
      setShowModal(false);
      setCountdown(5);
    }
  }, [user, role]);

  // Reset countdown when user changes
  useEffect(() => {
    if (!user) {
      setCountdown(5);
      setShowModal(false);
    }
  }, [user]);

  const handleRoleClick = (roleType) => {
    setSelectedRole(roleType);
    handleRoleSelect(roleType);
  };

  const handleContinueClick = () => {
    if (selectedRole) {
      handleContinue();
      setShowModal(false);
    }
  };

  const handleSkip = () => {
    setShowModal(false);
    if (onSkip) onSkip();
  };

  // Don't show if no user or user already has a role
  if (!user || role) return null;

  // Show countdown while waiting
  if (!showModal && countdown > 0) {
    return (
      <motion.div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          zIndex: 2500,
          textAlign: 'center'
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <p style={{ margin: 0, fontSize: '1.1rem' }}>
          Welcome! Role selection opening in {countdown}...
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          style={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && handleSkip()}
        >
          <motion.div
            style={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              style={styles.closeBtn}
              onClick={handleSkip}
              title="Skip for now"
            >
              ×
            </button>

            <div style={styles.roleHeader}>
              <h2 style={styles.sectionTitle}>Choose Your Heritage Path</h2>
              <p style={styles.roleSubtitle}>
                Select your journey in preserving India's craft legacy
              </p>
            </div>

            <div style={{ ...styles.roleCards, ...styles.mobileCards }}>
              <RoleCard
                title="I'm A Seller"
                subtitle="Share your craft with the world"
                description="Join a community of master craftspeople and showcase your heritage skills to global collectors"
                selected={selectedRole === "seller"}
                onClick={() => handleRoleClick("seller")}
                icon="🎨"
                iconStyle={styles.sellerIcon}
              />
              <RoleCard
                title="I'm A Buyer"
                subtitle="Discover authentic masterpieces"
                description="Explore curated collections of traditional crafts and connect directly with skilled artisans"
                selected={selectedRole === "client"}
                onClick={() => handleRoleClick("client")}
                icon="🛍️"
                iconStyle={styles.buyerIcon}
              />
            </div>

            <motion.button
              onClick={handleContinueClick}
              disabled={!selectedRole}
              style={{
                ...styles.continueBtn,
                ...(!selectedRole ? styles.disabledBtn : {})
              }}
              whileHover={!selectedRole ? undefined : { y: -2 }}
              whileTap={!selectedRole ? undefined : { scale: 0.98 }}
            >
              {selectedRole ? 'Enter Heritage Portal' : 'Select a role to continue'}
            </motion.button>

            <button
              style={styles.skipBtn}
              onClick={handleSkip}
            >
              Skip for now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}