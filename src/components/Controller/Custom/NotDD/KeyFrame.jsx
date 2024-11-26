import { useDispatch, useSelector } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { ChevronDown, ClipboardCopy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function KeyFrame({ active, percentage, index }) {
  const [showToolTip, setShowToolTip] = useState(false);
  const keyFramePers = useSelector((state) => state.custom.keyFramePers);
  const dispatch = useDispatch();

  function handleToolTip() {
    setShowToolTip(!showToolTip);
  }

  return (
    <div
      className="relative flex items-center justify-start mt-2"
      onClick={() =>
        dispatch(
          customActions.handleKeyFrame({ action: "switch", value: index })
        )
      }
    >
      <div
        className={`w-4 h-4 rotate-45 ${
          active ? "bg-green-300" : "bg-green-900"
        }`}
      ></div>
      <span className="ml-2 text-zinc-950">{percentage}%</span>
      <ChevronDown
        onClick={handleToolTip}
        size={20}
        className={`${
          showToolTip ? "rotate-180 text-white" : "rotate-0"
        } transition-all`}
      />

      <AnimatePresence mode="popLayout">
        {showToolTip && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`absolute right-0 w-20 p-1 overflow-hidden rounded-lg top-6 bg-slate-50/50`}
          >
            {keyFramePers.map((per, index) => {
              if (per === percentage) return;
              return (
                <div
                  className="flex items-center gap-2 font-bold text-start"
                  key={index}
                >
                  <p>{per}%</p> <ClipboardCopy size={18} />
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
