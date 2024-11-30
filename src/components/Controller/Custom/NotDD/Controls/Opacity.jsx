import { useSelector, useDispatch } from "react-redux";

import { customActions } from "../../../../../store/customSlicer";
import { useRef } from "react";
export default function Opacity() {
  const dispatch = useDispatch();
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const timeoutId = useRef();

  const opacity = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].opacity
  );

  function handleOpacity(e) {
    const value = +e.target.value;

    if (timeoutId.current) clearTimeout(timeoutId.current);

    setTimeout(() => {
      dispatch(customActions.handleStyles({ action: "set-opacity", value }));
    }, 8);
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-white">Opacity:</p>{" "}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={opacity}
        onChange={handleOpacity}
      />
    </div>
  );
}
