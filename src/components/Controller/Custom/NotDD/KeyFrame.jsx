import { useDispatch, useSelector } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { ChevronDown, ClipboardCopy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function KeyFrame({ active, currentIndex }) {
  const [showToolTip, setShowToolTip] = useState(false);
  const keyFramePers = useSelector((state) => state.custom.keyFramePers);
  const dispatch = useDispatch();

  function handleToolTip() {
    setShowToolTip(!showToolTip);
  }

  // Hide tooltip if clicked elsewhere
  useEffect(() => {
    if (!showToolTip) return;

    function hideToolTip(e) {
      const toolTipEl = e.target.closest(`#per-${keyFramePers[currentIndex]}`);
      if (toolTipEl) return;
      setShowToolTip(false);
    }
    window.addEventListener("click", hideToolTip);

    return () => {
      window.removeEventListener("click", hideToolTip);
    };
  }, [showToolTip]);

  function handleCopyKeyFrame(copyIndex) {
    dispatch(
      customActions.handleKeyFrame({ action: "copy", copyIndex, currentIndex })
    );
    setShowToolTip(false);
  }

  return (
    <div
      id={`per-${keyFramePers[currentIndex]}`}
      className="relative flex items-center justify-start mt-2"
      onClick={() =>
        dispatch(
          customActions.handleKeyFrame({
            action: "switch",
            value: currentIndex,
          })
        )
      }
    >
      <div
        className={`w-4 h-4 rotate-45 ${
          active ? "bg-green-300" : "bg-green-900"
        }`}
      ></div>
      <span className="ml-2 text-zinc-950">{keyFramePers[currentIndex]}%</span>
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
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`absolute right-0 w-[90px] p-1 px-2 overflow-hidden rounded-lg top-7 bg-slate-50/50 z-50`}
          >
            {keyFramePers.map((per, copyIndex) => {
              if (per === keyFramePers[currentIndex]) return;
              return (
                <div
                  className="flex items-center justify-between gap-2 font-bold text-start"
                  key={copyIndex}
                >
                  <p>{per}%</p>
                  <ClipboardCopy
                    onClick={() => handleCopyKeyFrame(copyIndex)}
                    size={18}
                  />
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
