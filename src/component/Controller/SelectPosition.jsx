import { useDispatch } from "react-redux";
import { customActions } from "../../customSlicer";

export default function SelectPosition({ type, position }) {
  const dispatch = useDispatch();

  function handlePosition() {
    dispatch(customActions.updatePosition(type));
  }

  return (
    <div
      className={`absolute w-4 h-4 rounded-full bg-slate-800 cursor-pointer ${position}`}
      onClick={handlePosition}
    ></div>
  );
}
