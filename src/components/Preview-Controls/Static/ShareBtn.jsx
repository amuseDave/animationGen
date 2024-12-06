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
        className="share-btn"
      />

      <AnimatePresence>
        {isSharedOpen && (
          <motion.div
            id="container"
            exit={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 10 }}
            className="share-container"
          >
            {" "}
            <X size={24} onClick={handleSharedClose} className="share-x" />
            <div className="relative">
              {/* Close Button */}
              {/* Scrolling Content */}
              <div className="share-text-container">
                <Link copyLink={copyLink} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
