import CustomStartPositionSelector from "./CustomStartPositionSelector";
import { uiActions } from "../../store/uiSlicer";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import PlayAnimationBtn from "../Utils/MainPlayButton";
import ResetAnimationBtn from "../Utils/MainResetAnimationButton";
import { customActionsDD } from "../../store/customDDSlicer";
import { useEffect } from "react";
import CustomDDBtn from "./CustomDDBtn";

export default function CustomController() {
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

  console.log(isAnimationCreatedDD);

  return (
    <>
      <h1 className="pb-2 text-2xl text-center border-b-2 border-b-pink-100">
        Custom Controller
      </h1>

      <CustomStartPositionSelector />

      <CustomDDBtn />
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
