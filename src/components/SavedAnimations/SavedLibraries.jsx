import { useSelector, useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import Custom from "./Custom/Custom";
import Featured from "./Featured/Featured";
import Micro from "./Micro/Micro";
import { animationActions } from "../../store/animationsSlicer";
import { useNavigate } from "react-router-dom";

export default function SavedLibraries() {
  const navigate = useNavigate();
  const type = useSelector((state) => state.ui.type);
  const dispatch = useDispatch();

  function handleNewCanvas() {
    if (type !== "custom") {
      navigate("/");
    }
    dispatch(animationActions.handleAddCustom({ action: "add" }));
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 transition-colors rounded-lg bg-green-300/5 mt-7 text-alert-t-success hover:bg-green-300/10">
        <p>New Canvas</p>
        <div
          onClick={handleNewCanvas}
          className="p-1 transition-colors rounded-full bg-green-300/40 hover:bg-green-400/50"
        >
          <Plus size={14} />
        </div>
      </div>

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
