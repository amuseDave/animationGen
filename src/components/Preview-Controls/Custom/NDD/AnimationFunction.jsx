import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { customActions } from "../../../../store/customSlicer";
import { AnimatePresence, motion } from "framer-motion";
import { wordMaker } from "../../../../utils/helper";

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

  const aFunctions = ["ease", "ease-in", "ease-out", "ease-in-out", "linear"];

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

  return (
    <>
      <div
        id="animation-functions"
        onClick={() => {
          setIsOpen(true);
        }}
        className="preview-controller-box-item w-[110px] relative"
      >
        {wordMaker(animationFunction)}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: "calc(-100%)" }}
              animate={{ opacity: 1, y: "calc(-110%)" }}
              exit={{ opacity: 0, y: "calc(-80%)" }}
              className="animation-functions-container"
            >
              {aFunctions.map((aFn) => {
                return (
                  <p
                    className={`px-1 py-[1px] rounded-md transition-all ${
                      aFn === animationFunction && "bg-[#E1FF9A] text-black"
                    }`}
                    onClick={() => handleAnimationFunction(aFn)}
                    key={aFn}
                  >
                    {wordMaker(aFn)}
                  </p>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
