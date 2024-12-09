import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { uiActions } from "../../store/uiSlicer";
import CustomModal from "./Custom/Layout.jsx";
import { X } from "lucide-react";

export default function Layout() {
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
              {type === "custom" && <CustomModal />}
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
