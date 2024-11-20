import { CircleMinus, CirclePlus, RotateCcw } from "lucide-react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../uiSlicer";

export default function PreviewControls() {
  const dispatch = useDispatch();
  function handleZoomChangeHandler(type) {
    dispatch(uiActions.handleZoomChange(type));
  }

  return (
    <div className="absolute z-30 border rounded-md bg-zinc-900 top-14 right-2 border-zinc-800">
      <div
        className="p-2 cursor-pointer"
        onClick={() => {
          handleZoomChangeHandler("zoom-in");
        }}
      >
        <CirclePlus size={20} className=" text-zinc-500" />
      </div>

      <div
        className="p-2 cursor-pointer"
        onClick={() => {
          handleZoomChangeHandler("reset");
        }}
      >
        <RotateCcw size={20} className=" text-zinc-500" />
      </div>

      <div
        className="p-2 cursor-pointer"
        onClick={() => {
          handleZoomChangeHandler("zoom-out");
        }}
      >
        <CircleMinus size={20} className=" text-zinc-500" />
      </div>
    </div>
  );
}
