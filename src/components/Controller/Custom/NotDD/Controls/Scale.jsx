import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../../../../store/customSlicer";
import { handleValueScaleInputs } from "../../../../../utils/helper";
import linkSvg from "../../../../../assets/svgs/link.svg";
import { useRef } from "react";

export default function Scale() {
  const dispatch = useDispatch();

  const inputHEl = useRef();
  const inputWEl = useRef();
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const scaleX = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].scaleX
  );
  const scaleY = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].scaleY
  );
  function handleScaleChange(e, type) {
    let { value: val } = e.target;
    const value = handleValueScaleInputs(val, 5);
    if (isNaN(value) || value.length > 4) return;

    dispatch(customActions.handleScale({ type, value }));
  }

  return (
    <div className="control-container">
      <p>Scale</p>

      <div className="control-input-container control-main-color">
        <div
          onClick={() => inputWEl.current.focus()}
          className="flex items-center w-[46%]"
        >
          <div className="control-square-box">
            <p>w</p>
          </div>
          <input
            ref={inputWEl}
            style={{ width: `${`${scaleX}`.length * 7 + 4}px` }}
            value={scaleX}
            className="control-value-input"
            onChange={(e) => handleScaleChange(e, "x")}
          />
          <p>x</p>
        </div>
        <div
          onClick={() => inputHEl.current.focus()}
          className="flex items-center w-[45%]"
        >
          <div className="control-square-box no-left-margin">
            <p>h</p>
          </div>
          <input
            ref={inputHEl}
            style={{ width: `${`${scaleY}`.length * 7 + 4}px` }}
            value={scaleY}
            className="control-value-input"
            onChange={(e) => {
              handleScaleChange(e, "y");
            }}
          />
          <p>x</p>
        </div>

        <img src={linkSvg} className="w-5 h-5 ml-0 ml-auto mr-1 gap-x-0 " />
      </div>
    </div>
  );
}
