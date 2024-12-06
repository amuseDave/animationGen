import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { handleValueScaleInputs } from "../../../../utils/helper";
import timerSvg from "../../../../assets/svgs/timer.svg";

export default function Duration() {
  const dispatch = useDispatch();
  const duration = useSelector((state) => state.custom.duration);

  function handleDuration(e) {
    const { value } = e.target;
    let val = handleValueScaleInputs(value, 10);
    if (val.length > 3 || isNaN(val)) return;
    if (val.length === 3 && val.endsWith(".")) return;

    dispatch(
      customActions.handleAnimationState({ action: "duration", value: val })
    );
  }

  return (
    <div className="preview-controller-box-item">
      <img src={timerSvg} className="mr-[6px]" />
      <input
        onBlur={() => {
          if (duration < 0.1) {
            dispatch(
              customActions.handleAnimationState({
                action: "duration",
                value: 0.1,
              })
            );
          }
        }}
        style={{
          width: `${`${duration}`.length * 7 + 3}px`,
        }}
        className="preview-controller-value-input"
        value={duration}
        onChange={handleDuration}
      />
      s
    </div>
  );
}
