import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Custom from "./Custom/Custom";
import Featured from "./Featured/Featured";
import Micro from "./Micro/Micro";

import LibrarySVG from "../../assets/svgs/SaveLibrarySVG.svg";
import ChevronDown from "../../assets/svgs/Arrow-down-chevron.svg";

export default function SavedLibraries() {
  const type = useSelector((state) => state.ui.type);

  return (
    <>
      <div className="mt-6 libraries-container">
        <motion.div
          layout
          className={`mt-8 ${type === "custom" && "mt-0 order-first"}`}
        >
          <Custom svg={LibrarySVG} svg2={ChevronDown} />
        </motion.div>
        <motion.div
          layout
          className={`mt-8 ${type === "featured" && "mt-0 order-first"}`}
        >
          <Featured svg={LibrarySVG} svg2={ChevronDown} />
        </motion.div>
        <motion.div
          layout
          className={`mt-8 ${type === "micro" && "mt-0 order-first"}`}
        >
          <Micro svg={LibrarySVG} svg2={ChevronDown} />
        </motion.div>
      </div>
    </>
  );
}
