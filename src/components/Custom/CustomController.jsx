import CustomStartPositionSelector from "./CustomStartPositionSelector";
import { uiActions } from "../../uiSlicer";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import PlayAnimationBtn from "../Utils/MainPlayButton";
import ResetAnimationBtn from "../Utils/MainResetAnimationButton";
import { customActions } from "../../customSlicer";

export default function CustomController() {
  const dispatch = useDispatch();
  const { isAnimationCreated, isAnimating } = useSelector((state) => {
    return {
      isAnimationCreated: state.custom.isAnimationCreated,
      isAnimating: state.ui.isAnimating,
    };
  }, shallowEqual);

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

  return (
    <>
      <CustomStartPositionSelector />
      <PlayAnimationBtn
        handlePlayAnimation={handlePlayAnimation}
        active={isAnimationCreated}
      />
      <ResetAnimationBtn
        handleResetAnimation={handleResetAnimation}
        active={!isAnimationCreated}
      />
    </>
  );
}
