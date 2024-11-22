import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { customActionsDD } from "../../../../store/customDDSlicer";
import { uiActions } from "../../../../store/uiSlicer";
import { customActions } from "../../../../store/customSlicer";

export default function Position({ type, positionStyles }) {
  const dispatch = useDispatch();
  const {
    isAnimationCreatedDD,
    positionDD,
    isAnimationCreated,
    position,
    isDragDrop,
    isAnimating,
  } = useSelector(
    (state) => ({
      isAnimationCreatedDD: state.customDD.isAnimationCreatedDD,
      positionDD: state.customDD.positionDD,

      position: state.custom.position,
      isAnimationCreated: state.custom.isAnimationCreated,

      isDragDrop: state.ui.isDragDrop,
      isAnimating: state.ui.isAnimating,
    }),
    shallowEqual
  );

  function handlePosition() {
    if (isDragDrop && positionDD === type) return;
    else if (!isDragDrop && position === type) return;

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
      dispatch(customActions.handleStartPosition(type));
    }
  }

  // Handle position styles based on isDragDrop
  let isDisabled;
  let isEnabled;
  if (isDragDrop) {
    isDisabled = isAnimationCreatedDD;
    isEnabled = positionDD === type;
  } else {
    isDisabled = isAnimationCreated;
    isEnabled = position === type;
  }

  return (
    <>
      <div
        className={`absolute w-5 h-5 rounded-full cursor-pointer ${positionStyles} transition-colors duration-200 ${
          isEnabled
            ? "bg-pink-950 hover:bg-pink-950"
            : isDisabled
            ? "bg-zinc-950 hover:bg-pink-200"
            : "bg-gray-500 hover:bg-gray-200"
        }`}
        onClick={handlePosition}
      ></div>
    </>
  );
}
