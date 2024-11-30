import Color from "./Controls/Color";
import Opacity from "./Controls/Opacity";
import Rotate from "./Controls/Rotate";
import Scale from "./Controls/Scale";
import { useDispatch } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { throttle } from "lodash";
import Duration from "./Controls/Duration";

export default function Controls() {
  const dispatch = useDispatch();

  const handleRotate = throttle((e) => {
    const value = +e.target.value;
    dispatch(customActions.handleStyles({ action: "set-rotate", value }));
  }, 8);

  const handleOpacity = throttle((e) => {
    const value = +e.target.value;
    dispatch(customActions.handleStyles({ action: "set-opacity", value }));
  }, 8);

  const handleDuration = throttle((e) => {
    let val = parseFloat(e.target.value); // Parse the input as a number
    if (isNaN(val)) val = 0.1; // Default to 0.1 if input is not a number
    if (val < 0.1) val = 0.1; // Clamp the value to 0.1 minimum
    if (val > 10) val = 10; // Clamp the value to 10 maximum
    dispatch(
      customActions.handleAnimationState({
        action: "duration",
        value: val,
      })
    );
  }, 8);

  const handleColor = throttle((e) => {
    const { value } = e.target;
    dispatch(customActions.handleStyles({ action: "set-color", value }));
  }, 8);

  const handleScale = throttle((e) => {
    const value = +e.target.value;
    dispatch(customActions.handleStyles({ action: "set-scale", value }));
  }, 8);

  return (
    <>
      <div className="flex flex-col gap-1 mt-5">
        <Color handleColor={handleColor} />
        <Scale handleScale={handleScale} />
        <Opacity handleOpacity={handleOpacity} />
        <Rotate handleRotate={handleRotate} />
        <Duration handleDuration={handleDuration} />
      </div>
    </>
  );
}
