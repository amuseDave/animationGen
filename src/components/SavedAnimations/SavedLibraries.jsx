import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Custom from "./Custom/Custom";
import Featured from "./Featured/Featured";
import Micro from "./Micro/Micro";

export default function SavedLibraries() {
  const type = useSelector((state) => state.ui.type);

  return (
    <>
      <div className="flex flex-col font-medium">
        <motion.div
          layout
          className={`mt-8 ${type === "custom" && "order-first mt-2"}`}
        >
          <Custom />
        </motion.div>
        <motion.div
          layout
          className={`mt-8 ${type === "featured" && "order-first mt-2"}`}
        >
          <Featured />
        </motion.div>
        <motion.div
          layout
          className={`mt-8 ${type === "micro" && "order-first mt-2"}`}
        >
          <Micro />
        </motion.div>
      </div>
    </>
  );
}
