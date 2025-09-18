"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../web/utils/firebase";

// Motion presets
const ease = [0.22, 1, 0.36, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const hoverLift = { whileHover: { y: -4, transition: { duration: 0.2 } } };

export default function Page() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // AI Ideas state
  const [desc, setDesc] = useState(
    "Jaipuri wall art, peacock motifs, lotus glow, deep maroon/ivory palette, minimal Taj line art"
  );
  const [ideasRaw, setIdeasRaw] = useState("");
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [ideasError, setIdeasError] = useState("");

  // Parse AI ideas to bullets
  const ideas = useMemo(() => {
    if (!ideasRaw) return [];
    // Split by lines/numbers/bullets
    return ideasRaw
      .split(/\n+/)
      .map((s) => s.replace(/^\s*[\-\*\d\.\)]\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 10);
  }, [ideasRaw]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          });
          const data = await response.json();

          if (response.ok) {
            setUser(firebaseUser);
            setRole(data.role || "");
            setError("");
          } else {
            console.error("Backend authentication failed:", data.message);
            setUser(null);
            setError("Authentication failed. Please try again.");
          }
        } catch (err) {
          console.error("Failed to connect to backend:", err);
          setUser(firebaseUser);
          setRole("");
          setError("");
        }
      } else {
        setUser(null);
        setRole("");
        setError("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Login successful:", result.user.email);
    } catch (err) {
      console.error("Firebase Sign-in failed:", err);
      if (err?.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled. Please try again.");
      } else if (err?.code === "auth/popup-blocked") {
        setError("Popup was blocked. Please allow popups and try again.");
      } else if (err?.code === "auth/network-request-failed") {
        setError("Network error. Please check your connection.");
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await signOut(auth);
      console.log("Logout successful");
    } catch (err) {
      console.error("Firebase Sign-out failed:", err);
      setError("Sign-out failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setError("");
  };

  const handleContinue = () => {
    if (role) router.push(`/${role}`);
    else setError("Please select a role before continuing.");
  };

  const handleGenerateIdeas = async () => {
    setIdeasLoading(true);
    setIdeasError("");
    setIdeasRaw("");
    try {
      const res = await fetch("/api/ai/generateIdeas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: desc }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Failed to generate ideas");
      }
      const data = await res.json();
      setIdeasRaw(data.ideas || "");
    } catch (e) {
      setIdeasError(e.message || "Something went wrong");
    } finally {
      setIdeasLoading(false);
    }
  };

  // Loading screen
  if (loading && !user) {
    return (
      <div style={styles.loadingScreen}>
        <motion.div
          style={styles.heritageLoader}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2, ease }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" style={styles.loaderSvg}>
            <path d="M40 10L30 20H20v10h10l10-10 10 10h10V20H50L40 10z" stroke="#2C1810" strokeWidth="2" fill="none" />
            <path d="M20 30v20h40V30M15 50h50v8H15z" stroke="#2C1810" strokeWidth="2" fill="none" />
            <circle cx="40" cy="40" r="4" stroke="#2C1810" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
        <p style={styles.loadingText}>Crafting Heritage...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <motion.header style={styles.header} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}>
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
                <motion.button {...hoverLift} style={{ ...styles.signInBtn }} onClick={handleLogin} disabled={loading}>
                  {loading ? "..." : "Sign In"}
                </motion.button>
                <motion.button {...hoverLift} style={{ ...styles.joinBtn }} onClick={handleLogin} disabled={loading}>
                  {loading ? "..." : "Join Heritage"}
                </motion.button>
              </div>
            ) : (
              <div style={styles.userSection}>
                <div style={styles.userAvatar}>
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" style={styles.avatarImage} />
                  ) : (
                    <div style={styles.avatarPlaceholder}>{(user.displayName || user.email).charAt(0).toUpperCase()}</div>
                  )}
                </div>
                <span style={styles.userName}>{user.displayName || user.email?.split("@")[0]}</span>
                <button style={styles.logoutBtn} onClick={handleLogout} disabled={loading}>
                  {loading ? "..." : "Exit"}
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            style={styles.errorBanner}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.25 } }}
            exit={{ y: -12, opacity: 0, transition: { duration: 0.2 } }}
          >
            <p style={styles.errorText}>{error}</p>
            <button style={styles.errorClose} onClick={() => setError("")}>×</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero with Next Image */}
      <section style={styles.hero}>
        <div style={styles.heroBgWrap}>
  
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease }}
            style={styles.radialGlow}
          />
        </div>


        <motion.div style={styles.heroContent} variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }}>
          <motion.h1 variants={fadeInUp} style={styles.heroTitle}>
            Preserving India&apos;s<br /><span style={styles.heroTitleAccent}>Artisan Heritage</span>
          </motion.h1>
          <motion.p variants={fadeInUp} style={styles.heroSubtitle}>
            A curated marketplace where traditional craftsmanship meets modern technology, connecting conscious collectors with authentic artisan stories.
          </motion.p>

          {!user && (
            <motion.div variants={fadeInUp} style={styles.heroButtons}>
              <motion.button {...hoverLift} style={styles.primaryBtn} onClick={handleLogin} disabled={loading}>
                {loading ? "Loading..." : "Begin Your Journey"}
              </motion.button>
              <motion.button
                {...hoverLift}
                style={styles.secondaryBtn}
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                Discover Heritage
              </motion.button>
            </motion.div>
          )}

          {user && role && (
            <motion.div variants={fadeInUp} style={styles.heroButtons}>
              <motion.button {...hoverLift} style={styles.primaryBtn} onClick={handleContinue}>
                Enter {role} Portal
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Lotus float layer */}
        <div style={styles.lotusLayer}>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 0.75 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              style={{ ...styles.lotus, left: `${15 + i * 12}%`, bottom: `${8 + (i % 3) * 2}%` }}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <motion.section style={styles.statsSection} variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }}>
        <div style={styles.statsContainer}>
          <div style={styles.statGroup}>
            <Stat icon={<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" stroke="#2C1810" strokeWidth="1.5" fill="none" /><path d="M16 8v16M8 16h16" stroke="#2C1810" strokeWidth="1" /></svg>} number="500+" label="Master Artisans" />
            <div style={styles.statDivider} />
            <Stat icon={<svg width="32" height="32" viewBox="0 0 32 32"><rect x="6" y="10" width="20" height="16" stroke="#2C1810" strokeWidth="1.5" fill="none" /><path d="M10 6v4M22 6v4M14 14h4M12 18h8" stroke="#2C1810" strokeWidth="1" /></svg>} number="25" label="Indian States" />
            <div style={styles.statDivider} />
            <Stat icon={<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 4L12 8H8v4h4l4-4 4 4h4V8h-4L16 4z" stroke="#2C1810" strokeWidth="1.5" fill="none" /><path d="M8 12v8h16v-8M6 20h20v4H6z" stroke="#2C1810" strokeWidth="1.5" fill="none" /></svg>} number="50+" label="Craft Forms" />
          </div>
        </div>
      </motion.section>

      {/* About */}
      <motion.section id="about" style={styles.aboutSection} variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }}>
        <div style={styles.aboutContent}>
          <motion.div variants={fadeInUp} style={styles.aboutLeft}>
            <div style={styles.heritageArt}>
              <svg width="260" height="260" viewBox="0 0 280 280" style={styles.aboutSvg}>
                <g stroke="#2C1810" strokeWidth="1.5" fill="none">
                  <circle cx="140" cy="140" r="120" opacity="0.08" />
                  <circle cx="140" cy="140" r="80" opacity="0.16" />
                  <circle cx="140" cy="140" r="40" opacity="0.24" />
                  <path d="M140 60L120 80H100v20h20l20-20 20 20h20V80h-20L140 60z" />
                  <path d="M100 100v40h80v-40M80 140h120v20H80z" />
                  <circle cx="140" cy="120" r="12" />
                </g>
              </svg>
            </div>
          </motion.div>

          <div style={styles.aboutRight}>
            <motion.h2 variants={fadeInUp} style={styles.sectionTitle}>Where Tradition<br />Meets Innovation</motion.h2>
            <motion.p variants={fadeInUp} style={styles.aboutDesc}>
              We bridge centuries of craftsmanship with contemporary digital tools, creating a platform where every piece tells a story and every purchase preserves a tradition.
            </motion.p>

            <motion.div variants={staggerContainer} style={styles.featuresList}>
              <Feature icon="AI" text="Intelligent Storytelling" />
              <Feature icon="⚡" text="Global Marketplace" />
              <Feature icon="✦" text="Authentic Heritage" />
              <Feature icon="◊" text="Fair Trade Promise" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Feature grid */}
      <motion.section style={styles.featuresSection} variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }}>
        <div style={styles.featuresContainer}>
          <h2 style={styles.sectionTitle}>Crafted with Purpose</h2>
          <div style={styles.featuresGrid}>
            <FeatureCard icon="🤖" title="AI-Powered Stories" desc="Transform craft descriptions into compelling narratives that resonate with global audiences." />
            <FeatureCard icon="📸" title="Visual Storytelling" desc="Showcase artisan work through beautiful, responsive galleries optimized for discovery." />
            <FeatureCard icon="🚚" title="Seamless Logistics" desc="Integrated Porter delivery system ensuring safe, cost-effective shipping worldwide." />
            <FeatureCard icon="💬" title="Smart Connections" desc="Automated communication tools that build meaningful relationships between makers and buyers." />
          </div>
        </div>
      </motion.section>

      {/* AI Corner Ideas */}
      <motion.section style={styles.aiSection} variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.25 }}>
        <div style={styles.aiWrap}>
          <motion.h2 variants={fadeInUp} style={styles.sectionTitle}>AI Corner Ideas</motion.h2>
          <motion.p variants={fadeInUp} style={styles.aiHint}>
            Describe the corner’s vibe, colors, motifs, or references, then generate artisan craft ideas curated for that space.
          </motion.p>

          <motion.div variants={fadeInUp} style={styles.aiForm}>
            <label htmlFor="desc" style={styles.aiLabel}>Aesthetic description</label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              style={styles.aiTextarea}
              placeholder="e.g., warm ivory walls, peacock arch, lotus lanterns, minimal Taj line art, brass accents"
            />
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <motion.button
                {...hoverLift}
                onClick={handleGenerateIdeas}
                disabled={ideasLoading || !desc.trim()}
                style={{ ...styles.primaryBtn, ...(ideasLoading || !desc.trim() ? styles.disabledBtn : {}) }}
              >
                {ideasLoading ? "Generating..." : "Generate Ideas"}
              </motion.button>
              <button
                onClick={() => { setIdeasRaw(""); setIdeasError(""); }}
                style={{ ...styles.secondaryBtn, borderColor: "rgba(44,24,16,0.25)", color: "#2C1810" }}
              >
                Clear
              </button>
            </div>
            {ideasError && <div style={styles.aiError}>{ideasError}</div>}
          </motion.div>

          <AnimatePresence>
            {ideas.length > 0 && (
              <motion.ul
                key="ideas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
                exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
                style={styles.aiList}
              >
                {ideas.map((line, idx) => (
                  <motion.li key={idx} style={styles.aiItem} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: idx * 0.04 }}>
                    {line}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Role Selection */}
      {user && !role && (
        <motion.section style={styles.roleSection} variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }}>
          <div style={styles.roleHeader}>
            <h2 style={styles.sectionTitle}>Choose Your Heritage Path</h2>
            <p style={styles.roleSubtitle}>Select your journey in preserving India&apos;s craft legacy</p>
          </div>

          <div style={styles.roleCards}>
            <RoleCard
              title="Artisan Creator"
              subtitle="Share your craft with the world"
              description="Join a community of master craftspeople and showcase your heritage skills to global collectors"
              selected={role === "seller"}
              onClick={() => handleRoleSelect("seller")}
            />
            <RoleCard
              title="Heritage Collector"
              subtitle="Discover authentic masterpieces"
              description="Explore curated collections of traditional crafts and connect directly with skilled artisans"
              selected={role === "client"}
              onClick={() => handleRoleSelect("client")}
            />
          </div>

          <motion.button
            onClick={handleContinue}
            disabled={!role}
            style={{ ...styles.continueBtn, ...(!role ? styles.disabledBtn : {}) }}
            whileHover={!role ? undefined : { y: -2 }}
          >
            Enter Heritage Portal
          </motion.button>
        </motion.section>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>Heritage Craft — Preserving tradition through innovation</p>
          <p style={styles.footerSubtext}>Crafted with care for India&apos;s artisan community</p>
        </div>
      </footer>
    </>
  );
}

