import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { staggerContainer, fadeInUp } from "@/web/utils/animations";
import Feature from '@/components/ui/Feature';

export default function AboutSection() {
  return (
    <motion.section 
      id="about" 
      style={styles.aboutSection} 
      variants={staggerContainer} 
      initial="initial" 
      whileInView="animate" 
      viewport={{ once: true, amount: 0.3 }}
    >
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
          <motion.h2 variants={fadeInUp} style={styles.sectionTitle}>
            Where Tradition<br />Meets Innovation
          </motion.h2>
          
          <motion.p variants={fadeInUp} style={styles.aboutDesc}>
            We bridge centuries of craftsmanship with contemporary digital tools, 
            creating a platform where every piece tells a story and every purchase 
            preserves a tradition.
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
  );
}