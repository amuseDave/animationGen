import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { uiActions } from "../../store/uiSlicer";
import { useState } from "react";
import CustomModal from "./Custom/Layout.jsx";
import { X } from "lucide-react";
import Nums from "./Static/Nums.jsx";
import TabHTML from "./Static/TabHTML.jsx";
import TabCSS from "./Static/TabCSS.jsx";

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
              <div className="modal-tab-container">
                <TabHTML tab={tab} handleTab={handleTab} />
                <TabCSS tab={tab} handleTab={handleTab} />
              </div>
              <div className="modal-code-container">
                <Nums />

                <div className="pt-4 modal-code">
                  {tab === "html" && (
                    <>
                      <p>{"<div class='parent-container'>"}</p>
                      <p className="ml-3">
                        {"<div class='animation-container'>"}
                      </p>
                      <p className="ml-6">{"<p>Your Content</p>"}</p>
                      <p className="ml-3">{"</div>"}</p>
                      <p>{"</div>"}</p>
                    </>
                  )}

                  {type === "custom" && tab === "css" && <CustomModal />}
                </div>
              </div>
            </motion.div>

            <X
              size={32}
              onClick={handleModal}
              className="absolute text-[#E1FF9A] right-6 top-6"
            />
          </motion.div>
        )}
      </AnimatePresence>
    )
  );
}
