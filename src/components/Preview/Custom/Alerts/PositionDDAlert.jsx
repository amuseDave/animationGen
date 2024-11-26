import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

let changedPosDD = "cc";

export default function PositionDD({ handleAlerts }) {
  const [alerts, setAlerts] = useState([]);
  const [isBlock, setBlock] = useState(false);

  const positionDD = useSelector((state) => state.customDD.positionDD);

  // Position change alert
  useEffect(() => {
    if (positionDD === changedPosDD) return;
    changedPosDD = positionDD;

    if (isBlock) return;
    setBlock(true);
    handleAlerts("Position changed!", "success", setBlock, setAlerts);
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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`alert ${alert.className}`}
          >
            {alert.message}
          </motion.div>
        ))}
      {alerts.length === 0 && (
        <motion.div className="w-40" layout key="positionDD-placeholder" />
      )}
    </AnimatePresence>
  );
}
