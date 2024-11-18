import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { customActions } from "../../customSlicer";
import { uiActions } from "../../uiSlicer";

export default function Position({ type, positionStyles }) {
  const dispatch = useDispatch();
  const { isAnimating, position } = useSelector(
    (state) => ({
      isAnimating: state.custom.isAnimating,
      position: state.custom.position,
    }),
    shallowEqual
  );

  function handlePosition() {
    if (isAnimating) {
      const reset = window.confirm("Reset Animation?");

      if (!reset) return;
      dispatch(uiActions.setReset());
      dispatch(customActions.resetAnimation());

      return;
    }

    if (position === type) return;

    dispatch(customActions.updatePosition(type));
  }

  return (
    <>
      <div
        className={`absolute w-4 h-4 rounded-full cursor-pointer ${positionStyles} transition-colors ${
          position === type
            ? "bg-purple-950 hover:bg-purple-950"
            : "bg-purple-500 hover:bg-pink-950"
        }`}
        onClick={handlePosition}
      ></div>
    </>
  );
}
