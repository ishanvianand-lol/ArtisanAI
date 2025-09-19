// src/utils/constants.js

// Theme Colors
export const COLORS = {
  primary: "#2C1810",
  background: "#F5F1EB",
  accent: "#FFD2AA",
  text: "#2C1810",
  textSecondary: "#8B4513",
  border: "rgba(44, 24, 16, 0.12)",
  borderLight: "rgba(44, 24, 16, 0.08)",
  borderMedium: "rgba(44, 24, 16, 0.15)",
  borderDark: "rgba(44, 24, 16, 0.25)",
  overlay: "rgba(44, 24, 16, 0.5)",
  white: "#fff",
  error: "#8B0000",
  success: "#2D5016",
  warning: "#B8860B",
  hero: "#0F0A0A",
  glow: "rgba(255,153,153,0.35)",
  lotus: "#F6B2B2",
  lotusLight: "#FFE7E7",
};

// Typography
export const FONTS = {
  serif: "Georgia, serif",
  sansSerif: "system-ui, sans-serif",
  mono: "Monaco, Consolas, 'Courier New', monospace",
};

export const FONT_SIZES = {
  xs: "0.75rem",
  sm: "0.85rem",
  base: "0.95rem",
  md: "1rem",
  lg: "1.15rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
  "4xl": "2.6rem",
  "5xl": "3.6rem",
};

export const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// Spacing
export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "48px",
  "5xl": "64px",
  "6xl": "80px",
  "7xl": "100px",
  "8xl": "120px",
};

// Breakpoints
export const BREAKPOINTS = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px",
  ultraWide: "1440px",
};

// Z-Index layers
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1070,
  toast: 9999,
};

// Animation durations
export const TRANSITIONS = {
  fast: "0.15s",
  normal: "0.2s",
  slow: "0.3s",
  slower: "0.6s",
};

// Easing curves
export const EASING = {
  ease: [0.22, 1, 0.36, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
};

// Component variants
export const BUTTON_VARIANTS = {
  primary: {
    backgroundColor: COLORS.primary,
    color: COLORS.background,
    border: `1px solid ${COLORS.primary}`,
  },
  secondary: {
    backgroundColor: "transparent",
    color: COLORS.primary,
    border: `1px solid ${COLORS.borderDark}`,
  },
  ghost: {
    backgroundColor: "transparent",
    color: COLORS.primary,
    border: `1px solid ${COLORS.borderDark}`,
  },
  outline: {
    backgroundColor: "transparent",
    color: COLORS.primary,
    border: `1px solid ${COLORS.borderMedium}`,
  },
};

export const BUTTON_SIZES = {
  sm: {
    padding: "8px 16px",
    fontSize: FONT_SIZES.sm,
  },
  md: {
    padding: "12px 22px",
    fontSize: FONT_SIZES.base,
  },
  lg: {
    padding: "16px 36px",
    fontSize: FONT_SIZES.md,
  },
};

// Navigation
export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#artisans", label: "Artisans" },
  { href: "#crafts", label: "Crafts" },
  { href: "#heritage", label: "Heritage" },
];

// User roles
export const USER_ROLES = {
  SELLER: "seller",
  CLIENT: "client",
  ADMIN: "admin",
};

export const ROLE_LABELS = {
  [USER_ROLES.SELLER]: "Artisan Creator",
  [USER_ROLES.CLIENT]: "Heritage Collector",
  [USER_ROLES.ADMIN]: "Administrator",
};

// Stats data
export const STATS_DATA = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" stroke={COLORS.primary} strokeWidth="1.5" fill="none" />
        <path d="M16 8v16M8 16h16" stroke={COLORS.primary} strokeWidth="1" />
      </svg>
    ),
    number: "500+",
    label: "Master Artisans"
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="6" y="10" width="20" height="16" stroke={COLORS.primary} strokeWidth="1.5" fill="none" />
        <path d="M10 6v4M22 6v4M14 14h4M12 18h8" stroke={COLORS.primary} strokeWidth="1" />
      </svg>
    ),
    number: "25",
    label: "Indian States"
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <path d="M16 4L12 8H8v4h4l4-4 4 4h4V8h-4L16 4z" stroke={COLORS.primary} strokeWidth="1.5" fill="none" />
        <path d="M8 12v8h16v-8M6 20h20v4H6z" stroke={COLORS.primary} strokeWidth="1.5" fill="none" />
      </svg>
    ),
    number: "50+",
    label: "Craft Forms"
  }
];

// Feature data
export const FEATURES_DATA = [
  {
    icon: "AI",
    text: "Intelligent Storytelling"
  },
  {
    icon: "⚡",
    text: "Global Marketplace"
  },
  {
    icon: "✦",
    text: "Authentic Heritage"
  },
  {
    icon: "◊",
    text: "Fair Trade Promise"
  }
];

// Feature cards data
export const FEATURE_CARDS_DATA = [
  {
    icon: "🤖",
    title: "AI-Powered Stories",
    desc: "Transform craft descriptions into compelling narratives that resonate with global audiences."
  },
  {
    icon: "📸",
    title: "Visual Storytelling",
    desc: "Showcase artisan work through beautiful, responsive galleries optimized for discovery."
  },
  {
    icon: "🚚",
    title: "Seamless Logistics",
    desc: "Integrated Porter delivery system ensuring safe, cost-effective shipping worldwide."
  },
  {
    icon: "💬",
    title: "Smart Connections",
    desc: "Automated communication tools that build meaningful relationships between makers and buyers."
  }
];

