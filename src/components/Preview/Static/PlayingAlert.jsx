import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayingAnimationAlert() {
  const isAnimating = useSelector((state) => state.ui.isAnimating);

  return (
    <div className="absolute z-20 right-4 top-5">
      <AnimatePresence>
        {isAnimating && (
          <>
            <motion.div
              className="flex items-center gap-2 text-pink-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              Animation Playing
              <span className="text-[8px] mt-1 animate-ping">🟣</span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
