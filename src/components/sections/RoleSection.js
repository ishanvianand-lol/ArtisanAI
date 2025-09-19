import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { staggerContainer } from "@/web/utils/animations";
import RoleCard from "@/components/ui/RoleCard";

export default function RoleSection({ user, role, handleRoleSelect, handleContinue }) {
  if (!user || role) return null;

  return (
    <motion.section 
      style={styles.roleSection} 
      variants={staggerContainer} 
      initial="initial" 
      whileInView="animate" 
      viewport={{ once: true, amount: 0.3 }}
    >
      <div style={styles.roleHeader}>
        <h2 style={styles.sectionTitle}>Choose Your Heritage Path</h2>
        <p style={styles.roleSubtitle}>
          Select your journey in preserving India&apos;s craft legacy
        </p>
      </div>

      <div style={styles.roleCards}>
        <RoleCard
          title="Artisan Creator"
          subtitle="Share your craft with the world"
          description="Join a community of master craftspeople and showcase your heritage skills to global collectors"
          selected={role === "seller"}
          onClick={() => handleRoleSelect("seller")}
        />
        <RoleCard
          title="Heritage Collector"
          subtitle="Discover authentic masterpieces"
          description="Explore curated collections of traditional crafts and connect directly with skilled artisans"
          selected={role === "client"}
          onClick={() => handleRoleSelect("client")}
        />
      </div>

      <motion.button
        onClick={handleContinue}
        disabled={!role}
        style={{
          ...styles.continueBtn,
          ...(!role ? styles.disabledBtn : {})
        }}
        whileHover={!role ? undefined : { y: -2 }}
      >
        Enter Heritage Portal
      </motion.button>
    </motion.section>
  );
}