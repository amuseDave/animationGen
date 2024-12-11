import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { uiActions } from "../../store/uiSlicer";
import { useState } from "react";
import CustomModal from "./Custom/Layout.jsx";
import { Copy, X } from "lucide-react";
import Nums from "./Static/Nums.jsx";
import TabHTML from "./Static/TabHTML.jsx";
import TabCSS from "./Static/TabCSS.jsx";
import CustomHTML from "./Custom/NDD/HTML.jsx";

export default function Layout() {
  const [tab, setTab] = useState("html");

  function handleTab(tab) {
    setTab(tab);
  }

  const dispatch = useDispatch();

  const type = useSelector((state) => state.ui.type);
  const isModalOpen = useSelector((state) => state.ui.isModalOpen);

  function handleModal() {
    dispatch(uiActions.handleModal(false));
  }

  return (
    type && (
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            onClick={(e) => {
              const container = e.target.closest("#modal-container");
              if (container) return;
              dispatch(uiActions.handleModal(false));
            }}
            animate={{ opacity: [0, 1] }}
            exit={{ opacity: 0, transition: { delay: 0.1 } }}
            className="modal-overlay"
          >
            <motion.div
              id="modal-container"
              animate={{
                transition: { delay: 0.1 },
                opacity: [0, 1],

                scale: [0, 1],
              }}
              className="modal-container"
              exit={{ opacity: [1, 0], scale: [1, 0] }}
            >
              <X
                size={28}
                onClick={handleModal}
                className="ml-auto text-[#E1FF9A] translate-x-4"
              />

              <div className="modal-tab-container">
                <TabHTML tab={tab} handleTab={handleTab} />
                <TabCSS tab={tab} handleTab={handleTab} />
              </div>
              <div className="modal-code-container">
                {tab === "html" && type === "custom" && (
                  <>
                    <Nums />
                    <div className="modal-html">
                      <CustomHTML />
                    </div>
                  </>
                )}

                {tab === "css" && type === "custom" && <CustomModal />}
              </div>
              <Copy
                onClick={() => {
                  let textToCopy = "";
                  if (tab === "html") {
                    textToCopy = `
                    <div class="parent-container">
                      <div class="animation-container">
                        <p>Your Content</p>
                      </div>
                    </div>`;
                  }
                  if (textToCopy) {
                    navigator.clipboard
                      .writeText(textToCopy)
                      .then(() => alert("Copied to clipboard!"))
                      .catch((err) => alert("Failed to copy: " + err));
                  }
                }}
                className="absolute right-10 bottom-7"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  );
}