function Stat({ icon, number, label }) {
  return (
    <motion.div variants={fadeInUp} style={styles.stat}>
      <div style={styles.statIcon}>{icon}</div>
      <div style={styles.statNumber}>{number}</div>
      <div style={styles.statLabel}>{label}</div>
    </motion.div>
  );
}

function Feature({ icon, text }) {
  return (
    <motion.div variants={fadeInUp} style={styles.feature}>
      <div style={styles.featureIcon}>{icon}</div>
      <span>{text}</span>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -6 }} style={styles.featureCard}>
      <div style={styles.featureCardIcon}>{icon}</div>
      <h3 style={styles.featureTitle}>{title}</h3>
      <p style={styles.featureDesc}>{desc}</p>
    </motion.div>
  );
}

function RoleCard({ title, subtitle, description, selected, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      style={{ ...styles.roleCard, ...(selected ? styles.roleCardSelected : {}) }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <div style={styles.roleCardContent}>
        <h3 style={styles.roleTitle}>{title}</h3>
        <p style={styles.roleSubtitle}>{subtitle}</p>
        <p style={styles.roleDesc}>{description}</p>
      </div>
      <div style={styles.roleIndicator}>{selected && <div style={styles.roleSelected} />}</div>
    </motion.div>
  );
}

// Styles
const styles = {
  header: { position: "fixed", top: 0, width: "100%", backgroundColor: "rgba(245, 241, 235, 0.95)", backdropFilter: "blur(24px)", zIndex: 1000, borderBottom: "1px solid rgba(44, 24, 16, 0.08)" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 48px", maxWidth: "1280px", margin: "0 auto" },
  logoSection: { display: "flex", alignItems: "center", gap: "12px" },
  logoSvg: { display: "block" },
  logo: { color: "#2C1810", fontWeight: 400, fontSize: "1.25rem", fontFamily: "Georgia, serif", margin: 0, letterSpacing: "0.5px" },
  navCenter: { display: "flex", alignItems: "center", gap: "36px" },
  navLink: { color: "#2C1810", textDecoration: "none", fontWeight: 400, fontSize: "0.95rem", fontFamily: "system-ui, sans-serif", letterSpacing: "0.3px", opacity: 0.8 },
  navRight: { display: "flex", alignItems: "center" },
  authButtons: { display: "flex", alignItems: "center", gap: "12px" },
  signInBtn: { backgroundColor: "transparent", color: "#2C1810", border: "1px solid rgba(44, 24, 16, 0.25)", padding: "12px 22px", borderRadius: 0, fontWeight: 400, cursor: "pointer", fontFamily: "system-ui, sans-serif", fontSize: "0.95rem", letterSpacing: "0.3px" },
  joinBtn: { backgroundColor: "#2C1810", color: "#F5F1EB", border: "1px solid #2C1810", padding: "12px 22px", borderRadius: 0, fontWeight: 400, cursor: "pointer", fontFamily: "system-ui, sans-serif", fontSize: "0.95rem", letterSpacing: "0.3px" },
  userSection: { display: "flex", alignItems: "center", gap: "12px", padding: "6px 12px", border: "1px solid rgba(44, 24, 16, 0.1)", backgroundColor: "rgba(44, 24, 16, 0.02)" },
  userAvatar: { width: "32px", height: "32px", overflow: "hidden", borderRadius: "2px" },
  avatarImage: { width: "100%", height: "100%", objectFit: "cover" },
  avatarPlaceholder: { width: "32px", height: "32px", backgroundColor: "#2C1810", color: "#F5F1EB", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 400, fontSize: "0.9rem", fontFamily: "system-ui, sans-serif" },
  userName: { fontSize: "0.9rem", color: "#2C1810", fontWeight: 400, fontFamily: "system-ui, sans-serif", letterSpacing: "0.3px" },
  logoutBtn: { backgroundColor: "transparent", color: "#2C1810", border: "none", padding: "4px 0", fontWeight: 400, cursor: "pointer", fontFamily: "system-ui, sans-serif", fontSize: "0.85rem", textDecoration: "underline", opacity: 0.7 },

  errorBanner: { position: "fixed", top: "88px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#F5F1EB", border: "1px solid #2C1810", padding: "12px 16px", zIndex: 1100, display: "flex", alignItems: "center", gap: "12px" },
  errorText: { color: "#2C1810", fontSize: "0.9rem", margin: 0, fontFamily: "system-ui, sans-serif", fontWeight: 400 },
  errorClose: { background: "none", border: "none", color: "#2C1810", fontSize: "1.1rem", cursor: "pointer", fontWeight: 400 },

  hero: { minHeight: "100vh", backgroundColor: "#0F0A0A", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", padding: "120px 20px 80px" },
  heroBgWrap: { position: "absolute", inset: 0 },
  radialGlow: { position: "absolute", left: "50%", top: "44%", width: "80vmin", height: "80vmin", transform: "translate(-50%, -50%)", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,153,153,0.35), rgba(255,153,153,0) 60%)", mixBlendMode: "screen" },
  lineArtWrap: { position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", paddingTop: "18vh" },
  heroContent: { maxWidth: "940px", position: "relative", zIndex: 2 },
  heroTitle: { fontSize: "3.6rem", fontWeight: 300, marginBottom: "16px", fontFamily: "Georgia, serif", lineHeight: 1.1, color: "#F5F1EB", letterSpacing: "1px" },
  heroTitleAccent: { fontWeight: 400, color: "#FFD2AA" },
  heroSubtitle: { fontSize: "1.15rem", marginBottom: "28px", lineHeight: 1.7, fontFamily: "system-ui, sans-serif", color: "#F5F1EB", opacity: 0.9, maxWidth: "720px", marginInline: "auto" },
  heroButtons: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" },
  lotusLayer: { position: "absolute", inset: 0, pointerEvents: "none" },
  lotus: { position: "absolute", width: 12, height: 12, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, #FFE7E7, #F6B2B2)", boxShadow: "0 0 12px rgba(255, 200, 200, 0.6)" },

  statsSection: { padding: "100px 20px", backgroundColor: "#F5F1EB", borderTop: "1px solid rgba(44, 24, 16, 0.08)" },
  statsContainer: { maxWidth: "1100px", margin: "0 auto" },
  statGroup: { display: "flex", justifyContent: "center", alignItems: "center", gap: "64px", flexWrap: "wrap" },
  stat: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
  statIcon: { marginBottom: "6px" },
  statNumber: { fontSize: "2.25rem", fontWeight: 300, color: "#2C1810", fontFamily: "Georgia, serif" },
  statLabel: { fontSize: "0.9rem", color: "#2C1810", fontWeight: 400, fontFamily: "system-ui, sans-serif", letterSpacing: "0.5px", opacity: 0.7 },
  statDivider: { width: "1px", height: "64px", backgroundColor: "rgba(44, 24, 16, 0.15)" },

  aboutSection: { padding: "120px 20px", backgroundColor: "#F5F1EB", borderTop: "1px solid rgba(44, 24, 16, 0.08)" },
  aboutContent: { maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "72px", flexWrap: "wrap" },
  aboutLeft: { flex: 1, minWidth: "300px", display: "flex", justifyContent: "center" },
  heritageArt: { padding: "24px" },
  aboutSvg: { display: "block" },
  aboutRight: { flex: 1, minWidth: "380px" },
  sectionTitle: { fontSize: "2.6rem", fontWeight: 300, color: "#2C1810", marginBottom: "18px", fontFamily: "Georgia, serif", letterSpacing: "1px", lineHeight: 1.2 },
  aboutDesc: { fontSize: "1.05rem", lineHeight: 1.7, color: "#2C1810", marginBottom: "28px", fontFamily: "system-ui, sans-serif", fontWeight: 300, opacity: 0.85 },
  featuresList: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" },
  feature: { display: "flex", alignItems: "center", gap: "12px", padding: "10px 0" },
  featureIcon: { width: "30px", height: "30px", border: "1px solid rgba(44, 24, 16, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 400, color: "#2C1810", fontFamily: "system-ui, sans-serif" },

  featuresSection: { padding: "120px 20px", backgroundColor: "#F5F1EB", borderTop: "1px solid rgba(44, 24, 16, 0.08)" },
  featuresContainer: { maxWidth: "1200px", margin: "0 auto", textAlign: "center" },
  featuresGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px", marginTop: "56px" },
  featureCard: { backgroundColor: "transparent", padding: "28px 20px", border: "1px solid rgba(44, 24, 16, 0.12)", textAlign: "center", transition: "transform 0.2s ease" },
  featureCardIcon: { fontSize: "2.2rem", marginBottom: "12px", display: "block" },
  featureTitle: { fontSize: "1.15rem", fontWeight: 400, color: "#2C1810", marginBottom: "8px", fontFamily: "Georgia, serif", letterSpacing: "0.3px" },
  featureDesc: { fontSize: "0.95rem", lineHeight: 1.6, color: "#2C1810", fontFamily: "system-ui, sans-serif", fontWeight: 300, opacity: 0.85 },

  // AI section
  aiSection: { padding: "120px 20px", backgroundColor: "#F5F1EB", borderTop: "1px solid rgba(44, 24, 16, 0.08)" },
  aiWrap: { maxWidth: "900px", margin: "0 auto" },
  aiHint: { fontSize: "1.02rem", color: "#2C1810", opacity: 0.8, marginBottom: 16 },
  aiForm: { background: "rgba(44,24,16,0.03)", border: "1px solid rgba(44,24,16,0.12)", padding: 16 },
  aiLabel: { display: "block", color: "#2C1810", fontSize: ".92rem", marginBottom: 6 },
  aiTextarea: { width: "100%", resize: "vertical", padding: 12, fontSize: "1rem", border: "1px solid rgba(44,24,16,0.2)", background: "#fff", color: "#2C1810", outline: "none" },
  aiError: { marginTop: 12, color: "#8B0000", fontSize: ".95rem" },
  aiList: { marginTop: 18, paddingLeft: 18, display: "grid", gap: 10 },
  aiItem: { listStyle: "disc", color: "#2C1810", fontSize: "1rem" },

  roleSection: { padding: "120px 20px", backgroundColor: "#F5F1EB", textAlign: "center", borderTop: "1px solid rgba(44, 24, 16, 0.08)" },
  roleHeader: { marginBottom: "56px" },
  roleSubtitle: { fontSize: "1rem", color: "#2C1810", marginTop: "10px", fontFamily: "system-ui, sans-serif", fontWeight: 300, opacity: 0.7 },
  roleCards: { display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap", maxWidth: "900px", margin: "0 auto 48px" },
  roleCard: { backgroundColor: "transparent", border: "1px solid rgba(44, 24, 16, 0.15)", minWidth: "300px", cursor: "pointer", transition: "all 0.2s ease", position: "relative", overflow: "hidden" },
  roleCardSelected: { backgroundColor: "rgba(44, 24, 16, 0.03)", border: "1px solid #2C1810" },
  roleCardContent: { padding: "36px 24px" },
  roleTitle: { fontSize: "1.3rem", fontWeight: 400, color: "#2C1810", marginBottom: "6px", fontFamily: "Georgia, serif", letterSpacing: "0.3px" },
  roleSubtitleText: { fontSize: "0.9rem", color: "#8B4513", opacity: 0.85, marginBottom: "12px" },
  roleDesc: { fontSize: "0.98rem", lineHeight: 1.6, color: "#2C1810", fontFamily: "system-ui, sans-serif", fontWeight: 300, opacity: 0.85 },
  roleIndicator: { position: "absolute", bottom: 0, left: 0, width: "100%", height: "3px", backgroundColor: "transparent" },
  roleSelected: { width: "100%", height: "100%", backgroundColor: "#2C1810" },
  continueBtn: { backgroundColor: "#2C1810", color: "#F5F1EB", padding: "16px 36px", fontSize: "1rem", fontWeight: 400, border: "1px solid #2C1810", borderRadius: 0, cursor: "pointer", fontFamily: "system-ui, sans-serif", letterSpacing: "0.5px", transition: "all 0.2s ease" },
  disabledBtn: { opacity: 0.4, cursor: "not-allowed" },

  footer: { backgroundColor: "#2C1810", padding: "60px 20px 80px", textAlign: "center" },
  footerCrest: { maxWidth: 900, margin: "0 auto 16px" },
  footerContent: { maxWidth: "620px", margin: "0 auto" },
  footerText: { fontSize: "1rem", color: "#F5F1EB", fontFamily: "system-ui, sans-serif", fontWeight: 300 },
  footerSubtext: { fontSize: "0.85rem", color: "#F5F1EB", fontFamily: "system-ui, sans-serif", fontWeight: 300, opacity: 0.7 },

  // Loading screen
  loadingScreen: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#F5F1EB" },
  heritageLoader: { marginBottom: "32px" },
  loaderSvg: { display: "block" },
  loadingText: { fontSize: "1rem", color: "#2C1810", fontFamily: "system-ui, sans-serif", fontWeight: 300, letterSpacing: "0.5px" },
};
