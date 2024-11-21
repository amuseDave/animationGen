import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { customActionsDD } from "../../store/customDDSlicer";
import { uiActions } from "../../store/uiSlicer";

export default function Position({ type, positionStyles }) {
  const dispatch = useDispatch();
  const { isAnimationCreatedDD, positionDD, isAnimating, isDragDrop } =
    useSelector(
      (state) => ({
        isAnimationCreatedDD: state.customDD.isAnimationCreatedDD,
        positionDD: state.customDD.positionDD,
        isAnimating: state.ui.isAnimating,
        isDragDrop: state.ui.isDragDrop,
      }),
      shallowEqual
    );

  function handlePosition() {
    if (positionDD === type && isDragDrop) return;
    else if ("simplePos" === type && !isDragDrop) return;

    // Drag&Drop Position Selector
    if (isDragDrop) {
      if (isAnimationCreatedDD) {
        const reset = window.confirm("Reset Animation Starting Position?");
        if (!reset) return;

        dispatch(uiActions.handleResetAnimationAlert(true));
        if (isAnimating) dispatch(uiActions.handleIsAnimating(false));
        dispatch(
          customActionsDD.handleAnimation({ action: "reset-animation" })
        );
        dispatch(
          customActionsDD.handleSetPositions({
            actionType: "set-position",
            type,
          })
        );
        return;
      }

      dispatch(
        customActionsDD.handleSetPositions({ actionType: "set-position", type })
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
            : isAnimationCreatedDD
            ? "bg-gray-950 hover:bg-gray-400"
            : "bg-gray-500 hover:bg-gray-200"
        }`}
        onClick={handlePosition}
      ></div>
    </>
  );
}
