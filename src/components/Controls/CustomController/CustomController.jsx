import CustomStartPositionSelector from "./CustomStartPositionSelector";
import { uiActions } from "../../../uiSlicer";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import PlayAnimationBtn from "../Utils/PlayAnimationBtn";

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

  return (
    <>
      <CustomStartPositionSelector />
      <PlayAnimationBtn
        handlePlayAnimation={handlePlayAnimation}
        active={isAnimationCreated}
      />
    </>
  );
}
