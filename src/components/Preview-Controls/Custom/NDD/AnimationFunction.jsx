import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { customActions } from "../../../../store/customSlicer";
import { AnimatePresence, motion } from "framer-motion";

import { wordMaker } from "../../../../utils/helper";
import { Activity } from "lucide-react";

export default function AnimationFunction() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const animationFunction = useSelector(
    (state) => state.custom.animationFunction
  );

  function handleAnimationFunction(value) {
    dispatch(
      customActions.handleAnimationState({
        action: "animation",
        value,
      })
    );
  }

  useEffect(() => {
    if (!isOpen) return;

    function hideToolTip(e) {
      const toolTipEl = e.target.closest("#animation-functions");
      if (toolTipEl) return;
      setIsOpen(false);
    }
    window.addEventListener("click", hideToolTip);

    return () => {
      window.removeEventListener("click", hideToolTip);
    };
  }, [isOpen]);

  const aFunctions = ["ease", "ease-in", "ease-out", "ease-in-out", "linear"];

  return (
    <>
      <div
        id="animation-functions"
        onClick={() => {
          setIsOpen(true);
        }}
        className="preview-controller-box-item w-[118px] relative"
      >
        {wordMaker(animationFunction)}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="animation-function-motion"
              initial={{ opacity: 0, y: "calc(-100%)" }}
              animate={{ opacity: 1, y: "calc(-110%)" }}
              exit={{ opacity: 0, y: "calc(-110%)", scale: 0 }}
              className="animation-functions-container"
            >
              {aFunctions.map((aFn) => (
                <p
                  key={aFn}
                  className={`px-1 py-[1px] rounded-md transition-all ${
                    aFn === animationFunction && "bg-[#E1FF9A] text-black"
                  }`}
                  onClick={() => handleAnimationFunction(aFn)}
                >
                  {wordMaker(aFn)}
                </p>
              ))}
            </motion.div>
          )}
          <Activity
            onClick={() => setIsOpen(true)}
            size={18}
            className="text-[#E1FF9A] ml-auto absolute right-1"
          />
        </AnimatePresence>
      </div>
    </>
  );
}
