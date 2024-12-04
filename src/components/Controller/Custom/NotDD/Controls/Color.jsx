import { useRef } from "react";
import { useSelector } from "react-redux";

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
    const bgOp = opacityEl.current.value;
    const bgC = colorEl.current.value;

    handleStyle(
      { target: { value: { color: bgC, opacity: bgOp } } },
      "set-background-color"
    );
  }

  return (
    <>
      <div className="control-container ">
        <p>Fill</p>
        <div className="control-input-container">
          <input
            ref={colorEl}
            onChange={handleInput}
            value={color}
            type="color"
          />
          <p className="text-main-t-gray-active">{color}</p>
          <input
            onChange={handleInput}
            ref={opacityEl}
            type="range"
            min={0.01}
            max={1}
            step={0.01}
            value={bgOpacity}
          />
        </div>
      </div>
    </>
  );
}
