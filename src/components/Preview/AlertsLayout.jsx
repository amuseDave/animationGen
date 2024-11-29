import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import ResetAlert from "./Static/ResetAlert";
import PositionAlertDD from "./Custom/Alerts/PositionDDAlert";
import AnimationDDAlerts from "./Custom/Alerts/AnimationDDAlerts";
import KeyFrameAlert from "./Custom/Alerts/KeyFrameAlert";
import PositionAlert from "./Custom/Alerts/PositionAlert";
import SavedAnimationsAlerts from "./Static/SavedAnimationsAlerts";

export default function AlertsLayout() {
  const type = useSelector((state) => state.ui.type);

  // Handle Alerts
  const handleAlerts = useCallback(
    (message, className, setBlock, setAlerts) => {
      const id = Date.now();
      setAlerts((prev) => {
        return [...prev, { id, message, className }];
      });
      if (setBlock)
        setTimeout(() => {
          setBlock(false);
        }, 1000);

      setTimeout(() => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
      }, 2000);
    },
    []
  );

  return (
    <div className="absolute z-20 w-full left-4 bottom-4">
      <LayoutGroup key="animations">
        <AnimatePresence>
          {type === "custom" && (
            <motion.div
              key="all-custom-animations"
              exit={{ opacity: 0 }}
              transition={{ delay: 2 }}
            >
              <PositionAlert handleAlerts={handleAlerts} />
              <PositionAlertDD handleAlerts={handleAlerts} />
              <AnimationDDAlerts handleAlerts={handleAlerts} />
              <KeyFrameAlert handleAlerts={handleAlerts} />
            </motion.div>
          )}
        </AnimatePresence>
        <ResetAlert key="reset" />
        <SavedAnimationsAlerts handleAlerts={handleAlerts} key="saved" />
      </LayoutGroup>
    </div>
  );
}
