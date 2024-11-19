import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { customActions } from "../../customSlicer";
import { uiActions } from "../../uiSlicer";

export default function Position({ type, positionStyles }) {
  const dispatch = useDispatch();
  const { isAnimationCreated, position } = useSelector(
    (state) => ({
      isAnimationCreated: state.custom.isAnimationCreated,
      position: state.custom.position,
    }),
    shallowEqual
  );

  function handlePosition() {
    if (position === type) return;
    if (isAnimationCreated) {
      const reset = window.confirm("Reset Animation Starting Position?");
      if (!reset) return;

      dispatch(uiActions.handleResetAnimationAlert(true));
      dispatch(customActions.handleAnimation({ action: "reset" }));
      dispatch(
        customActions.handlePositions({
          action: "set-position",
          position: type,
        })
      );
      return;
    }

    dispatch(
      customActions.handlePositions({ action: "set-position", position: type })
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
