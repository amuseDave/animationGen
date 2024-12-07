import { useSelector, useDispatch } from "react-redux";

import { customActions } from "../../../../store/customSlicer";

export default function AnimationFunction() {
  const dispatch = useDispatch();

  const animationFunction = useSelector(
    (state) => state.custom.animationFunction
  );

  function handleAnimationFunction(e) {
    dispatch(
      customActions.handleAnimationState({
        action: "animation",
        value: e.target.value,
      })
    );
  }

  return (
    <div className="flex items-center gap-1">
      <select
        className="w-[110px] preview-controller-box-item"
        value={animationFunction}
        onChange={handleAnimationFunction}
      >
        <option value="ease">Ease</option>
        <option value="ease-in">Ease In</option>
        <option value="ease-out">Ease Out</option>
        <option value="ease-in-out">Ease In Out</option>
        <option value="linear">Linear</option>
      </select>
    </div>
  );
}
