import { useSelector } from "react-redux";
import eye from "../../../../../assets/svgs/eye.svg";
import { handleValueInputs } from "../../../../../utils/helper";

export default function Opacity({ handleStyle }) {
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const opacity = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].opacity
  );

  console.log(opacity);

  console.log(opacity.length * 8 + 7);

  return (
    <div className="control-container">
      <p>Opacity</p>
      <div className="control-input-container">
        <div
          style={{ opacity: opacity / 100 }}
          className="bg-white control-square"
        ></div>
        <input
          className="control-value-input control-main-color"
          style={{ width: `${opacity.length * 8 + 5}px` }}
          value={opacity}
          onChange={(e) => {
            const value = handleValueInputs(e.target.value, 100);
            console.log(value);

            if (isNaN(value)) return;
            handleStyle({ target: { value } }, "set-opacity");
          }}
        />
        <p className="control-main-color">%</p>

        <img src={eye} className="ml-auto mr-1" />
      </div>
    </div>
  );
}
