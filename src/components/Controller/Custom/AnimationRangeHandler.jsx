import { useDispatch } from "react-redux";

// Handle range not drag drop
export default function AnimationRangeHandler() {
  const dispatch = useDispatch();

  function handle() {
    dispatch();
  }

  return (
    <input
      onChange={handle}
      className="flex-grow cursor-move"
      id="animation"
      name="animation"
      type="range"
      min="0"
    />
  );
}
