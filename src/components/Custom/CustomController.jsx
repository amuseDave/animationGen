import CustomStartPositionSelector from "./CustomStartPositionSelector";
import { uiActions } from "../../uiSlicer";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import PlayAnimationBtn from "../Utils/MainPlayButton";
import ResetAnimationBtn from "../Utils/MainResetAnimationButton";
import { customActions } from "../../customSlicer";
import { useEffect } from "react";
import CustomDDBtn from "./CustomDDBtn";

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
      <h1 className="pb-2 text-2xl text-center border-b-2 border-b-pink-100">
        Custom Controller
      </h1>

      <CustomStartPositionSelector />

      <CustomDDBtn />
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
