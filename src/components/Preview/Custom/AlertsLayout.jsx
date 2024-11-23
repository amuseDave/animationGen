import AlertsDD from "./AlertsDD";
import { useSelector } from "react-redux";
import Alerts from "./Alerts";
import { AnimatePresence, motion } from "framer-motion";

export default function AlertsLayout() {
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  return (
    <motion.div exit={{ opacity: 0, transition: { delay: 1 } }}>
      <AnimatePresence>
        {isDragDrop ? <AlertsDD key="AlertsDD" /> : <Alerts key="Alerts" />}
      </AnimatePresence>
    </motion.div>
  );
}
