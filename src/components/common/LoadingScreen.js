import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { ease } from "@/web/utils/animations";

export default function LoadingScreen() {
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