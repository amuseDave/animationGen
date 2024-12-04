import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Custom from "./Custom/Custom";
import Featured from "./Featured/Featured";
import Micro from "./Micro/Micro";

export default function SavedLibraries() {
  const type = useSelector((state) => state.ui.type);

  return (
    <>
      <div className="libraries-container">
        <motion.div
          layout
          className={`library-margin ${type === "custom" && "library-active"}`}
        >
          <Custom />
        </motion.div>
        <motion.div
          layout
          className={`library-margin ${
            type === "featured" && "library-active"
          }`}
        >
          <Featured />
        </motion.div>
        <motion.div
          layout
          className={`library-margin ${type === "micro" && "library-active"}`}
        >
          <Micro />
        </motion.div>
      </div>
    </>
  );
}
