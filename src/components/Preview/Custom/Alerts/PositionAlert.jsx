import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { motion, AnimatePresence } from "framer-motion";

export default function PositionAlert({ handleAlerts }) {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);
  const [isBlock, setBlock] = useState(false);

  const activeKeyFrame = useSelector((state) => {
    return state.custom.activeKeyFrame;
  });

  const position = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].position
  );
  const oldPos = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].oldPos
  );

  // Position change alert
  useEffect(() => {
    if (oldPos === position) return;
    dispatch(
      customActions.handleSetPosition({
        action: "set-old",
        pos: position,
      })
    );
    if (isBlock) return;
    setBlock(true);
    handleAlerts("Position changed!", "success", setBlock, setAlerts);
  }, [position]);

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

      {alerts.length === 0 && <motion.div layout key="position-placeholder" />}
    </AnimatePresence>
  );
}
