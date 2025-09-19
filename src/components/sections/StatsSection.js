import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { staggerContainer } from "@/web/utils/animations";
import Stat from "@/components/ui/stat";

export default function StatsSection() {
  return (
    <motion.section 
      style={styles.statsSection} 
      variants={staggerContainer} 
      initial="initial" 
      whileInView="animate" 
      viewport={{ once: true, amount: 0.3 }}
    >
      <div style={styles.statsContainer}>
        <div style={styles.statGroup}>
          <Stat 
            icon={
              <svg width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="12" stroke="#2C1810" strokeWidth="1.5" fill="none" />
                <path d="M16 8v16M8 16h16" stroke="#2C1810" strokeWidth="1" />
              </svg>
            } 
            number="500+" 
            label="Master Artisans" 
          />
          <div style={styles.statDivider} />
          <Stat 
            icon={
              <svg width="32" height="32" viewBox="0 0 32 32">
                <rect x="6" y="10" width="20" height="16" stroke="#2C1810" strokeWidth="1.5" fill="none" />
                <path d="M10 6v4M22 6v4M14 14h4M12 18h8" stroke="#2C1810" strokeWidth="1" />
              </svg>
            } 
            number="25" 
            label="Indian States" 
          />
          <div style={styles.statDivider} />
          <Stat 
            icon={
              <svg width="32" height="32" viewBox="0 0 32 32">
                <path d="M16 4L12 8H8v4h4l4-4 4 4h4V8h-4L16 4z" stroke="#2C1810" strokeWidth="1.5" fill="none" />
                <path d="M8 12v8h16v-8M6 20h20v4H6z" stroke="#2C1810" strokeWidth="1.5" fill="none" />
              </svg>
            } 
            number="50+" 
            label="Craft Forms" 
          />
        </div>
      </div>
    </motion.section>
  );
}