import { useSelector } from "react-redux";
import rotateLeft from "../../../../../assets/svgs/rotate-left .svg";
import rotateSvg from "../../../../../assets/svgs/rotate.svg";
import { handleTranslateInputs } from "../../../../../utils/helper";

export default function Rotate({ handleStyle }) {
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const rotate = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].rotate
  );

  return (
    <div className="control-container">
      <p className="">Rotate</p>

      <div className="control-input-container control-main-color">
        <div className="flex items-center">
          <img src={rotateLeft} className="mx-1" />

          <input
            className="control-value-input"
            onChange={(e) => {
              const val = handleTranslateInputs(e.target.value.trim(), 980);
              console.log(val);

              if (isNaN(val)) return;

              handleStyle({ target: { value: val } }, "set-rotate");
            }}
            style={{
              width: `${`${rotate}`.length * 8 + 7}px`,
            }}
            value={rotate}
          />
        </div>

        <img src={rotateSvg} className="w-5 h-5 ml-auto mr-1" />
      </div>
    </div>
  );
}
