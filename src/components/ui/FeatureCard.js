import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { fadeInUp } from "@/web/utils/animations";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      variants={fadeInUp} 
      whileHover={{ y: -6 }} 
      style={styles.featureCard}
    >
      <div style={styles.featureCardIcon}>{icon}</div>
      <h3 style={styles.featureTitle}>{title}</h3>
      <p style={styles.featureDesc}>{desc}</p>
    </motion.div>
  );
}