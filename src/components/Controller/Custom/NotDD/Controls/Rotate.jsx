import { useSelector } from "react-redux";
import rotateLeft from "../../../../../assets/svgs/rotate-left .svg";
import rotateSvg from "../../../../../assets/svgs/rotate.svg";
import { handleTranslateInputs } from "../../../../../utils/helper";
import { useRef } from "react";

export default function Rotate({ handleStyle }) {
  const inputEl = useRef();
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const rotate = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].rotate
  );

  return (
    <div className="control-container">
      <p className="">Rotate</p>

      <div className="control-input-container control-main-color">
        <div
          onClick={() => {
            inputEl.current.focus();
          }}
          className="flex items-center w-full"
        >
          <img src={rotateLeft} className="mx-1" />
          <input
            ref={inputEl}
            className="control-value-input"
            onChange={(e) => {
              const val = handleTranslateInputs(e.target.value.trim(), 980);

              if (isNaN(val)) return;

              handleStyle({ target: { value: val } }, "set-rotate");
            }}
            style={{
              width: `${`${rotate}`.length * 10 + 2}px`,
            }}
            value={rotate}
          />
          °
        </div>

        <img
          onClick={() => handleStyle({ target: { value: 0 } }, "set-rotate")}
          src={rotateSvg}
          className="w-5 h-5 ml-auto mr-1"
        />
      </div>
    </div>
  );
}
