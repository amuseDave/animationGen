import { animationActions } from "../../../store/animationsSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function NewCanvas() {
  const navigate = useNavigate();
  const type = useSelector((state) => state.ui.type);

  const dispatch = useDispatch();

  function handleNewCanvas(e) {
    e.stopPropagation();
    if (type !== "custom") {
      navigate("/");
    }
    dispatch(animationActions.handleAddRemoveCustom({ action: "add" }));
  }

  const styles = "bg-green-300/5 text-alert-t-success hover:bg-green-300/10";
  const stylesPlus =
    "bg-green-300/40 hover:bg-green-400/50 text-orange-300 text-orange-50";

  return (
    <div
      className={`mt-7 flex items-center px-4 py-2 transition-colors rounded-lg ${styles}`}
    >
      <p>New Canvas</p>

      <div
        onClick={handleNewCanvas}
        className={`p-1 transition-colors ml-auto translate-x-2 rounded-full ${stylesPlus}`}
      >
        <Plus size={14} />
      </div>
    </div>
  );
}
