import { animationActions } from "../../../store/animationsSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import AnimationName from "./AnimationName";

export default function NewCanvas() {
  const navigate = useNavigate();
  const type = useSelector((state) => state.ui.type);
  const isDefault = useSelector((state) => state.animations.custom.isDefault);

  const animationNameDefault = useSelector(
    (state) => state.animations.custom.default.name
  );
  const dispatch = useDispatch();

  function handleNewCanvas(e) {
    e.stopPropagation();
    if (type !== "custom") {
      navigate("/");
    }
    dispatch(animationActions.handleAddRemoveCustom({ action: "add" }));
  }

  function handleDefault() {
    if (type !== "custom") {
      navigate("/");
    }
    dispatch(animationActions.handleSetCustomDefault({ isDefault: true }));
  }

  const styles =
    isDefault && type === "custom"
      ? "bg-orange-300/20 text-orange-400 hover:bg-orange-300/30 hover:text-orange-200"
      : "bg-green-300/5 text-alert-t-success hover:bg-green-300/10";

  const stylesPlus =
    isDefault && type === "custom"
      ? "bg-orange-400/50 hover:bg-orange-400/80 text-orange-100"
      : "bg-green-300/40 hover:bg-green-400/50 text-orange-300 text-orange-50";

  return (
    <div
      onClick={handleDefault}
      className={`mt-7 flex items-center px-4 py-2 transition-colors rounded-lg ${styles}`}
    >
      <p>(Default)</p>
      <AnimationName animationName={animationNameDefault} />

      <div
        onClick={handleNewCanvas}
        className={`p-1 transition-colors ml-auto translate-x-2 rounded-full ${stylesPlus}`}
      >
        <Plus size={14} />
      </div>
    </div>
  );
}
