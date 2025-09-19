// utils/animations.js

// Motion presets
export const ease = [0.22, 1, 0.36, 1];

// Common animations
export const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const hoverLift = { 
  whileHover: { y: -4, transition: { duration: 0.2 } } 
};

// Loading animations
export const pulseLoader = {
  initial: { scale: 0.9, opacity: 0.6 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      repeat: Infinity, 
      repeatType: "reverse", 
      duration: 1.2, 
      ease 
    }
  }
};

// Error banner animations
export const slideDown = {
  initial: { y: -12, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.25 } },
  exit: { y: -12, opacity: 0, transition: { duration: 0.2 } }
};

// Hero background animations
export const radialGlowAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1.2, ease }
  }
};

// Lotus floating animation
export const lotusFloat = (index) => ({
  initial: { y: 0, opacity: 0.75 },
  animate: { 
    y: [0, -6, 0],
    transition: { 
      duration: 3 + index * 0.3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
});

// Card hover animations
export const cardHover = {
  whileHover: { y: -6, transition: { duration: 0.2 } }
};

// List item stagger
export const listItemAnimation = (index) => ({
  initial: { opacity: 0, y: 8 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.25, delay: index * 0.04 }
  }
});