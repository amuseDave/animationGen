import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { customActions } from "../../customSlicer";

export default function CustomDDBtn() {
  const { isDragDrop } = useSelector((state) => {
    return { isDragDrop: state.custom.isDragDrop };
  });
  const dispatch = useDispatch();

  function handleDragDrop() {
    dispatch(customActions.handleDragDrop(!isDragDrop));
  }

  return (
    <div className="flex items-center mt-10">
      <p>Drag&Drop</p>
      <div
        onClick={isDragDrop}
        className="w-[84px] h-10 p-[2px] transition-all rounded-3xl bg-slate-500 cursor-pointer"
      >
        <div className="bg-purple-500 rounded-full w-9 h-9"></div>
      </div>
    </div>
  );
}
