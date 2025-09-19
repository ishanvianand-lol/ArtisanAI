import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";

export default function LotusLayer() {
  return (
    <div style={styles.lotusLayer}>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0.75 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            ...styles.lotus, 
            left: `${15 + i * 12}%`, 
            bottom: `${8 + (i % 3) * 2}%` 
          }}
        />
      ))}
    </div>
  );
}