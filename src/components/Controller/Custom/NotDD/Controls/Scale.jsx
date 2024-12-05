import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../../../../store/customSlicer";
import { handleValueScaleInputs } from "../../../../../utils/helper";

export default function Scale() {
  const dispatch = useDispatch();
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
    <div className="control-container control-main-color">
      <p>Scale</p>

      <div className="control-input-container">
        <div className="flex items-center">
          <div className="control-square-box">
            <p>w</p>
          </div>
          <input
            style={{ width: `${`${scaleX}`.length * 7 + 4}px` }}
            value={scaleX}
            className="control-value-input"
            onChange={(e) => {
              handleScaleChange(e, "x");
            }}
          />
          <p>x</p>
        </div>
        <div className="flex items-center ml-3">
          <div className="control-square-box">
            <p>h</p>
          </div>
          <input
            style={{ width: `${`${scaleY}`.length * 7 + 4}px` }}
            value={scaleY}
            className="control-value-input"
            onChange={(e) => {
              handleScaleChange(e, "y");
            }}
          />
          <p>x</p>
        </div>
      </div>
    </div>
  );
}
