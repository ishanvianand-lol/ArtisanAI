// src/components/ui/Button.jsx
"use client";

import { motion } from "framer-motion";

const buttonVariants = {
  primary: {
    backgroundColor: "#2C1810",
    color: "#F5F1EB",
    border: "1px solid #2C1810",
  },
  secondary: {
    backgroundColor: "transparent",
    color: "#2C1810",
    border: "1px solid rgba(44, 24, 16, 0.25)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#2C1810",
    border: "1px solid rgba(44, 24, 16, 0.25)",
  },
  join: {
    backgroundColor: "#2C1810",
    color: "#F5F1EB",
    border: "1px solid #2C1810",
  },
};

const sizes = {
  sm: {
    padding: "8px 16px",
    fontSize: "0.85rem",
  },
  md: {
    padding: "12px 22px",
    fontSize: "0.95rem",
  },
  lg: {
    padding: "16px 36px",
    fontSize: "1rem",
  },
};

const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}) {
  const baseStyles = {
    borderRadius: 0,
    fontWeight: 400,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "system-ui, sans-serif",
    letterSpacing: "0.3px",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    opacity: disabled ? 0.4 : 1,
    ...buttonVariants[variant],
    ...sizes[size],
  };

  const motionProps = disabled ? {} : hoverLift;

  return (
    <motion.button
      {...motionProps}
      style={baseStyles}
      onClick={disabled ? undefined : onClick}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading ? "..." : children}
    </motion.button>
  );
}