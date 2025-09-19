import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "@/web/styles/components";

// Role Card Component - Fixed
function RoleCard({ title, subtitle, description, selected, onClick, icon, iconStyle }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{
        ...styles.roleCard,
        ...(selected ? styles.roleCardSelected : {}),
        ...(isHovered ? styles.roleCardHover : {})
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {selected && (
        <motion.div 
          style={styles.checkMark}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          ✓
        </motion.div>
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

export default function RoleSelectionModal({ 
  user, 
  role, 
  handleRoleSelect, 
  handleContinue, 
  onSkip,
  isOpen = false // Add explicit isOpen prop
}) {
  const [showModal, setShowModal] = useState(isOpen);
  const [selectedRole, setSelectedRole] = useState(role);
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);

  // Fixed useEffect for modal visibility
  useEffect(() => {
    if (user && !role) {
      setShowCountdown(true);
      setCountdown(5);
      
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setShowCountdown(false);
            setShowModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    } else {
      setShowModal(false);
      setShowCountdown(false);
      setCountdown(5);
    }
  }, [user, role]);

  // Sync selectedRole with prop changes
  useEffect(() => {
    setSelectedRole(role);
  }, [role]);

  // Handle role selection
  const handleRoleClick = async (roleType) => {
    try {
      setSelectedRole(roleType);
      if (handleRoleSelect) {
        await handleRoleSelect(roleType);
      }
    } catch (error) {
      console.error('Error selecting role:', error);
      setSelectedRole(null);
    }
  };

  // Handle continue action
  const handleContinueClick = async () => {
    if (!selectedRole) return;
    
    try {
      if (handleContinue) {
        const result = await handleContinue();
        if (result?.success) {
          setShowModal(false);
        }
      } else {
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error continuing:', error);
    }
  };

  // Handle skip action
  const handleSkip = () => {
    setShowModal(false);
    setShowCountdown(false);
    if (onSkip) {
      onSkip();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleSkip();
    }
  };

  // Don't render anything if no user
  if (!user) return null;

  // Show countdown
  if (showCountdown && countdown > 0) {
    return (
      <AnimatePresence>
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
      </AnimatePresence>
    );
  }

  // Main modal
  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          style={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          key="modal-overlay"
        >
          <motion.div
            style={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            onClick={(e) => e.stopPropagation()}
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
