import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { uiActions } from "../../../store/uiSlicer";

export default function AnimationResetCreateAlert() {
  const dispatch = useDispatch();

  const isReset = useSelector((state) => state.ui.isReset);

  useEffect(() => {
    if (!isReset) return;
    setTimeout(() => {
      dispatch(uiActions.handleResetAnimationAlert(false));
    }, 2000);
  }, [isReset]);

  return (
    <AnimatePresence>
      {isReset && (
        <motion.div
          key="first"
          layout
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`alert text-pink-300 text-lg`}
        >
          Animation was Reset!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
