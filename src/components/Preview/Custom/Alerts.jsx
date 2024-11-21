import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { customActionsDD } from "../../../store/customDDSlicer";
import { motion } from "framer-motion";

let changedPos = "cc";

export default function Alerts() {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  const { positionDD, isReset, isDragDrop, isAnimationInitialCreatedDD } =
    useSelector(
      (state) => ({
        positionDD: state.customDD.positionDD,
        isReset: state.ui.isReset,
        isDragDrop: state.ui.isDragDrop,
        isAnimationInitialCreatedDD: state.customDD.isAnimationInitialCreatedDD,
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
    if (isAnimationInitialCreatedDD !== false) return;
    handleAlerts("Animation too short!", "error ");
    dispatch(
      customActionsDD.handleAnimation({ action: "animation-alert-end" })
    );
  }, [isAnimationInitialCreatedDD]);

  // Animation creation alert
  useEffect(() => {
    if (isDragDrop) {
      if (!isAnimationInitialCreatedDD) return;
      dispatch(
        customActionsDD.handleAnimation({ action: "animation-alert-end" })
      );
      setIsCreated(true);
      setTimeout(() => {
        setIsCreated(false);
      }, 2500);
    }

    if (!isDragDrop) {
      console.log("not Drag Drop created");
    }
  }, [isAnimationInitialCreatedDD]);

  return (
    <>
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
          className={`alert text-pink-600 text-lg`}
        >
          Animation was Created!
        </motion.div>
      )}
    </>
  );
}
