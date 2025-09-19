import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { fadeInUp } from "@/web/utils/animations";

export default function Stat({ icon, number, label }) {
  return (
    <motion.div variants={fadeInUp} style={styles.stat}>
      <div style={styles.statIcon}>{icon}</div>
      <div style={styles.statNumber}>{number}</div>
      <div style={styles.statLabel}>{label}</div>
    </motion.div>
  );
}