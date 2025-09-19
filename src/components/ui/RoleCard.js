import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";

export default function RoleCard({ title, subtitle, description, selected, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      style={{
        ...styles.roleCard,
        ...(selected ? styles.roleCardSelected : {})
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <div style={styles.roleCardContent}>
        <h3 style={styles.roleTitle}>{title}</h3>
        <p style={styles.roleSubtitle}>{subtitle}</p>
        <p style={styles.roleDesc}>{description}</p>
      </div>
      <div style={styles.roleIndicator}>
        {selected && <div style={styles.roleSelected} />}
      </div>
    </motion.div>
  );
}