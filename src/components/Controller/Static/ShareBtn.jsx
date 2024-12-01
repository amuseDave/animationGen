import { useDispatch, useSelector } from "react-redux";
import { Share2 } from "lucide-react";
import { animationActions } from "../../../store/animationsSlicer";
import { AnimatePresence, motion } from "framer-motion";

export default function ShareBtn() {
  const dispatch = useDispatch();
  const copyLink = useSelector((state) => state.animations.copyLink);
  const type = useSelector((state) => state.ui.type);

  function handleSharing() {
    if (type === "custom") dispatch(animationActions.handleSharingCustom());
    else if (type === "featured") dispatch();
    else if (type === "micro") dispatch();
  }

  console.log(copyLink);

  return (
    <>
      <Share2
        onClick={handleSharing}
        size={32}
        className="absolute bottom-0 text-green-500 right-2"
      />

      <AnimatePresence>
        {copyLink && (
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            className="absolute z-30 inline-block p-1 pr-6 overflow-x-scroll text-white rounded-md bottom-10 bg-green-200/10 right-4 text-nowrap w-80 backdrop-blur-md"
          >
            {copyLink}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
