import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

let changedPosDD = "cc";

export default function PositionDD() {
  const [alerts, setAlerts] = useState([]);
  const [pos, setPos] = useState(false);

  const positionDD = useSelector((state) => state.customDD.positionDD);

  // Handle alerts
  const handleAlerts = useCallback((message, type) => {
    const id = Date.now();
    setAlerts((prev) => {
      return [...prev, { id, message, type }];
    });

    setTimeout(() => {
      setPos(false);
    }, 1000);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 2000);
  }, []);

  // Position change alert
  useEffect(() => {
    if (positionDD === changedPosDD) return;
    changedPosDD = positionDD;

    if (pos) return;
    setPos(true);
    handleAlerts("Position changed!", "success");
  }, [positionDD]);

  return (
    <AnimatePresence mode="popLayout">
      {alerts.length > 0 &&
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
        ))}
      {alerts.length === 0 && (
        <motion.div layout key="positionDD-placeholder" />
      )}
    </AnimatePresence>
  );
}
