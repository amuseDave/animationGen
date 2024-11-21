import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { uiActions } from "../../store/uiSlicer";

export default function CustomDDBtn() {
  const { isDragDrop } = useSelector((state) => {
    return { isDragDrop: state.ui.isDragDrop };
  }, shallowEqual);
  const dispatch = useDispatch();

  function handleDragDrop() {
    dispatch(uiActions.handleDragDrop(!isDragDrop));
  }

  return (
    <div className="flex items-center mt-10">
      <p>Drag&Drop</p>
      <div
        onClick={handleDragDrop}
        className={`w-[76px] h-9 p-[2px] transition-all rounded-3xl cursor-pointer ${
          isDragDrop ? "bg-purple-950" : "bg-purple-200"
        }`}
      >
        <div
          className={`bg-purple-500 rounded-full duration-300 transition-all w-8 h-8
            ${isDragDrop ? "translate-x-10" : ""}`}
        ></div>
      </div>
    </div>
  );
}
