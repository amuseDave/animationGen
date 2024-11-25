import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

let changedPosDD = "cc";

export default function PositionDD() {
  const [alerts, setAlerts] = useState([]);

  const positionDD = useSelector((state) => state.customDD.positionDD);

  const isReset = useSelector((state) => state.ui.isReset);

  // Handle alerts
  const handleAlerts = useCallback((message, type) => {
    const id = Date.now();
    setAlerts((prev) => {
      return [...prev, { id, message, type }];
    });
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 1500);
  }, []);

  // Position change alert
  useEffect(() => {
    if (isReset) return;
    if (positionDD === changedPosDD) return;
    changedPosDD = positionDD;
    handleAlerts("Position changed!", "success");
  }, [positionDD]);

  return (
    <AnimatePresence mode="popLayout">
      {alerts.length > 0 ? (
        alerts.map((alert) => (
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
        ))
      ) : (
        <motion.div layout className="position-placeholder" />
      )}
    </AnimatePresence>
  );
}
