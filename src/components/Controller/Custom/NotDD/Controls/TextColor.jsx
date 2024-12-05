import { useRef } from "react";
import { useSelector } from "react-redux";
import { handleValueInputs } from "../../../../../utils/helper";

export default function TextColor({ handleStyle }) {
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const colorEl = useRef();
  const opacityEl = useRef();

  const color = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].textColor
  );
  const textOpacity = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].textOpacity
  );

  function handleInput() {
    let textOp = opacityEl.current.value;
    const textC = colorEl.current.value;

    textOp = handleValueInputs(textOp, 100);
    if (isNaN(textOp)) return;

    handleStyle(
      { target: { value: { color: textC, opacity: textOp } } },
      "set-text-color"
    );
  }

  return (
    <>
      <div className="control-container">
        <p>Font</p>
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
              style={{ width: `${textOpacity.length * 8 + 7}px` }}
              className="control-value-input"
              onChange={handleInput}
              ref={opacityEl}
              value={textOpacity}
            />{" "}
            <p className="mr-1">%</p>
          </div>
        </div>
      </div>
    </>
  );
}
