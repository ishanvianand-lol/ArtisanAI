import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { hoverLift } from "@/web/utils/animations";

export default function Header({ user, loading, handleLogin, handleLogout }) {
  return (
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
              <motion.button {...hoverLift} style={styles.signInBtn} onClick={handleLogin} disabled={loading}>
                {loading ? "..." : "Sign In"}
              </motion.button>
              <motion.button {...hoverLift} style={styles.joinBtn} onClick={handleLogin} disabled={loading}>
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
  );
}