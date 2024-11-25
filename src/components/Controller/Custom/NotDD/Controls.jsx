import { useSelector, useDispatch } from "react-redux";

import { customActions } from "../../../../store/customSlicer";

export default function Controls() {
  const dispatch = useDispatch();
  console.log("rendering");
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const color = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].color
  );
  const opacity = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].opacity
  );
  const scale = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].scale
  );

  function handleColor(e) {
    const { value } = e.target;
    dispatch(customActions.handleStyles({ action: "set-color", value }));
  }
  function handleOpacity(e) {
    const { value } = e.target;
    dispatch(customActions.handleStyles({ action: "set-opacity", value }));
  }
  function handleScale(e) {
    const { value } = e.target;
    dispatch(customActions.handleStyles({ action: "set-scale", value }));
  }

  return (
    <>
      {/* Style Values Container */}
      <div className="flex flex-col gap-2 mt-10">
        {/* Color control */}
        <div className="flex items-center gap-2">
          <p className="text-white">Color:</p>{" "}
          <input onChange={handleColor} value={color} type="color" />
        </div>

        {/* Opacity control */}
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

        {/* Scale control */}
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
      </div>
    </>
  );
}
