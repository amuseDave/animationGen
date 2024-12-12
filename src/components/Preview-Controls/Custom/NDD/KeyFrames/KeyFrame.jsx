import { useDispatch, useSelector } from "react-redux";
import { customActions } from "../../../../../store/customSlicer";
import { ClipboardCopy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function KeyFrame({ active, currentIndex }) {
  const heightRef = useRef(null);
  const keyframeRef = useRef(null);

  const [showToolTip, setShowToolTip] = useState(false);
  const keyFramePers = useSelector((state) => state.custom.keyFramePers);
  const dispatch = useDispatch();
  const curKf = keyFramePers[currentIndex];

  const [leftPosition, setLeftPosition] = useState({
    percentage: curKf,
    translate: "-50% 0",
  });

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
    if (!keyframeRef.current) return;

    const containerPos = document
      .getElementById("keyframes-parent")
      .getBoundingClientRect();

    const { left, right } = keyframeRef.current.getBoundingClientRect();

    const newTranslate =
      left < containerPos.left
        ? "0% 0%"
        : right > containerPos.right
        ? "-100% 0%"
        : "-50% 0";

    const changingNew = { percentage: curKf, translate: newTranslate };

    setLeftPosition(changingNew);
  }, []);

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
        left: `${leftPosition.percentage}%`,
        translate: leftPosition.translate,
        width: "42px",
        zIndex: active ? "9999" : 10,
      }}
    >
      <div
        ref={keyframeRef}
        // style={{ width: `${`${curKf}`.length * 10 + 20}px` }}
        className={`keyframe ${active && "bg-[#E1FF9A] text-black"} `}
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
