import { useDispatch, useSelector } from "react-redux";
import { customActions } from "../../customSlicer";

export default function SelectPosition({ type, position }) {
  const animations = useSelector((state) => state.custom.square.animations);
  const dispatch = useDispatch();

  function handlePosition() {
    if (animations[1]?.x) {
      console.log("handle reset confirm");
      return;
    }

    dispatch(customActions.updatePosition(type));
  }

  return (
    <div
      className={`absolute w-4 h-4 rounded-full bg-slate-800 cursor-pointer ${position}`}
      onClick={handlePosition}
    ></div>
  );
}
