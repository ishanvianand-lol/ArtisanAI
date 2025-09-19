import { motion, AnimatePresence } from "framer-motion";
import { styles } from "@/web/styles/components";

export default function ErrorBanner({ error, onClose }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          style={styles.errorBanner}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.25 } }}
          exit={{ y: -12, opacity: 0, transition: { duration: 0.2 } }}
        >
          <p style={styles.errorText}>{error}</p>
          <button style={styles.errorClose} onClick={onClose}>×</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}