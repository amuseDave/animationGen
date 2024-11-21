import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { customActionsDD } from "../../store/customDDSlicer";
import { motion, AnimatePresence } from "framer-motion";

let changedPos = "cc";

export default function Alerts() {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  const { isAnimationCreatedDD, positionDD, isReset, isDragDrop } = useSelector(
    (state) => ({
      isAnimationCreatedDD: state.customDD.isAnimationCreatedDD,
      positionDD: state.customDD.positionDD,
      isReset: state.ui.isReset,
      isDragDrop: state.ui.isDragDrop,
    }),
    shallowEqual
  );

  // Handle alerts
  const handleAlerts = useCallback((message, type, isSingle) => {
    const id = Date.now();
    setAlerts((prev) => {
      return [...prev, { id, message, type, isSingle }];
    });

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 1500);
  }, []);

  // Position change alert
  useEffect(() => {
    if (positionDD === changedPos || isReset) return;
    changedPos = positionDD;
    handleAlerts("Position changed!", "success");
  }, [positionDD]);

  // Animation error alert
  useEffect(() => {
    if (isAnimationCreatedDD !== null) return;
    handleAlerts("Animation too short!", "error ");
    dispatch(
      customActionsDD.handleAnimation({ action: "animation-alert-end" })
    );
  }, [isAnimationCreatedDD]);

  // Animation creation alert
  useEffect(() => {
    if (isDragDrop) {
      if (!isAnimationCreatedDD) return;
      setIsCreated(true);
      setTimeout(() => {
        setIsCreated(false);
      }, 2500);
    }

    if (!isDragDrop) {
      console.log("Other created actually");
    }
  }, [isAnimationCreatedDD]);

  return (
    <>
      <div className="absolute z-20 right-4 bottom-4">
        <AnimatePresence>
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
              key="second"
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`alert text-pink-600`}
            >
              Animation was Created!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
