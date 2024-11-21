import { uiActions } from "../../../store/uiSlicer";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import PlayAnimationBtn from "../Static/PlayAnimationBtn";
import ResetAnimationBtn from "../Static/ResetAnimationBtn";
import { customActionsDD } from "../../../store/customDDSlicer";
import { useEffect } from "react";

export default function PlayResetDDBTN() {
  const dispatch = useDispatch();
  const { isAnimationCreatedDD, isAnimating, isResizing } = useSelector(
    (state) => {
      return {
        isAnimationCreatedDD: state.customDD.isAnimationCreatedDD,
        isAnimating: state.ui.isAnimating,
        isResizing: state.ui.isResizing,
      };
    },
    shallowEqual
  );

  function handlePlayAnimation() {
    if (isAnimating || !isAnimationCreatedDD) return;
    dispatch(uiActions.handleIsAnimating(true));
  }
  function handleResetAnimation() {
    if (!isAnimationCreatedDD) return;
    dispatch(uiActions.handleResetAnimationAlert(true));
    if (isAnimating) dispatch(uiActions.handleIsAnimating(false));
    dispatch(customActionsDD.handleAnimation({ action: "reset-animation" }));
  }

  useEffect(() => {
    if (isResizing && isAnimating) dispatch(uiActions.handleIsAnimating(false));
  }, [isResizing]);

  return (
    <>
      <PlayAnimationBtn
        handlePlayAnimation={handlePlayAnimation}
        active={isAnimationCreatedDD && !isResizing}
      />
      <ResetAnimationBtn
        handleResetAnimation={handleResetAnimation}
        active={isResizing || !isAnimationCreatedDD}
      />
    </>
  );
}
