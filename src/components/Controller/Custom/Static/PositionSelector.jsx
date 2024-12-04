import { useDispatch, useSelector } from "react-redux";
import { customActionsDD } from "../../../../store/customDDSlicer";
import { customActions } from "../../../../store/customSlicer";

export default function Position({ type, positionStyles }) {
  const dispatch = useDispatch();

  const positionDD = useSelector((state) => state.customDD.positionDD);
  const isAnimationCreatedDD = useSelector(
    (state) => state.customDD.isAnimationCreatedDD
  );

  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const position = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].position
  );

  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  function handlePosition() {
    if (isDragDrop && positionDD === type) return;
    else if (!isDragDrop && position === type) return;

    // Drag&Drop Position Selector
    if (isDragDrop) {
      if (isAnimationCreatedDD) {
        const reset = window.confirm("Reset Animation Starting Position?");
        if (!reset) return;

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
    isHighLight = position === type;
  }

  return (
    <>
      <div
        className={`position-selector ${positionStyles} ${
          isHighLight
            ? "position-selector-active"
            : isDisabled && "bg-zinc-950 hover:bg-[#e4ff4b]"
        } `}
        onClick={handlePosition}
      ></div>
    </>
  );
}
