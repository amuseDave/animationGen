import { useDispatch } from "react-redux";
import { customActions } from "../../../../store/customSlicer";

export default function KeyFrame({ active, percentage, index }) {
  const dispatch = useDispatch();

  return (
    <div
      className="flex items-center justify-start w-20 gap-4 mt-2 cursor-pointer"
      onClick={() => dispatch(customActions.handleKeyFrame(index))}
    >
      <div
        className={`w-5 h-5 rotate-45 ${
          active ? "bg-green-300" : "bg-green-900"
        }`}
      ></div>
      <span>{percentage}%</span>
    </div>
  );
}
