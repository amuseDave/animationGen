import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customActionsDD } from "../../../../store/customDDSlicer";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimationAlerts() {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [err, setErr] = useState(false);

  const isAnimationInitialCreatedDD = useSelector(
    (state) => state.customDD.isAnimationInitialCreatedDD
  );

  // Handle alerts
  const handleAlerts = useCallback((message, type) => {
    const id = Date.now();
    setAlerts((prev) => {
      return [...prev, { id, message, type }];
    });
    setTimeout(() => {
      setErr(false);
    }, 1000);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 2000);
  }, []);

  // Animation error alert
  useEffect(() => {
    if (isAnimationInitialCreatedDD !== false) return;
    dispatch(
      customActionsDD.handleAnimation({ action: "animation-alert-end" })
    );
    if (err) return;
    handleAlerts("Animation too short!", "error ");
    setErr(true);
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
    <AnimatePresence mode="popLayout">
      {alerts.map((alert) => (
        <motion.div
          layout
          key={alert.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`alert ${alert.type}`}
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
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`alert text-pink-600 text-lg`}
        >
          Animation was Created!
        </motion.div>
      )}

      {alerts.length === 0 && !isCreated && (
        <motion.div layout className="position-placeholder" />
      )}
    </AnimatePresence>
  );
}
