import { useDispatch, useSelector } from "react-redux";
import { customActionsDD } from "../../../../store/customDDSlicer";
import { uiActions } from "../../../../store/uiSlicer";
import { customActions } from "../../../../store/customSlicer";

export default function Position({ type, positionStyles }) {
  const dispatch = useDispatch();

  const positionDD = useSelector((state) => state.customDD.positionDD);
  const isAnimationCreatedDD = useSelector(
    (state) => state.customDD.isAnimationCreatedDD
  );

  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const keyFrames = useSelector((state) => state.custom.keyFrames);
  const isAnimationCreated = useSelector(
    (state) => state.custom.isAnimationCreated
  );

  const isDragDrop = useSelector((state) => state.ui.isDragDrop);
  const isAnimating = useSelector((state) => state.ui.isAnimating);

  function handlePosition() {
    if (isDragDrop && positionDD === type) return;
    else if (!isDragDrop && keyFrames[activeKeyFrame].position === type) return;

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
      dispatch(
        customActions.handleSetPosition({
          action: "set-new",
          pos: type,
        })
      );
    }
  }

  // Handle position styles based on isDragDrop
  let isDisabled;
  let isHighLight;
  if (isDragDrop) {
    isDisabled = isAnimationCreatedDD;
    isHighLight = positionDD === type;
  } else {
    const pos = keyFrames[activeKeyFrame].position;
    isDisabled = isAnimationCreated;
    isHighLight = pos === type;
  }

  return (
    <>
      <div
        className={`absolute w-5 h-5 rounded-full ${positionStyles} transition-colors duration-200 ${
          isHighLight
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
