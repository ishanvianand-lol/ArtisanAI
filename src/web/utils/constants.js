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
  
  // Role-specific colors
  client: {
    primary: "#1e3a8a", // Blue theme for clients
    accent: "#3b82f6",
    background: "#eff6ff",
    border: "rgba(30, 58, 138, 0.12)",
  },
  seller: {
    primary: "#7c2d12", // Brown theme for sellers
    accent: "#ea580c",
    background: "#fff7ed",
    border: "rgba(124, 45, 18, 0.12)",
  }
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
  client: {
    backgroundColor: COLORS.client.primary,
    color: COLORS.white,
    border: `1px solid ${COLORS.client.primary}`,
  },
  seller: {
    backgroundColor: COLORS.seller.primary,
    color: COLORS.white,
    border: `1px solid ${COLORS.seller.primary}`,
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

// Navigation - Role-specific
export const NAV_LINKS = {
  common: [
    { href: "#about", label: "About" },
    { href: "#artisans", label: "Artisans" },
    { href: "#crafts", label: "Crafts" },
    { href: "#heritage", label: "Heritage" },
  ],
  client: [
    { href: "/client/browse", label: "Browse Crafts", icon: "🎨" },
    { href: "/client/customize", label: "AI Customize", icon: "🤖" },
    { href: "/client/orders", label: "My Orders", icon: "📦" },
    { href: "/client/favorites", label: "Wishlist", icon: "❤️" },
    { href: "/client/artisans", label: "Find Artisans", icon: "👥" },
  ],
  seller: [
    { href: "/seller/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/seller/products", label: "My Products", icon: "🛍️" },
    { href: "/seller/ai-enhance", label: "AI Stories", icon: "✨" },
    { href: "/seller/orders", label: "Orders", icon: "📋" },
    { href: "/seller/analytics", label: "Analytics", icon: "📈" },
    { href: "/seller/profile", label: "My Studio", icon: "🏪" },
  ]
};

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

// Role-specific dashboard configurations
export const DASHBOARD_CONFIG = {
  [USER_ROLES.CLIENT]: {
    title: "Discover Authentic Crafts",
    subtitle: "Explore handmade treasures from master artisans",
    primaryActions: [
      { label: "Browse Crafts", href: "/client/browse", variant: "client" },
      { label: "AI Customize", href: "/client/customize", variant: "outline" },
    ],
    quickStats: [
      { label: "Items in Cart", key: "cartItems" },
      { label: "Saved Items", key: "wishlistItems" },
      { label: "Orders", key: "totalOrders" },
    ]
  },
  [USER_ROLES.SELLER]: {
    title: "Your Artisan Studio",
    subtitle: "Share your craft with the world",
    primaryActions: [
      { label: "Add Product", href: "/seller/products/new", variant: "seller" },
      { label: "AI Enhance", href: "/seller/ai-enhance", variant: "outline" },
    ],
    quickStats: [
      { label: "Products", key: "totalProducts" },
      { label: "Orders", key: "pendingOrders" },
      { label: "Revenue", key: "monthlyRevenue" },
    ]
  }
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
    icon: "🤖",
    text: "AI-Powered Storytelling"
  },
  {
    icon: "🌍",
    text: "Global Marketplace"
  },
  {
    icon: "✨",
    text: "Authentic Heritage"
  },
  {
    icon: "🤝",
    text: "Fair Trade Promise"
  }
];

// Client-specific features
export const CLIENT_FEATURES = [
  {
    icon: "🔍",
    title: "Smart Search",
    desc: "Find exactly what you're looking for with AI-powered search and filters."
  },
  {
    icon: "🎨",
    title: "Custom Designs",
    desc: "Work with artisans to create personalized pieces that reflect your style."
  },
  {
    icon: "📱",
    title: "Easy Ordering",
    desc: "Seamless checkout with secure payment and order tracking."
  },
  {
    icon: "🚚",
    title: "Global Delivery",
    desc: "Worldwide shipping with care and tracking for your precious purchases."
  }
];

