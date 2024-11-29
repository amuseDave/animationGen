import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { uiActions } from "../../store/uiSlicer";
import { X } from "lucide-react";

export default function Layout() {
  const dispatch = useDispatch();

  const type = useSelector((state) => state.ui.type);
  const isModalOpen = useSelector((state) => state.ui.isModalOpen);

  function handleModal() {
    dispatch(uiActions.handleModal(false));
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          animate={{ opacity: [0, 1] }}
          exit={{ opacity: 0, transition: { delay: 0.2 } }}
          className="fixed top-0 right-0 z-50 flex items-center justify-center h-dvh w-dvw bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            animate={{
              transition: { delay: 0.2 },
              opacity: [0, 1],
              x: [-480, 0],
              scale: [3, 1],
            }}
            className="bg-black w-[90%] h-[90%] "
            exit={{ opacity: 0, x: -160 }}
          ></motion.div>

          <X
            size={32}
            onClick={handleModal}
            className="absolute text-white right-6 top-6"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
