import { CircleMinus, CirclePlus, RotateCcw } from "lucide-react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlicer";

export default function PreviewControls() {
  const dispatch = useDispatch();
  function handleZoomChangeHandler(type) {
    dispatch(uiActions.handleZoomChange(type));
  }

  return (
    <div className="absolute z-30 flex border rounded-md bc bg-zinc-900 border-zinc-800">
      <div
        className="p-2"
        onClick={() => {
          handleZoomChangeHandler("zoom-in");
        }}
      >
        <CirclePlus size={20} className=" text-zinc-500" />
      </div>

      <div
        className="p-2"
        onClick={() => {
          handleZoomChangeHandler("reset");
        }}
      >
        <RotateCcw size={20} className=" text-zinc-500" />
      </div>

      <div
        className="p-2"
        onClick={() => {
          handleZoomChangeHandler("zoom-out");
        }}
      >
        <CircleMinus size={20} className=" text-zinc-500" />
      </div>
    </div>
  );
}