// Seller-specific features
export const SELLER_FEATURES = [
  {
    icon: "📝",
    title: "AI Story Generator",
    desc: "Transform your craft descriptions into compelling stories that sell."
  },
  {
    icon: "📸",
    title: "Product Showcase",
    desc: "Beautiful galleries to display your work with professional layouts."
  },
  {
    icon: "💰",
    title: "Fair Pricing",
    desc: "AI-suggested pricing based on craft complexity and market demand."
  },
  {
    icon: "📊",
    title: "Sales Analytics",
    desc: "Track your performance and understand your customers better."
  }
];

// AI Customization Options for Clients
export const AI_CUSTOMIZATION_OPTIONS = [
  {
    category: "Style",
    options: ["Traditional", "Contemporary", "Fusion", "Minimalist", "Ornate"]
  },
  {
    category: "Colors",
    options: ["Vibrant", "Earthy", "Pastel", "Monochrome", "Custom Palette"]
  },
  {
    category: "Size",
    options: ["Small", "Medium", "Large", "Custom Dimensions"]
  },
  {
    category: "Purpose",
    options: ["Home Decor", "Gift", "Personal Use", "Commercial", "Collection"]
  },
  {
    category: "Timeline",
    options: ["Rush (1-2 weeks)", "Standard (3-4 weeks)", "Flexible (1-2 months)"]
  }
];

// Role selection data
export const ROLES_DATA = [
  {
    role: USER_ROLES.CLIENT,
    title: "Heritage Collector",
    subtitle: "Discover authentic masterpieces",
    description: "Explore curated collections of traditional crafts, customize designs with AI, and connect directly with skilled artisans worldwide.",
    features: ["Browse 500+ artisans", "AI-powered customization", "Secure global delivery", "Direct artisan chat"],
    ctaText: "Start Exploring"
  },
  {
    role: USER_ROLES.SELLER,
    title: "Artisan Creator",
    subtitle: "Share your craft with the world",
    description: "Join a community of master craftspeople, showcase your heritage skills, and reach global collectors through our AI-enhanced platform.",
    features: ["AI story generation", "Global marketplace", "Fair pricing tools", "Analytics dashboard"],
    ctaText: "Join as Artisan"
  }
];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    ROLE_SELECT: "/api/auth/role-select",
  },
  AI: {
    GENERATE_IDEAS: "/api/ai/generateIdeas",
    ENHANCE_DESCRIPTION: "/api/ai/enhanceDescription",
    CUSTOMIZE_PRODUCT: "/api/ai/customizeProduct",
    GENERATE_STORY: "/api/ai/generateStory",
  },
  PRODUCTS: {
    LIST: "/api/products",
    CREATE: "/api/products",
    UPDATE: "/api/products",
    DELETE: "/api/products",
    SEARCH: "/api/products/search",
    FEATURED: "/api/products/featured",
  },
  USERS: {
    PROFILE: "/api/users/profile",
    UPDATE_PROFILE: "/api/users/profile",
    DASHBOARD_STATS: "/api/users/dashboard-stats",
  },
  ORDERS: {
    CREATE: "/api/orders",
    LIST: "/api/orders",
    UPDATE_STATUS: "/api/orders/status",
    TRACK: "/api/orders/track",
  },
  CHAT: {
    CONVERSATIONS: "/api/chat/conversations",
    MESSAGES: "/api/chat/messages",
    SEND: "/api/chat/send",
  }
};

