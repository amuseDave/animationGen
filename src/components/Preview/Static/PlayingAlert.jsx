import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayingAnimationAlert() {
  const isAnimating = useSelector((state) => state.ui.isAnimating);

  return (
    <div className="alert-play-pos">
      <AnimatePresence>
        {isAnimating && (
          <>
            <motion.div
              className="alert-play-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Animation Playing
              <span className="alert-play-icon">🟢</span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
