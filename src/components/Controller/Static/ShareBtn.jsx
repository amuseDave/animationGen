import { useDispatch, useSelector } from "react-redux";
import { Share2, X } from "lucide-react";
import { animationActions } from "../../../store/animationsSlicer";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "./Link";

export default function ShareBtn() {
  const [isSharedOpen, setIsSharedOpen] = useState(false);

  const dispatch = useDispatch();
  const copyLink = useSelector((state) => state.animations.copyLink);
  const type = useSelector((state) => state.ui.type);

  function handleSharing() {
    if (isSharedOpen) return;
    if (type === "custom") dispatch(animationActions.handleSharingCustom());
    else if (type === "featured") dispatch();
    else if (type === "micro") dispatch();

    setIsSharedOpen(true);
  }

  function handleSharedClose(e) {
    e.stopPropagation();
    setIsSharedOpen(false);
  }

  useEffect(() => {
    function handleSharedClose(e) {
      const container = e.target.closest("#container");
      const btn = e.target.closest("#share");
      if (container || btn) return;

      setIsSharedOpen(false);
    }

    window.addEventListener("click", handleSharedClose);
    return () => {
      window.removeEventListener("click", handleSharedClose);
    };
  }, []);

  return (
    <>
      <Share2
        id="share"
        onClick={handleSharing}
        size={32}
        className="absolute bottom-0 text-green-500 right-6"
      />

      <AnimatePresence>
        {isSharedOpen && (
          <motion.div
            id="container"
            exit={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 10 }}
            className="absolute z-30 p-2 pr-8 text-white rounded-md shadow-lg bottom-10 right-4 w-80 bg-green-600/10"
          >
            {" "}
            <X
              size={24}
              onClick={handleSharedClose}
              className="absolute p-[1px] text-red-400 transition duration-300 rounded-full top-1 right-1"
            />
            <div className="relative">
              {/* Close Button */}
              {/* Scrolling Content */}
              <div className="overflow-x-scroll whitespace-nowrap scroll">
                <Link copyLink={copyLink} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
