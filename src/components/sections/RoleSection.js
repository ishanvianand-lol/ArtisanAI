import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Add this import at the top:
import { useRouter } from 'next/navigation';

// Heritage-themed inline styles matching your design system
const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 24, 16, 0.4)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    zIndex: 9999
  },
  modal: {
    backgroundColor: '#F5F1EB',
    border: '1px solid rgba(44, 24, 16, 0.15)',
    boxShadow: '0 25px 50px -12px rgba(44, 24, 16, 0.25)',
    width: '100%',
    maxWidth: '520px',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  header: {
    padding: '2rem 2rem 1.5rem',
    borderBottom: '1px solid rgba(44, 24, 16, 0.08)',
    textAlign: 'center'
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem'
  },
  brandIcon: {
    width: '44px',
    height: '44px',
    border: '1px solid rgba(44, 24, 16, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: '#2C1810',
    fontFamily: 'Georgia, serif'
  },
  closeBtn: {
    width: '32px',
    height: '32px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(44, 24, 16, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#2C1810',
    fontSize: '16px',
    transition: 'all 0.2s',
    fontFamily: 'system-ui, sans-serif'
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: '300',
    color: '#2C1810',
    marginBottom: '0.5rem',
    margin: '0',
    fontFamily: 'Georgia, serif',
    letterSpacing: '0.5px',
    lineHeight: '1.2'
  },
  subtitle: {
    fontSize: '1rem',
    color: '#2C1810',
    margin: '0',
    lineHeight: '1.6',
    fontFamily: 'system-ui, sans-serif',
    fontWeight: '300',
    opacity: '0.8'
  },
  content: {
    padding: '2rem'
  },
  roleOption: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(44, 24, 16, 0.15)',
    padding: '1.8rem',
    marginBottom: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  roleOptionSelected: {
    backgroundColor: 'rgba(44, 24, 16, 0.03)',
    borderColor: '#2C1810',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(44, 24, 16, 0.15)'
  },
  roleOptionHover: {
    backgroundColor: 'rgba(44, 24, 16, 0.02)',
    borderColor: 'rgba(44, 24, 16, 0.25)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(44, 24, 16, 0.08)'
  },
  roleHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  roleIcon: {
    width: '54px',
    height: '54px',
    border: '1px solid rgba(44, 24, 16, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    color: '#2C1810',
    transition: 'all 0.3s',
    fontFamily: 'Georgia, serif'
  },
  roleIconSelected: {
    backgroundColor: '#2C1810',
    color: '#F5F1EB',
    borderColor: '#2C1810'
  },
  radioButton: {
    width: '20px',
    height: '20px',
    border: '1px solid rgba(44, 24, 16, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  radioButtonSelected: {
    backgroundColor: '#2C1810',
    borderColor: '#2C1810'
  },
  radioDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#F5F1EB',
    borderRadius: '1px'
  },
  roleTitle: {
    fontSize: '1.25rem',
    fontWeight: '400',
    color: '#2C1810',
    marginBottom: '0.5rem',
    margin: '0',
    fontFamily: 'Georgia, serif',
    letterSpacing: '0.3px'
  },
  roleSubtitleText: {
    fontSize: '0.9rem',
    color: '#8B4513',
    marginBottom: '0.75rem',
    margin: '0',
    fontFamily: 'system-ui, sans-serif',
    fontWeight: '400',
    opacity: '0.85'
  },
  roleDescription: {
    fontSize: '0.95rem',
    color: '#2C1810',
    lineHeight: '1.6',
    margin: '0',
    fontFamily: 'system-ui, sans-serif',
    fontWeight: '300',
    opacity: '0.85'
  },
  actions: {
    marginTop: '2rem',
    textAlign: 'center'
  },
  continueBtn: {
    backgroundColor: '#2C1810',
    color: '#F5F1EB',
    padding: '16px 36px',
    border: '1px solid #2C1810',
    fontSize: '1rem',
    fontWeight: '400',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '1rem',
    fontFamily: 'system-ui, sans-serif',
    letterSpacing: '0.5px',
    width: '100%'
  },
  continueBtnDisabled: {
    opacity: '0.4',
    cursor: 'not-allowed'
  },
  skipBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '0.9rem',
    color: '#2C1810',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    fontFamily: 'system-ui, sans-serif',
    fontWeight: '300',
    opacity: '0.7',
    textDecoration: 'underline'
  }
};

