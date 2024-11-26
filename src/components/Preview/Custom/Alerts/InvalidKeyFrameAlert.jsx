import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ValidKeyFrameAlert({ handleAlerts }) {
  const isValidKeyFrame = useSelector((state) => state.custom.isValidKeyFrame);
  const [isBlock, setBlock] = useState(false);

  useEffect(() => {}, [isValidKeyFrame]);

  return (
    <AnimatePresence>
      {isValidKeyFrame === null && (
        <motion.div key="kf-placeholder"></motion.div>
      )}
    </AnimatePresence>
  );
}
