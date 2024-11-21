import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { uiActions } from "../../../../store/uiSlicer";

export default function CustomDDBtn() {
  const { isDragDrop } = useSelector((state) => {
    return { isDragDrop: state.ui.isDragDrop };
  }, shallowEqual);
  const dispatch = useDispatch();

  function handleDragDrop() {
    dispatch(uiActions.handleDragDrop(!isDragDrop));
  }

  return (
    <div className="absolute flex items-center gap-3 mt-10 bottom-16 bc">
      <p className="text-lg">Drag&Drop: </p>
      <div
        onClick={handleDragDrop}
        className={`w-[72px] h-8 p-[2px] transition-all rounded-3xl cursor-pointer ${
          isDragDrop ? "bg-purple-950" : "bg-purple-200"
        }`}
      >
        <div
          className={`bg-purple-500 rounded-full duration-300 transition-all w-7 h-7
            ${isDragDrop ? "translate-x-10" : ""}`}
        ></div>
      </div>
    </div>
  );
}
