import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../../store/uiSlicer";

export default function CustomDDBtn() {
  const dispatch = useDispatch();
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  function handleDragDrop(boolean) {
    dispatch(uiActions.handleDragDrop(boolean));
  }

  const ddStyle = isDragDrop ? "ndd" : "dd";

  console.log(ddStyle);

  return (
    <div
      className={`relative mx-auto w-max flex p-[5px] rounded-md navigation z-10 bg-black ${ddStyle}`}
    >
      <div
        className={`nav-btn-DD ${!isDragDrop && "active"}`}
        onClick={() => handleDragDrop(false)}
      >
        KeyFrames
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
