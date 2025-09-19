import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { staggerContainer } from "@/web/utils/animations";
import FeatureCard from "@/components/ui/FeatureCard";

export default function FeaturesSection() {
  return (
    <motion.section 
      style={styles.featuresSection} 
      variants={staggerContainer} 
      initial="initial" 
      whileInView="animate" 
      viewport={{ once: true, amount: 0.2 }}
    >
      <div style={styles.featuresContainer}>
        <h2 style={styles.sectionTitle}>Crafted with Purpose</h2>
        <div style={styles.featuresGrid}>
          <FeatureCard 
            icon="🤖" 
            title="AI-Powered Stories" 
            desc="Transform craft descriptions into compelling narratives that resonate with global audiences." 
          />
          <FeatureCard 
            icon="📸" 
            title="Visual Storytelling" 
            desc="Showcase artisan work through beautiful, responsive galleries optimized for discovery." 
          />
          <FeatureCard 
            icon="🚚" 
            title="Seamless Logistics" 
            desc="Integrated Porter delivery system ensuring safe, cost-effective shipping worldwide." 
          />
          <FeatureCard 
            icon="💬" 
            title="Smart Connections" 
            desc="Automated communication tools that build meaningful relationships between makers and buyers." 
          />
        </div>
      </div>
    </motion.section>
  );
}