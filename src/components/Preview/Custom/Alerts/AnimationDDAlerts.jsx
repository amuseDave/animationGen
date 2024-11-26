import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customActionsDD } from "../../../../store/customDDSlicer";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimationAlerts({ handleAlerts }) {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isBlock, setBlock] = useState(false);

  const isAnimationInitialCreatedDD = useSelector(
    (state) => state.customDD.isAnimationInitialCreatedDD
  );

  // Animation error alert
  useEffect(() => {
    if (isAnimationInitialCreatedDD !== false) return;
    dispatch(
      customActionsDD.handleAnimation({ action: "animation-alert-end" })
    );
    if (isBlock) return;
    handleAlerts("Animation too short!", "error ", setBlock, setAlerts);
    setBlock(true);
  }, [isAnimationInitialCreatedDD]);

  // Animation creation alert
  useEffect(() => {
    if (!isAnimationInitialCreatedDD) return;
    dispatch(
      customActionsDD.handleAnimation({ action: "animation-alert-end" })
    );
    setIsCreated(true);
    setTimeout(() => {
      setIsCreated(false);
    }, 2500);
  }, [isAnimationInitialCreatedDD]);

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
      {isCreated && (
        <motion.div
          key="creation-alert"
          layout
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`alert success`}
        >
          Animation was Created!
        </motion.div>
      )}

      {alerts.length === 0 && !isCreated && (
        <motion.div layout key="animationDD-placeholder" />
      )}
    </AnimatePresence>
  );
}
