import InvalidKeyFrameAlert from "./Alerts/InvalidKeyFrameAlert";
import PositionAlert from "./Alerts/PositionAlert";
import { motion } from "framer-motion";

export default function Alerts() {
  return (
    <motion.div exit={{ opacity: 0, y: -20 }} transition={{ delay: 1 }}>
      <InvalidKeyFrameAlert />
      <PositionAlert />
    </motion.div>
  );
}
