import { motion } from "framer-motion";
import { styles } from "@/web/styles/components";
import { ease } from "@/web/utils/animations";

export default function RadialGlow() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease }}
      style={styles.radialGlow}
    />
  );
}