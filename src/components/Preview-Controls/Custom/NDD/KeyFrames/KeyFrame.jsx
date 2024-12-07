import { useDispatch, useSelector } from "react-redux";
import { customActions } from "../../../../../store/customSlicer";
import { ClipboardCopy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function KeyFrame({ active, currentIndex, containerWidth }) {
  const heightRef = useRef(null);
  const keyframeRef = useRef(null);
  const [leftPosition, setLeftPosition] = useState(0);

  const [showToolTip, setShowToolTip] = useState(false);
  const keyFramePers = useSelector((state) => state.custom.keyFramePers);
  const dispatch = useDispatch();

  const curKf = keyFramePers[currentIndex];

  function handleToolTip() {
    setShowToolTip(!showToolTip);
  }

  // Hide tooltip if clicked elsewhere
  useEffect(() => {
    if (!showToolTip) return;

    function hideToolTip(e) {
      const toolTipEl = e.target.closest(`#per-${curKf}`);
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

  useEffect(() => {
    if (!containerWidth || !keyframeRef.current) return;

    const keyframeWidth = keyframeRef.current.offsetWidth;

    // Calculate position in pixels
    const calculatedLeft = (curKf / 100) * containerWidth;

    // Clamp position to stay within bounds
    const clampedLeft = Math.min(
      containerWidth - keyframeWidth, // Maximum left value to stay inside
      Math.max(0, calculatedLeft) // Ensure it doesn't go negative
    );

    setLeftPosition(clampedLeft);
  }, [containerWidth, curKf]);

  return (
    <div
      id={`per-${curKf}`}
      onDoubleClick={() => {
        handleToolTip();
      }}
      onClick={() => {
        dispatch(
          customActions.handleKeyFrame({
            action: "change-active",
            value: currentIndex,
          })
        );
      }}
      ref={heightRef}
      className="h-full"
      style={{
        position: "absolute",
        left: `${leftPosition}px`,
        width: `${`${curKf}`.length * 10 + 20}px`,
      }}
    >
      <div
        ref={keyframeRef}
        className={`keyframe ${active && "bg-[#E1FF9A] text-black z-[9999]"} `}
      >
        <p>{curKf}%</p>
        {/* KEY FRAME COPY POPOUT */}
        <AnimatePresence>
          {showToolTip && (
            <motion.div
              initial={{ opacity: 0, y: "calc(-50%)" }}
              animate={{
                opacity: 1,
                y: "calc(-120%)",
              }}
              exit={{
                opacity: 0,
                y: "calc(-100%)",
                transition: { duration: 0.15 },
              }}
              className="keyframe-tooltip-container"
              style={{ transform: "translateY(-110%)" }}
            >
              {keyFramePers.map((per, copyIndex) => {
                if (per === curKf) return;
                return (
                  <div className="keyframe-tooltip" key={copyIndex}>
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
      <div className="keyframe-downline">
        <div
          className={`keyframe-diamond ${active && "bg-[#E1FF9A]"} cc`}
        ></div>
      </div>
    </div>
  );
}
