import CustomStartPositionSelector from "./CustomStartPositionSelector";
import { uiActions } from "../../uiSlicer";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import PlayAnimationBtn from "../Utils/MainPlayButton";
import ResetAnimationBtn from "../Utils/MainResetAnimationButton";
import { customActions } from "../../customSlicer";
import { useEffect } from "react";

export default function CustomController() {
  const dispatch = useDispatch();
  const { isAnimationCreated, isAnimating, isResizing } = useSelector(
    (state) => {
      return {
        isAnimationCreated: state.custom.isAnimationCreated,
        isAnimating: state.ui.isAnimating,
        isResizing: state.ui.isResizing,
      };
    },
    shallowEqual
  );

  function handlePlayAnimation() {
    if (isAnimating || !isAnimationCreated) return;
    dispatch(uiActions.handleIsAnimating(true));
  }
  function handleResetAnimation() {
    if (!isAnimationCreated) return;
    dispatch(uiActions.handleResetAnimationAlert(true));
    if (isAnimating) dispatch(uiActions.handleIsAnimating(false));
    dispatch(customActions.handleAnimation({ action: "reset-animation" }));
  }

  useEffect(() => {
    if (isResizing && isAnimating) dispatch(uiActions.handleIsAnimating(false));
  }, [isResizing]);

  return (
    <>
      <h1 className="text-2xl text-center">Custom Controller</h1>
      <CustomStartPositionSelector />
      <PlayAnimationBtn
        handlePlayAnimation={handlePlayAnimation}
        active={isAnimationCreated && !isResizing}
      />
      <ResetAnimationBtn
        handleResetAnimation={handleResetAnimation}
        active={isResizing || !isAnimationCreated}
      />
    </>
  );
}
