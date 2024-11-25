import { motion, LayoutGroup } from "framer-motion";
import AnimationAlertsDD from "./Alerts/AnimationDDAlerts.jsx";
import PositionDD from "./Alerts/PositionDDAlert.jsx";

export default function Alerts() {
  return (
    <motion.div exit={{ opacity: 0 }} transition={{ delay: 1 }}>
      <LayoutGroup id="alertsDD">
        <AnimationAlertsDD />
        <PositionDD />
      </LayoutGroup>
    </motion.div>
  );
}
