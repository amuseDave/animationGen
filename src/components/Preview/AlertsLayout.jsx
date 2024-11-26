import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import ResetAlert from "./Static/ResetAlert";
import PositionAlertDD from "./Custom/Alerts/PositionDDAlert";
import AnimationDDAlerts from "./Custom/Alerts/AnimationDDAlerts";
import InvalidKeyFrameAlert from "./Custom/Alerts/InvalidKeyFrameAlert";
import PositionAlert from "./Custom/Alerts/PositionAlert";

export default function AlertsLayout() {
  const type = useSelector((state) => state.ui.type);

  // Handle Alerts
  const handleAlerts = useCallback((message, type, setBlock, setAlerts) => {
    const id = Date.now();
    setAlerts((prev) => {
      return [...prev, { id, message, type }];
    });
    setTimeout(() => {
      setBlock(false);
    }, 1000);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 2000);
  }, []);

  return (
    <div className="absolute z-20 left-4 bottom-4">
      <LayoutGroup key="animations">
        <AnimatePresence>
          {type === "custom" && (
            <motion.div exit={{ opacity: 0 }} transition={{ delay: 1 }}>
              <PositionAlertDD handleAlerts={handleAlerts} />
              <AnimationDDAlerts handleAlerts={handleAlerts} />
              <InvalidKeyFrameAlert handleAlerts={handleAlerts} />
              <PositionAlert handleAlerts={handleAlerts} />
            </motion.div>
          )}
        </AnimatePresence>
        <ResetAlert key="reset" />
      </LayoutGroup>
    </div>
  );
}
