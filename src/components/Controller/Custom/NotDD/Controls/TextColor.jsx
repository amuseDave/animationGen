import { useRef } from "react";
import { useSelector } from "react-redux";

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
    const textOp = opacityEl.current.value;
    const textC = colorEl.current.value;

    handleStyle(
      { target: { value: { color: textC, opacity: textOp } } },
      "set-text-color"
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <p className="text-white">Text Color:</p>{" "}
        <input
          ref={colorEl}
          onChange={handleInput}
          value={color}
          type="color"
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-left text-white">Text opacity</p>
        <input
          onChange={handleInput}
          ref={opacityEl}
          type="range"
          min={0.01}
          max={1}
          step={0.01}
          value={textOpacity}
        />
      </div>
    </>
  );
}
