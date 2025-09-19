import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { fadeInUp } from "@/web/utils/animations";

export default function Feature({ icon, text }) {
  return (
    <motion.div variants={fadeInUp} style={styles.feature}>
      <div style={styles.featureIcon}>{icon}</div>
      <span>{text}</span>
    </motion.div>
  );
}