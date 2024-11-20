import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { customActions } from "../../customSlicer";
import { uiActions } from "../../uiSlicer";

export default function Position({ type, positionStyles }) {
  const dispatch = useDispatch();
  const { isAnimationCreated, positionDD, isAnimating, isDragDrop } =
    useSelector(
      (state) => ({
        isAnimationCreated: state.custom.isAnimationCreated,
        positionDD: state.custom.positionDD,
        isAnimating: state.ui.isAnimating,
        isDragDrop: state.custom.isDragDrop,
      }),
      shallowEqual
    );

  function handlePosition() {
    if (positionDD === type) return;

    // Drag&Drop Position Selector
    if (isDragDrop) {
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

    if (!isDragDrop) {
      console.log("handle not dd position selector");
    }
  }

  return (
    <>
      <div
        className={`absolute w-5 h-5 rounded-full cursor-pointer ${positionStyles} transition-colors ${
          positionDD === type
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
