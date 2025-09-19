import { motion, AnimatePresence } from "framer-motion";
import { styles } from "@/web/styles/components";
import { staggerContainer, fadeInUp, hoverLift, ease } from "@/web/utils/animations";

export default function AISection({ 
  desc, 
  setDesc, 
  ideas, 
  ideasLoading, 
  ideasError, 
  handleGenerateIdeas, 
  clearIdeas 
}) {
  return (
    <motion.section 
      style={styles.aiSection} 
      variants={staggerContainer} 
      initial="initial" 
      whileInView="animate" 
      viewport={{ once: true, amount: 0.25 }}
    >
      <div style={styles.aiWrap}>
        <motion.h2 variants={fadeInUp} style={styles.sectionTitle}>
          AI Corner Ideas
        </motion.h2>
        
        <motion.p variants={fadeInUp} style={styles.aiHint}>
          Describe the corner's vibe, colors, motifs, or references, then generate 
          artisan craft ideas curated for that space.
        </motion.p>

        <motion.div variants={fadeInUp} style={styles.aiForm}>
          <label htmlFor="desc" style={styles.aiLabel}>Aesthetic description</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            style={styles.aiTextarea}
            placeholder="e.g., warm ivory walls, peacock arch, lotus lanterns, minimal Taj line art, brass accents"
          />
          
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <motion.button
              {...hoverLift}
              onClick={handleGenerateIdeas}
              disabled={ideasLoading || !desc.trim()}
              style={{
                ...styles.primaryBtn,
                ...(ideasLoading || !desc.trim() ? styles.disabledBtn : {})
              }}
            >
              {ideasLoading ? "Generating..." : "Generate Ideas"}
            </motion.button>
            
            <button
              onClick={clearIdeas}
              style={{
                ...styles.secondaryBtn,
                borderColor: "rgba(44,24,16,0.25)",
                color: "#2C1810"
              }}
            >
              Clear
            </button>
          </div>
          
          {ideasError && <div style={styles.aiError}>{ideasError}</div>}
        </motion.div>

        <AnimatePresence>
          {ideas.length > 0 && (
            <motion.ul
              key="ideas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
              style={styles.aiList}
            >
              {ideas.map((line, idx) => (
                <motion.li
                  key={idx}
                  style={styles.aiItem}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                >
                  {line}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}