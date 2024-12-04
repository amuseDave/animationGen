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

  return (
    <div className={`add-canvas-container`}>
      <p>New Canvas</p>

      <div onClick={handleNewCanvas} className={`add-canvas-plus`}>
        <Plus size={14} />
      </div>
    </div>
  );
}