// Role selection data
export const ROLES_DATA = [
  {
    role: USER_ROLES.SELLER,
    title: "Artisan Creator",
    subtitle: "Share your craft with the world",
    description: "Join a community of master craftspeople and showcase your heritage skills to global collectors"
  },
  {
    role: USER_ROLES.CLIENT,
    title: "Heritage Collector",
    subtitle: "Discover authentic masterpieces",
    description: "Explore curated collections of traditional crafts and connect directly with skilled artisans"
  }
];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
  },
  AI: {
    GENERATE_IDEAS: "/api/ai/generateIdeas",
    ENHANCE_DESCRIPTION: "/api/ai/enhanceDescription",
  },
  PRODUCTS: {
    LIST: "/api/products",
    CREATE: "/api/products",
    UPDATE: "/api/products",
    DELETE: "/api/products",
  },
  USERS: {
    PROFILE: "/api/users/profile",
    UPDATE_PROFILE: "/api/users/profile",
  }
};

// Error messages
export const ERROR_MESSAGES = {
  AUTH: {
    POPUP_CLOSED: "Sign-in was cancelled. Please try again.",
    POPUP_BLOCKED: "Popup was blocked. Please allow popups and try again.",
    NETWORK_ERROR: "Network error. Please check your connection.",
    GENERIC: "Sign-in failed. Please try again.",
    LOGOUT_FAILED: "Sign-out failed. Please try again.",
  },
  FORM: {
    REQUIRED: "This field is required.",
    EMAIL_INVALID: "Please enter a valid email address.",
    PASSWORD_MIN: "Password must be at least 8 characters.",
    PASSWORDS_NO_MATCH: "Passwords do not match.",
  },
  AI: {
    GENERATION_FAILED: "Failed to generate ideas. Please try again.",
    DESCRIPTION_EMPTY: "Please provide a description.",
  },
  GENERIC: {
    SOMETHING_WRONG: "Something went wrong. Please try again.",
    NETWORK_ERROR: "Network error. Please check your connection.",
  }
};

// Success messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: "Successfully signed in!",
    LOGOUT: "Successfully signed out!",
  },
  FORM: {
    SAVED: "Changes saved successfully!",
    CREATED: "Created successfully!",
    UPDATED: "Updated successfully!",
    DELETED: "Deleted successfully!",
  }
};

// Default values
export const DEFAULT_VALUES = {
  AI_DESCRIPTION: "Jaipuri wall art, peacock motifs, lotus glow, deep maroon/ivory palette, minimal Taj line art",
  PAGINATION: {
    PAGE_SIZE: 12,
    MAX_PAGES: 100,
  }
};

// Logo SVG
export const LOGO_SVG = (
  <svg width="32" height="32" viewBox="0 0 36 36">
    <path 
      d="M18 6L13.5 10.5H9v4.5h4.5L18 10.5l4.5 4.5H27V10.5h-4.5L18 6z" 
      stroke={COLORS.primary} 
      strokeWidth="1.5" 
      fill="none" 
    />
    <path 
      d="M9 15v9h18v-9M6 24h24v4.5H6z" 
      stroke={COLORS.primary} 
      strokeWidth="1.5" 
      fill="none" 
    />
    <circle 
      cx="18" 
      cy="19.5" 
      r="2" 
      stroke={COLORS.primary} 
      strokeWidth="1.5" 
      fill="none" 
    />
  </svg>
);

// Heritage loader SVG
export const HERITAGE_LOADER_SVG = (
  <svg width="80" height="80" viewBox="0 0 80 80" style={{ display: "block" }}>
    <g stroke={COLORS.primary} strokeWidth="2" fill="none">
      <path d="M40 10L30 20H20v10h10l10-10 10 10h10V20H50L40 10z" />
      <path d="M20 30v20h40V30M15 50h50v8H15z" />
      <circle cx="40" cy="40" r="4" />
    </g>
  </svg>
);

// Heritage art SVG for about section
export const HERITAGE_ART_SVG = (
  <svg width="260" height="260" viewBox="0 0 280 280" style={{ display: "block" }}>
    <g stroke={COLORS.primary} strokeWidth="1.5" fill="none">
      <circle cx="140" cy="140" r="120" opacity="0.08" />
      <circle cx="140" cy="140" r="80" opacity="0.16" />
      <circle cx="140" cy="140" r="40" opacity="0.24" />
      <path d="M140 60L120 80H100v20h20l20-20 20 20h20V80h-20L140 60z" />
      <path d="M100 100v40h80v-40M80 140h120v20H80z" />
      <circle cx="140" cy="120" r="12" />
    </g>
  </svg>
);

export default {
  COLORS,
  FONTS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  BREAKPOINTS,
  Z_INDEX,
  TRANSITIONS,
  EASING,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  NAV_LINKS,
  USER_ROLES,
  ROLE_LABELS,
  STATS_DATA,
  FEATURES_DATA,
  FEATURE_CARDS_DATA,
  ROLES_DATA,
  API_ENDPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEFAULT_VALUES,
  LOGO_SVG,
  HERITAGE_LOADER_SVG,
  HERITAGE_ART_SVG,
};