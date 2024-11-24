import { useSelector, useDispatch } from "react-redux";
import { customActionsDD } from "../../../../store/customDDSlicer";
import { uiActions } from "../../../../store/uiSlicer";
import { useRef } from "react";

export default function AnimationRangeHandlerDD() {
  const dispatch = useDispatch();
  const timeoutId = useRef();
  const square = useSelector((state) => state.customDD.square);
  const isAnimating = useSelector((state) => state.ui.isAnimating);

  function handleAnimation(e) {
    const index = +e.target.value;
    if (typeof index !== "number") return;

    if (timeoutId) clearTimeout(timeoutId);
    if (isAnimating) dispatch(uiActions.handleIsAnimating(false));

    timeoutId.current = setTimeout(() => {
      dispatch(
        customActionsDD.handleAnimation({
          animationIndex: index,
          action: "set-index",
        })
      );
    }, 8);
  }

  return (
    <input
      className="flex-grow"
      onChange={handleAnimation}
      id="animation"
      name="animation"
      type="range"
      min="0"
      value={square.animationIndex}
      max={square.animations.length - 1}
    />
  );
}
