import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { customActions } from "../../../customSlicer";
import { uiActions } from "../../../uiSlicer";

export default function Position({ type, positionStyles }) {
  const dispatch = useDispatch();
  const { isAnimationCreated, position, isAnimating } = useSelector(
    (state) => ({
      isAnimationCreated: state.custom.isAnimationCreated,
      position: state.custom.position,
      isAnimating: state.ui.isAnimating,
    }),
    shallowEqual
  );

  function handlePosition() {
    if (position === type) return;
    if (isAnimationCreated) {
      const reset = window.confirm("Reset Animation Starting Position?");
      if (!reset) return;

      dispatch(uiActions.handleResetAnimationAlert(true));
      if (isAnimating) dispatch(uiActions.handleIsAnimating(false));
      dispatch(customActions.handleAnimation({ action: "reset-animation" }));
      dispatch(
        customActions.handleSetPositions({ actionType: "set-position", type })
      );
      return;
    }

    dispatch(
      customActions.handleSetPositions({ actionType: "set-position", type })
    );
  }

  return (
    <>
      <div
        className={`absolute w-4 h-4 rounded-full cursor-pointer ${positionStyles} transition-colors ${
          position === type
            ? "bg-purple-950 hover:bg-purple-950"
            : isAnimationCreated
            ? "bg-gray-950 hover:bg-gray-400"
            : "bg-gray-500 hover:bg-gray-200"
        }`}
        onClick={handlePosition}
      ></div>
    </>
  );
}
