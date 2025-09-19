import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { fadeInUp, staggerContainer, hoverLift } from "@/web/utils/animations";
import RadialGlow from "./RadialGlow";
import LotusLayer from "./LotusLayer";

export default function HeroSection({ user, role, loading, handleLogin, handleContinue }) {
  return (
    <section style={styles.hero}>
      <div style={styles.heroBgWrap}>
        <RadialGlow />
      </div>

      <motion.div 
        style={styles.heroContent} 
        variants={staggerContainer} 
        initial="initial" 
        whileInView="animate" 
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h1 variants={fadeInUp} style={styles.heroTitle}>
          Preserving India&apos;s<br />
          <span style={styles.heroTitleAccent}>Artisan Heritage</span>
        </motion.h1>
        
        <motion.p variants={fadeInUp} style={styles.heroSubtitle}>
          A curated marketplace where traditional craftsmanship meets modern technology, 
          connecting conscious collectors with authentic artisan stories.
        </motion.p>

        {!user && (
          <motion.div variants={fadeInUp} style={styles.heroButtons}>
            <motion.button 
              {...hoverLift} 
              style={styles.primaryBtn} 
              onClick={handleLogin} 
              disabled={loading}
            >
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
            <motion.button 
              {...hoverLift} 
              style={styles.primaryBtn} 
              onClick={handleContinue}
            >
              Enter {role} Portal
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      <LotusLayer />
    </section>
  );
}