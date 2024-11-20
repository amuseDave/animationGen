import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { uiActions } from "../../../uiSlicer";

export default function AnimationResetCreateAlert() {
  const dispatch = useDispatch();
  const [isCreated, setIsCreated] = useState(false);

  const { isReset, isAnimationCreated } = useSelector((state) => {
    return {
      isReset: state.ui.isReset,
      isAnimationCreated: state.custom.isAnimationCreated,
    };
  }, shallowEqual);

  useEffect(() => {
    if (!isReset) return;
    setTimeout(() => {
      dispatch(uiActions.handleResetAnimationAlert(false));
    }, 1500);
  }, [isReset]);

  useEffect(() => {
    if (!isAnimationCreated) return;

    setIsCreated(true);
    setTimeout(() => {
      setIsCreated(false);
    }, 2500);

    return () => {};
  }, [isAnimationCreated]);

  return (
    <div className="absolute z-20 text-lg right-4 bottom-4">
      <AnimatePresence>
        {isReset && (
          <motion.div
            key="first"
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`alert text-pink-300`}
          >
            Animation was Reset!
          </motion.div>
        )}
        {isCreated && (
          <motion.div
            key="second"
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`alert text-pink-600`}
          >
            Animation was Created!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
