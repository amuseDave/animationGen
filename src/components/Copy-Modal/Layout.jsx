import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  const type = useSelector((state) => state.ui.type);
  const isModalOpen = useSelector((state) => state.ui.isModalOpen);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div className="fixed top-0 right-0 z-50 h-dvh w-dvw bg-slate-200/40"></motion.div>
      )}
    </AnimatePresence>
  );
}
