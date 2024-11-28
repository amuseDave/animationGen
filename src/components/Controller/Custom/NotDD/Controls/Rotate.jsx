import { useSelector, useDispatch } from "react-redux";

import { customActions } from "../../../../../store/customSlicer";

export default function Rotate() {
  const dispatch = useDispatch();
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const rotate = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].rotate
  );

  function handleRotate(e) {
    const { value } = e.target;
    dispatch(customActions.handleStyles({ action: "set-rotate", value }));
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-white">Rotate</p>
      <input
        onChange={handleRotate}
        type="range"
        min={0}
        max={720}
        value={rotate}
        step={1}
      />
    </div>
  );
}
