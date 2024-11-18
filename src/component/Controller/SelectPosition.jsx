import { useDispatch, useSelector } from "react-redux";
import { customActions } from "../../customSlicer";

export default function SelectPosition({ type, positionStyles }) {
  const { square, position } = useSelector((state) => state.custom);
  const dispatch = useDispatch();

  function handlePosition() {
    if (square.isAnimating) {
      console.log("handle reset confirm");
      return;
    }
    dispatch(customActions.updatePosition(type));
  }

  return (
    <div
      className={`absolute w-4 h-4 rounded-full cursor-pointer ${positionStyles} transition-colors ${
        position === type
          ? "bg-purple-950 hover:bg-purple-950"
          : "bg-purple-500 hover:bg-pink-950"
      }`}
      onClick={handlePosition}
    ></div>
  );
}
