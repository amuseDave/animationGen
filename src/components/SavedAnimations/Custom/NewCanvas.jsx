import { animationActions } from "../../../store/animationsSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function NewCanvas() {
  const navigate = useNavigate();
  const type = useSelector((state) => state.ui.type);
  const dispatch = useDispatch();

  function handleNewCanvas() {
    if (type !== "custom") {
      navigate("/");
    }
    dispatch(animationActions.handleAddRemoveCustom({ action: "add" }));
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 transition-colors rounded-lg bg-green-300/5 mt-7 text-alert-t-success hover:bg-green-300/10">
      <p>New Canvas</p>
      <div
        onClick={handleNewCanvas}
        className="p-1 transition-colors rounded-full bg-green-300/40 hover:bg-green-400/50"
      >
        <Plus size={14} />
      </div>
    </div>
  );
}
