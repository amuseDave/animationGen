import { useSelector, useDispatch, shallowEqual } from "react-redux";
import PositionSelector from "./PositionSelector";
import { customActions } from "../../customSlicer";

export default function Controller() {
  const dispatch = useDispatch();
  const { type, isAnimationCreated, isAnimating, isResizing } = useSelector(
    (state) => {
      return {
        type: state.ui.type,
        isAnimationCreated: state.custom.isAnimationCreated,
        isAnimating: state.custom.isAnimating,
        isResizing: state.ui.isResizing,
      };
    },
    shallowEqual
  );

  function handlePlayAnimation() {
    if (!isAnimationCreated || isAnimating || isResizing) {
      return;
    }
    dispatch(
      customActions.handleAnimation({
        action: "setAnimating",
        isAnimating: true,
      })
    );
  }

  return (
    <div className="relative px-3 py-5 rounded-lg bg-zinc-900">
      {type === "custom" && <PositionSelector />}

      <button
        onClick={handlePlayAnimation}
        className={`
          absolute text-pink-100 rounded-md font-light text-lg bg-pink-950 bc bottom-5 py-1 text-center w-40 
          ${
            !isAnimationCreated ||
            (isResizing && "cursor-not-allowed opacity-25")
          }`}
      >
        Play Animation
      </button>
    </div>
  );
}
