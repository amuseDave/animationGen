import { useSelector, useDispatch } from "react-redux";

import { customActions } from "../../../../../store/customSlicer";
import { useRef } from "react";

export default function Color() {
  const dispatch = useDispatch();
  const timeoutId = useRef();
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const color = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].color
  );

  function handleColor(e) {
    const { value } = e.target;

    if (timeoutId.current) clearTimeout(timeoutId.current);

    setTimeout(() => {
      dispatch(customActions.handleStyles({ action: "set-color", value }));
    }, 8);
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-white">Color:</p>{" "}
      <input onChange={handleColor} value={color} type="color" />
    </div>
  );
}
