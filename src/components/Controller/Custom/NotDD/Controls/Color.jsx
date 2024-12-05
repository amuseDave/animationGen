import { useRef } from "react";
import { useSelector } from "react-redux";
import { handleValueInputs } from "../../../../../utils/helper";

export default function Color({ handleStyle }) {
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const colorEl = useRef();
  const opacityEl = useRef();
  const color = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].backgroundColor
  );
  const bgOpacity = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].bgOpacity
  );

  function handleInput() {
    let bgOp = opacityEl.current.value;
    const bgC = colorEl.current.value;

    bgOp = handleValueInputs(bgOp, 100);
    if (isNaN(bgOp)) return;

    handleStyle(
      { target: { value: { color: bgC, opacity: bgOp } } },
      "set-background-color"
    );
  }

  return (
    <>
      <div className="control-container">
        <p>Fill</p>
        <div className="control-input-container">
          <div className="relative control-color-input-container">
            <div
              style={{ backgroundColor: color }}
              className="absolute top-0 left-0 z-0 control-square"
            ></div>
            <input
              ref={colorEl}
              onChange={handleInput}
              value={color}
              type="color"
            />
          </div>
          <p className="translate-x-1 control-main-color control-text">
            {color}
          </p>
          <div className="control-separator"></div>
          <div className="flex items-center">
            <input
              style={{
                width: `${`${bgOpacity}`.length * 8 + 7}px`,
              }}
              className="control-value-input"
              onChange={handleInput}
              ref={opacityEl}
              value={bgOpacity}
            />
            <p className="mr-1">%</p>
          </div>
        </div>
      </div>
    </>
  );
}
