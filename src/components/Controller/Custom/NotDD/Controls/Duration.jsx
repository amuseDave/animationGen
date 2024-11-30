import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { customActions } from "../../../../../store/customSlicer";

export default function Duration() {
  const dispatch = useDispatch();
  const timeoutId = useRef();

  const duration = useSelector((state) => state.custom.duration);

  function handleDuration(e) {
    let val = parseFloat(e.target.value); // Parse the input as a number
    if (isNaN(val)) val = 0.1; // Default to 0.1 if input is not a number
    if (val < 0.1) val = 0.1; // Clamp the value to 0.1 minimum
    if (val > 10) val = 10; // Clamp the value to 10 maximum

    if (timeoutId.current) clearTimeout(timeoutId.current);

    setTimeout(() => {
      dispatch(
        customActions.handleAnimationState({
          action: "duration",
          value: val,
        })
      );
    }, 8);
  }

  return (
    <div className="flex items-center gap-2 mt-7">
      <p className="text-white">Duration</p>{" "}
      <input
        type="range"
        min={0.1}
        max={10}
        step={0.1}
        value={duration}
        onChange={handleDuration}
      />
      <p className="text-lg font-semibold text-white">{duration}s</p>
      {/* <input
        className="w-10 p-1 text-xl text-white border-2 rounded-md outline-none bg-slate-800 border-zinc-950"
        type="number"
        placeholder="0.1"
        onChange={handleDuration}
        defaultValue={duration}
      /> */}
    </div>
  );
}
