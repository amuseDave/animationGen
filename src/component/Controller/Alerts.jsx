import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { customActions } from "../../customSlicer";
import { motion, AnimatePresence } from "framer-motion";
import "./alerts.css";
import { uiActions } from "../../uiSlicer";

export default function Alerts() {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);
  const { isAnimating, isReset, isResizing } = useSelector(
    (state) => ({
      isAnimating: state.custom.isAnimating,
      isReset: state.ui.isReset,
      isResizing: state.custom.isResizing,
    }),
    shallowEqual
  );

  const handleAlerts = useCallback((message, type) => {
    const alertId = Date.now();
    setAlerts((prev) => [...prev, { id: alertId, message, type }]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
    }, 1500);
  }, []);

  // useEffect(() => {
  //   if (isResizing && isAnimating) {
  //     handleAlerts("Window is Resizing!", "success");
  //   }
  // }, [isResizing, isAnimating]);

  useEffect(() => {
    if (!isReset) return;
    dispatch(uiActions.restartReset());
    handleAlerts("Animation was reset!", "success");
  }, [isReset]);

  useEffect(() => {
    if (isAnimating === null) {
      handleAlerts("Animation too short!", "error");
      dispatch(customActions.resetAnimation());
    } else if (isAnimating) {
      handleAlerts("Animation created!", "success");
    }
  }, [isAnimating]);

  return (
    <div className="fixed z-10 -translate-x-1/2 top-16 left-1/2">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            layout
            key={alert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
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
