import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";

import { customActions } from "../../../../../store/customSlicer";

export default function Scale() {
  const dispatch = useDispatch();
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const timeoutId = useRef();

  const scale = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].scale
  );

  function handleScale(e) {
    const value = +e.target.value;
    if (timeoutId.current) clearTimeout(timeoutId.current);

    setTimeout(() => {
      dispatch(customActions.handleStyles({ action: "set-scale", value }));
    }, 8);
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-white">Scale</p>
      <input
        onChange={handleScale}
        type="range"
        min={0}
        max={3}
        value={scale}
        step={0.05}
      />
    </div>
  );
}
