import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../../store/uiSlicer";

export default function CustomDDBtn() {
  const dispatch = useDispatch();
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  function handleDragDrop(boolean) {
    dispatch(uiActions.handleDragDrop(boolean));
  }

  const active = "bg-green-100/10 text-main-t-active rounded-md";

  return (
    <div className="flex gap-2 p-1 mx-auto border rounded-lg border-zinc-800 bg-gradient-to-tr from-green-950 to-green-800 text-main-t w-max">
      <div
        className={`px-2 py-2 transition-all ${!isDragDrop && active}`}
        onClick={() => handleDragDrop(false)}
      >
        KeyFrames
      </div>
      <div
        className={`px-2 py-2 transition-all ${isDragDrop && active}`}
        onClick={() => handleDragDrop(true)}
      >
        Drag&Drop
      </div>
    </div>
  );
}
