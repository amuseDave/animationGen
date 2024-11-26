import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ValidKeyFrameAlert({ handleAlerts }) {
  const dispatch = useDispatch();
  const isValidKeyFrame = useSelector((state) => state.custom.isValidKeyFrame);
  const [isBlock, setBlock] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (isValidKeyFrame === null) return;

    dispatch(
      customActions.handleKeyFrame({ action: "validation", value: null })
    );

    if (isBlock) return;
    setBlock(true);
    handleAlerts(
      "Can't have the same keyframe!",
      "error ",
      setBlock,
      setAlerts
    );
  }, [isValidKeyFrame]);

  return (
    <AnimatePresence>
      {alerts.map((alert) => (
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

      {alerts.length === 0 && <motion.div key="kf-placeholder"></motion.div>}
    </AnimatePresence>
  );
}
