import { CircleMinus, CirclePlus, RotateCcw } from "lucide-react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlicer";

export default function PreviewControls() {
  const dispatch = useDispatch();
  function handleZoomChangeHandler(type) {
    dispatch(uiActions.handleZoomChange(type));
  }

  return (
    <div className="mr-10 zoom rc">
      <div
        className="p-2"
        onClick={() => {
          handleZoomChangeHandler("zoom-in");
        }}
      >
        <CirclePlus
          size={20}
          strokeWidth={1}
          className="text-alert-t-success"
        />
      </div>

      <div
        className="p-2"
        onClick={() => {
          handleZoomChangeHandler("reset");
        }}
      >
        <RotateCcw size={20} strokeWidth={1} className="text-alert-t-success" />
      </div>

      <div
        className="p-2"
        onClick={() => {
          handleZoomChangeHandler("zoom-out");
        }}
      >
        <CircleMinus
          size={20}
          strokeWidth={1}
          className="text-alert-t-success"
        />
      </div>
    </div>
  );
}
