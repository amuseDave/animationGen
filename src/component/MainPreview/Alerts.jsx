import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { customActions } from "../../customSlicer";
import { motion, AnimatePresence } from "framer-motion";
import "./alerts.css";
import { uiActions } from "../../uiSlicer";

let initialPositionState;

export default function Alerts() {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);

  const { isReset, isAnimationCreated, position, isAnimating } = useSelector(
    (state) => ({
      isAnimationCreated: state.custom.isAnimationCreated,
      isReset: state.ui.isReset,
      position: state.custom.position,
      isAnimating: state.custom.isAnimating,
    }),
    shallowEqual
  );

  const handleAlerts = useCallback((message, type, isSingle) => {
    const id = Date.now();
    setAlerts((prev) => {
      return !isSingle && !prev[0]?.isSingle
        ? [...prev, { id, message, type, isSingle }]
        : [{ id, message, type, isSingle }];
    });

    setTimeout(
      () => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
      },
      isSingle ? 3000 : 1500
    );
  }, []);

  // Animation reset alert
  useEffect(() => {
    if (!isReset) return;
    initialPositionState = false;
    dispatch(uiActions.handleResetAnimationAlert(false));
    handleAlerts("Animation was reset!", "text-xl text-pink-300", true);
  }, [isReset]);

  // Position changed alert
  useEffect(() => {
    if (!initialPositionState) {
      initialPositionState = true;
      return;
    }
    handleAlerts("Position changed!", "success ");
  }, [position]);

  // Animation creation alert
  useEffect(() => {
    if (isAnimationCreated !== null && !isAnimationCreated) return;
    if (isAnimationCreated) {
      handleAlerts("Animation Created!", "text-xl text-pink-500", true);
      return;
    }

    handleAlerts("Animation too short!", "error ");
    dispatch(customActions.handleAnimation({ action: "animation-alert-end" }));
  }, [isAnimationCreated]);

  useEffect(() => {
    if (isAnimating) setAlerts([]);
  }, [isAnimating]);
  return (
    <>
      <div className="absolute z-10 right-4 bottom-4">
        <AnimatePresence>
          {!isAnimating &&
            alerts.map((alert) => (
              <motion.div
                layout
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: isAnimating ? 0 : 0.3 }}
                className={`alert ${alert.type}`}
              >
                {alert.message}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <div className="absolute z-10 right-4 top-5">
        <AnimatePresence>
          {isAnimating && (
            <>
              <motion.div
                className="flex items-center gap-2 text-pink-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                Animation Playing{" "}
                <span className="text-[8px] mt-1 animate-ping">🟣</span>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
