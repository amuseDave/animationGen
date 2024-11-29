import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { animationActions } from "../../../store/animationsSlicer";

export default function SavedAnimationsAlerts({ handleAlerts }) {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);
  const [isBlock, setBlock] = useState(false);
  const [isBlock2, setBlock2] = useState(false);
  const [isBlock3, setBlock3] = useState(false);
  const [isBlock4, setBlock4] = useState(false);

  const animationsAlert = useSelector(
    (state) => state.animations.animationsAlert
  );

  // Position change alert
  useEffect(() => {
    if (animationsAlert === null) return;
    dispatch(animationActions.handleAnimationsAlert(null));

    if (animationsAlert === "add") {
      if (isBlock) return;
      setBlock(true);
      handleAlerts("Canvas Created!", "success", setBlock, setAlerts);
      return;
    }
    if (animationsAlert === "remove") {
      if (isBlock2) return;
      setBlock2(true);
      handleAlerts("Canvas Deleted!", "success", setBlock2, setAlerts);
      return;
    }
    if (animationsAlert === "limit") {
      if (isBlock3) return;
      setBlock3(true);
      handleAlerts("Limit Has Been Reached!", "error", setBlock3, setAlerts);
      return;
    }
    if (animationsAlert === "min-limit") {
      if (isBlock4) return;
      setBlock4(true);
      handleAlerts("Can't delete last!", "error", setBlock4, setAlerts);
      return;
    }
  }, [animationsAlert]);

  return (
    <AnimatePresence>
      {alerts.map((alert) => (
        <motion.div
          layout
          key={alert.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`alert ${alert.className}`}
        >
          {alert.message}
        </motion.div>
      ))}
      {alerts.length === 0 && <motion.div layout key="saved-placeholder" />}
    </AnimatePresence>
  );
}
