import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useSelector } from "react-redux";
import ResetAlert from "./Static/ResetAlert";
import PositionAlertDD from "./Custom/Alerts/PositionDDAlert";
import AnimationDDAlerts from "./Custom/Alerts/AnimationDDAlerts";
import InvalidKeyFrameAlert from "./Custom/Alerts/InvalidKeyFrameAlert";
import PositionAlert from "./Custom/Alerts/PositionAlert";

export default function AlertsLayout() {
  const type = useSelector((state) => state.ui.type);

  return (
    <div className="absolute z-20 left-4 bottom-4">
      <LayoutGroup key="animations">
        <AnimatePresence>
          {type === "custom" && (
            <motion.div exit={{ opacity: 0 }} transition={{ delay: 1 }}>
              <PositionAlertDD />
              <AnimationDDAlerts />
              <InvalidKeyFrameAlert />
              <PositionAlert />
            </motion.div>
          )}
        </AnimatePresence>
        <ResetAlert key="reset" />
      </LayoutGroup>
    </div>
  );
}
