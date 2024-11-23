import { motion } from "framer-motion";

export default function Alerts() {
  return (
    <motion.div
      layout
      key="sasiskas"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    ></motion.div>
  );
}