// Routes configuration
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ROLE_SELECT: "/role-select",
  
  // Client routes
  CLIENT: {
    DASHBOARD: "/client",
    BROWSE: "/client/browse",
    CUSTOMIZE: "/client/customize",
    ORDERS: "/client/orders",
    FAVORITES: "/client/favorites",
    ARTISANS: "/client/artisans",
    PROFILE: "/client/profile",
    CHAT: "/client/chat",
  },
  
  // Seller routes
  SELLER: {
    DASHBOARD: "/seller",
    PRODUCTS: "/seller/products",
    PRODUCTS_NEW: "/seller/products/new",
    PRODUCTS_EDIT: "/seller/products/:id/edit",
    AI_ENHANCE: "/seller/ai-enhance",
    ORDERS: "/seller/orders",
    ANALYTICS: "/seller/analytics",
    PROFILE: "/seller/profile",
    CHAT: "/seller/chat",
  },
  
  // Admin routes
  ADMIN: {
    DASHBOARD: "/admin",
    USERS: "/admin/users",
    PRODUCTS: "/admin/products",
    ORDERS: "/admin/orders",
    ANALYTICS: "/admin/analytics",
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
    ROLE_NOT_SELECTED: "Please select your role to continue.",
  },
  FORM: {
    REQUIRED: "This field is required.",
    EMAIL_INVALID: "Please enter a valid email address.",
    PASSWORD_MIN: "Password must be at least 8 characters.",
    PASSWORDS_NO_MATCH: "Passwords do not match.",
  },
  AI: {
    GENERATION_FAILED: "Failed to generate content. Please try again.",
    DESCRIPTION_EMPTY: "Please provide a description.",
    CUSTOMIZATION_FAILED: "Failed to generate customization. Please try again.",
  },
  PRODUCTS: {
    CREATION_FAILED: "Failed to create product. Please try again.",
    UPDATE_FAILED: "Failed to update product. Please try again.",
    DELETE_FAILED: "Failed to delete product. Please try again.",
    NOT_FOUND: "Product not found.",
  },
  ORDERS: {
    CREATION_FAILED: "Failed to place order. Please try again.",
    UPDATE_FAILED: "Failed to update order. Please try again.",
    NOT_FOUND: "Order not found.",
  },
  GENERIC: {
    SOMETHING_WRONG: "Something went wrong. Please try again.",
    NETWORK_ERROR: "Network error. Please check your connection.",
    UNAUTHORIZED: "Please login to continue.",
    FORBIDDEN: "You don't have permission to access this resource.",
  }
};

// Success messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: "Successfully signed in!",
    LOGOUT: "Successfully signed out!",
    ROLE_SELECTED: "Role selected successfully!",
  },
  FORM: {
    SAVED: "Changes saved successfully!",
    CREATED: "Created successfully!",
    UPDATED: "Updated successfully!",
    DELETED: "Deleted successfully!",
  },
  PRODUCTS: {
    CREATED: "Product created successfully!",
    UPDATED: "Product updated successfully!",
    DELETED: "Product deleted successfully!",
  },
  ORDERS: {
    PLACED: "Order placed successfully!",
    UPDATED: "Order updated successfully!",
  },
  AI: {
    STORY_GENERATED: "Story generated successfully!",
    CUSTOMIZATION_READY: "Customization ready!",
  }
};

// Default values
export const DEFAULT_VALUES = {
  AI_DESCRIPTION: "Traditional Indian craft with authentic heritage techniques, premium materials, and cultural significance",
  PAGINATION: {
    PAGE_SIZE: 12,
    MAX_PAGES: 100,
  },
  SEARCH: {
    DEBOUNCE_DELAY: 300,
    MIN_QUERY_LENGTH: 2,
  },
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  }
};

// Craft categories
export const CRAFT_CATEGORIES = [
  { id: 'textiles', name: 'Textiles & Fabrics', icon: '🧵' },
  { id: 'pottery', name: 'Pottery & Ceramics', icon: '🏺' },
  { id: 'jewelry', name: 'Jewelry & Accessories', icon: '💍' },
  { id: 'woodwork', name: 'Woodwork & Carving', icon: '🪵' },
  { id: 'metalwork', name: 'Metalwork & Brass', icon: '⚒️' },
  { id: 'paintings', name: 'Paintings & Art', icon: '🎨' },
  { id: 'home-decor', name: 'Home Decor', icon: '🏠' },
  { id: 'musical', name: 'Musical Instruments', icon: '🎵' },
];

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
  DASHBOARD_CONFIG,
  STATS_DATA,
  FEATURES_DATA,
  CLIENT_FEATURES,
  SELLER_FEATURES,
  AI_CUSTOMIZATION_OPTIONS,
  ROLES_DATA,
  API_ENDPOINTS,
  ROUTES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEFAULT_VALUES,
  CRAFT_CATEGORIES,
  LOGO_SVG,
  HERITAGE_LOADER_SVG,
  HERITAGE_ART_SVG,
};