import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { uiActions } from "../../store/uiSlicer";
import { useState } from "react";
import CustomModal from "./Custom/Layout.jsx";
import { X } from "lucide-react";
import Nums from "./Static/Nums.jsx";
import TabHTML from "./Static/TabHTML.jsx";
import TabCSS from "./Static/TabCSS.jsx";
import CustomHTML from "./Custom/NDD/HTML.jsx";
import CopyCode from "./Static/CopyCode.jsx";

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
    <AnimatePresence>
      {isModalOpen && type && (
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
            onDoubleClick={() => {
              let copyEl;

              if (tab === "html") {
                copyEl = document.querySelector(".modal-html p");
              } else if (tab === "css") {
                copyEl = document.querySelector(".modal-css p");
              }

              const range = document.createRange();
              range.selectNodeContents(copyEl);

              const selection = window.getSelection();
              selection.removeAllRanges(); // Clear any previous selections
              selection.addRange(range); // Select the content of the span
            }}
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
              size={24}
              onClick={handleModal}
              className="ml-auto text-[#E1FF9A] translate-x-4"
            />

            {/* Handle CSS & HTML TABS */}
            <div className="mt-2 modal-tab-container">
              <TabHTML tab={tab} handleTab={handleTab} />
              <TabCSS tab={tab} handleTab={handleTab} />
            </div>

            <div className="modal-code-container">
              {tab === "html" && (
                <>
                  <Nums />
                  <div className="w-full h-full modal-html">
                    {type === "custom" && <CustomHTML />}
                  </div>
                </>
              )}

              {tab === "css" && (
                <>
                  {type === "custom" && <CustomModal />}
                  {type === "featured" && <>Featured</>}
                  {type === "micro" && <>Micro</>}
                </>
              )}
            </div>

            <CopyCode tab={tab} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
