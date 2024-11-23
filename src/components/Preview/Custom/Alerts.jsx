import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../../store/customSlicer";
import { motion, AnimatePresence } from "framer-motion";

// let changedPosDD = "cc";

export default function Alerts() {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);

  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const keyFrames = useSelector((state) => state.custom.keyFrames);

  const isReset = useSelector((state) => state.ui.isReset);

  const curKeyFrame = keyFrames[activeKeyFrame];
  // Handle alerts
  const handleAlerts = useCallback((message, className) => {
    const id = Date.now();
    setAlerts((prev) => {
      return [...prev, { id, message, className }];
    });
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 1500);
  }, []);

  // Position change alert
  useEffect(() => {
    if (isReset || curKeyFrame.oldPos === curKeyFrame.position) return;

    handleAlerts("Position changed!", "success");

    dispatch(
      customActions.handleSetPosition({
        action: "set-old",
        pos: curKeyFrame.position,
      })
    );
  }, [curKeyFrame]);

  return (
    <motion.div exit={{ opacity: 0, transition: { delay: 1 } }}>
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            layout
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`alert ${alert.className}`}
          >
            {alert.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
