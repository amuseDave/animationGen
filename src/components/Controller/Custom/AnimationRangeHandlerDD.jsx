import AnimationRangeControl from "../Static/AnimationRangeControl";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { customActionsDD } from "../../../store/customDDSlicer";
import { uiActions } from "../../../store/uiSlicer";
import { useRef } from "react";

export default function AnimationRangeHandlerDD() {
  const dispatch = useDispatch();
  const timeoutId = useRef();
  const { square, animationIndex, isAnimating } = useSelector((state) => {
    return {
      square: state.customDD.square,
      animationIndex: state.customDD.square.animationIndex,
      isAnimating: state.ui.isAnimating,
    };
  }, shallowEqual);

  console.log(animationIndex);

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
    <AnimationRangeControl
      value={square.animationIndex}
      max={square.animations.length}
      handleAnimationRange={handleAnimation}
      className={"mt-10"}
    />
  );
}