function RoleOption({ title, subtitle, description, icon, selected, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{
        ...styles.roleOption,
        ...(selected ? styles.roleOptionSelected : {}),
        ...(isHovered && !selected ? styles.roleOptionHover : {})
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={styles.roleHeader}>
        <div style={{
          ...styles.roleIcon,
          ...(selected ? styles.roleIconSelected : {})
        }}>
          {icon}
        </div>
        <div style={{
          ...styles.radioButton,
          ...(selected ? styles.radioButtonSelected : {})
        }}>
          {selected && (
            <motion.div 
              style={styles.radioDot}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, type: "spring" }}
            />
          )}
        </div>
      </div>
      
      <div>
        <h3 style={styles.roleTitle}>{title}</h3>
        <p style={styles.roleSubtitleText}>{subtitle}</p>
        <p style={styles.roleDescription}>{description}</p>
      </div>
    </motion.div>
  );
}

export default function RoleSelectionModal({ 
  user, 
  role, 
  handleRoleSelect, 
  handleContinue, 
  onSkip,
  isOpen = false 
}) {
  const [showModal, setShowModal] = useState(isOpen);
  const [selectedRole, setSelectedRole] = useState(role);
  
  // Inside the component function, add:
  const router = useRouter();

  useEffect(() => {
    if (user && !role) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
    
// In the handleContinueClick function, after setShowModal(false):
    const handleContinueClick = async () => {
      if (!selectedRole) return;
      
      try {
        if (handleContinue) {
          const result = await handleContinue();
          if (result?.success) {
            setShowModal(false);
            // Add this line:
            router.push(result.redirectPath);
          }
        }
      } catch (error) {
        console.error('Error continuing:', error);
      }
    };
  }, [user, role]);

  useEffect(() => {
    setSelectedRole(role);
  }, [role]);

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

  const handleSkip = () => {
    setShowModal(false);
    if (onSkip) {
      onSkip();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleSkip();
    }
  };

  if (!user) return null;

  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          style={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            style={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.headerTop}>
                <div style={styles.brandIcon}>
                  ⚱
                </div>
                <button
                  style={styles.closeBtn}
                  onClick={handleSkip}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(44, 24, 16, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  ×
                </button>
              </div>

              <div>
                <h2 style={styles.title}>Choose Your Heritage Path</h2>
                <p style={styles.subtitle}>
                  Join India's premier platform for authentic craftsmanship and cultural preservation
                </p>
              </div>
            </div>

            {/* Content */}
            <div style={styles.content}>
              <RoleOption
                title="I'm an Artisan"
                subtitle="Master of Traditional Craft"
                description="Share your ancestral skills and craftsmanship with collectors who value authentic heritage and artistry"
                icon="✦"
                selected={selectedRole === "seller"}
                onClick={() => handleRoleClick("seller")}
              />
              <RoleOption
                title="I'm a Collector"
                subtitle="Curator of Heritage Treasures"
                description="Discover and acquire authentic handcrafted pieces while directly supporting traditional artisans and their communities"
                icon="◊"
                selected={selectedRole === "client"}
                onClick={() => handleRoleClick("client")}
              />

              <div style={styles.actions}>
                <motion.button
                  onClick={handleContinueClick}
                  disabled={!selectedRole}
                  style={{
                    ...styles.continueBtn,
                    ...(!selectedRole ? styles.continueBtnDisabled : {})
                  }}
                  whileHover={selectedRole ? { y: -1 } : {}}
                  whileTap={selectedRole ? { scale: 0.98 } : {}}
                  onMouseEnter={(e) => {
                    if (selectedRole) {
                      e.target.style.backgroundColor = 'rgba(44, 24, 16, 0.9)';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedRole) {
                      e.target.style.backgroundColor = '#2C1810';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {selectedRole ? 'Enter Heritage Portal' : 'Please select your path'}
                </motion.button>

                <button
                  style={styles.skipBtn}
                  onClick={handleSkip}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '0.7';
                  }}
                >
                  Continue without selecting
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}