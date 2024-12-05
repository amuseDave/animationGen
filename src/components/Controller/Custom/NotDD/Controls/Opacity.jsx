import { useSelector } from "react-redux";
import eye from "../../../../../assets/svgs/eye.svg";
import { handleValueInputs } from "../../../../../utils/helper";
import { useRef } from "react";

export default function Opacity({ handleStyle }) {
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const inputEl = useRef();

  const opacity = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].opacity
  );

  return (
    <div className="control-container">
      <p>Opacity</p>
      <div className="control-input-container">
        <div
          onClick={() => {
            inputEl.current.focus();
          }}
          className="flex items-center w-full"
        >
          <div
            style={{ opacity: opacity / 100 }}
            className="bg-white control-square"
          ></div>
          <input
            ref={inputEl}
            className="control-value-input control-main-color"
            style={{ width: `${`${opacity}`.length * 8 + 5}px` }}
            value={opacity}
            onChange={(e) => {
              const value = handleValueInputs(e.target.value, 100);
              console.log(value);
              if (isNaN(value)) return;
              handleStyle({ target: { value } }, "set-opacity");
            }}
          />
          <p className="control-main-color">%</p>
        </div>

        <img src={eye} className="ml-auto mr-1" />
      </div>
    </div>
  );
}
