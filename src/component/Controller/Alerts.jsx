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

  const { isReset, isAnimationCreated, position } = useSelector(
    (state) => ({
      isAnimationCreated: state.custom.isAnimationCreated,
      isReset: state.ui.isReset,
      isResizing: state.custom.isResizing,
      position: state.custom.position,
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
    dispatch(uiActions.restartReset());
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
    dispatch(customActions.resetAnimation());
  }, [isAnimationCreated]);

  return (
    <div className="absolute z-10 right-4 bottom-4">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            layout
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`alert ${alert.type}`}
          >
            {alert.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
