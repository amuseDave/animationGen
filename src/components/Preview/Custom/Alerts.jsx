import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customActionsDD } from "../../../store/customDDSlicer";
import { motion } from "framer-motion";

let changedPosDD = "cc";
let changedPos = "cc";

export default function Alerts() {
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  const positionDD = useSelector((state) => state.customDD.positionDD);
  const position = useSelector((state) => state.custom.position);
  const isReset = useSelector((state) => state.ui.isReset);
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);
  const isAnimationInitialCreatedDD = useSelector(
    (state) => state.customDD.isAnimationInitialCreatedDD
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
    if (isReset) return;

    if (isDragDrop) {
      if (positionDD === changedPosDD) return;
      changedPosDD = positionDD;
      handleAlerts("Position changed!", "success");
    }

    if (!isDragDrop) {
      if (position === changedPos) return;
      changedPos = position;
      handleAlerts("Position changed!", "success");
    }
  }, [positionDD, position]);

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
