import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ValidKeyFrameAlert({ handleAlerts }) {
  const dispatch = useDispatch();
  const isValidKeyFrame = useSelector((state) => state.custom.isValidKeyFrame);
  const [isBlock, setBlock] = useState(false);
  const [isBlock2, setBlock2] = useState(false);
  const [isBlock3, setBlock3] = useState(false);
  const [isBlock4, setBlock4] = useState(false);
  const [isBlock5, setBlock5] = useState(false);
  const [isBlock6, setBlock6] = useState(false);

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (isValidKeyFrame === null) return;

    dispatch(
      customActions.handleKeyFrame({ action: "validation", value: null })
    );

    if (isValidKeyFrame === "same") {
      if (isBlock) return;
      setBlock(true);
      handleAlerts(
        "Can't have the same keyframe!",
        "error",
        setBlock,
        setAlerts
      );
      return;
    } else if (typeof isValidKeyFrame === "number") {
      if (isBlock2) return;
      setBlock2(true);
      handleAlerts(
        `Keyframe (${isValidKeyFrame}%) properties has been copied!`,
        "success",
        setBlock2,
        setAlerts
      );
      return;
    } else if (isValidKeyFrame === "invalid") {
      if (isBlock3) return;
      setBlock3(true);
      handleAlerts("Invalid Keyframe!", "error", setBlock3, setAlerts);
      return;
    } else if (isValidKeyFrame === "same-styles") {
      if (isBlock4) return;
      setBlock4(true);
      handleAlerts(
        "All keyframes has the same styles!",
        "error",
        setBlock4,
        setAlerts
      );

      return;
    } else if (isValidKeyFrame === "no-reset") {
      if (isBlock5) return;
      setBlock5(true);
      handleAlerts("There's nothing to reset!", "error", setBlock5, setAlerts);
      return;
    } else if (isValidKeyFrame === "reset") {
      if (isBlock6) return;
      setBlock6(true);
      handleAlerts(
        "Keyframes has been reset!",
        "success",
        setBlock6,
        setAlerts
      );
      return;
    }

    handleAlerts("Keyframe has been created!", "success", null, setAlerts);
  }, [isValidKeyFrame]);

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

      {alerts.length === 0 && (
        <motion.div layout key="kf-placeholder"></motion.div>
      )}
    </AnimatePresence>
  );
}
