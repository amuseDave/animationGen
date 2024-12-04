import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../../store/uiSlicer";

export default function CustomDDBtn() {
  const dispatch = useDispatch();
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  function handleDragDrop(boolean) {
    dispatch(uiActions.handleDragDrop(boolean));
  }

  const ddStyle = isDragDrop ? "ndd" : "dd";

  return (
    <div
      className={`relative mx-auto w-max flex p-1 rounded-xl navigation ${ddStyle}`}
    >
      <div
        className={`nav-btn-DD ${!isDragDrop && "active"}`}
        onClick={() => handleDragDrop(false)}
      >
        KeyFrame
      </div>
      <div
        className={`nav-btn-DD ${isDragDrop && "active"}`}
        onClick={() => handleDragDrop(true)}
      >
        Drag&Drop
      </div>
    </div>
  );
}
