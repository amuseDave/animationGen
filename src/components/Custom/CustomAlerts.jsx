import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { customActions } from "../../customSlicer";
import { motion, AnimatePresence } from "framer-motion";

let changedPos = "cc";

export default function Alerts() {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);

  const { isAnimationCreated, positionDD, isReset } = useSelector(
    (state) => ({
      isAnimationCreated: state.custom.isAnimationCreated,
      positionDD: state.custom.positionDD,
      isReset: state.ui.isReset,
    }),
    shallowEqual
  );

  const handleAlerts = useCallback((message, type, isSingle) => {
    const id = Date.now();
    setAlerts((prev) => {
      return [...prev, { id, message, type, isSingle }];
    });

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 1500);
  }, []);

  useEffect(() => {
    if (positionDD === changedPos || isReset) return;
    changedPos = positionDD;
    handleAlerts("Position changed!", "success");
  }, [positionDD]);

  // Animation creation alert
  useEffect(() => {
    if (isAnimationCreated !== null) return;
    handleAlerts("Animation too short!", "error ");
    dispatch(customActions.handleAnimation({ action: "animation-alert-end" }));
  }, [isAnimationCreated]);

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
        </AnimatePresence>
      </div>
    </>
  );
}
