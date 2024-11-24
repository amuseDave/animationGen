import { uiActions } from "../../../../store/uiSlicer";
import { useSelector, useDispatch } from "react-redux";

import { customActionsDD } from "../../../../store/customDDSlicer";
import { useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function PlayResetDDBTN() {
  const dispatch = useDispatch();

  const isAnimating = useSelector((state) => state.ui.isAnimating);
  const isResizing = useSelector((state) => state.ui.isResizing);
  const isAnimationCreatedDD = useSelector(
    (state) => state.customDD.isAnimationCreatedDD
  );

  function handlePlayAnimation() {
    if (!isAnimationCreatedDD) return;

    if (isAnimating) dispatch(uiActions.handleIsAnimating(false));
    else dispatch(uiActions.handleIsAnimating(true));
  }
  function handleResetAnimation() {
    if (!isAnimationCreatedDD) return;
    const confirm = window.confirm("Are you sure you want to reset?");
    if (!confirm) return;

    dispatch(uiActions.handleResetAnimationAlert(true));
    if (isAnimating) dispatch(uiActions.handleIsAnimating(false));
    dispatch(customActionsDD.handleAnimation({ action: "reset-animation" }));
  }

  useEffect(() => {
    if (isResizing && isAnimating) dispatch(uiActions.handleIsAnimating(false));
  }, [isResizing]);

  const playPauseClass = `text-purple-500 ${
    !(isAnimationCreatedDD && !isResizing)
      ? "cursor-not-allowed opacity-25"
      : "cursor-none"
  } -order-1`;

  return (
    <>
      {isAnimating ? (
        <Pause
          onClick={handlePlayAnimation}
          size={32}
          className={playPauseClass}
        />
      ) : (
        <Play
          onClick={handlePlayAnimation}
          size={32}
          className={playPauseClass}
        />
      )}

      <RotateCcw
        size={32}
        strokeWidth={1.5}
        onClick={handleResetAnimation}
        className={`text-purple-900 ${
          isResizing || !isAnimationCreatedDD
            ? "cursor-not-allowed opacity-25"
            : "cursor-none"
        }`}
      />
    </>
  );
}
