import { useSelector, useDispatch } from "react-redux";
import { animationActions } from "../../../store/animationsSlicer";
import { useEffect, useRef } from "react";
export default function AnimationName() {
  const dispatch = useDispatch();
  const timeoutId = useRef();
  const animationName = useSelector(
    (state) =>
      state.animations.custom.animations[state.animations.custom.curIndex].name
  );
  const animationNameDefault = useSelector(
    (state) => state.animations.custom.default.name
  );
  const isDefault = useSelector((state) => state.animations.custom.isDefault);

  function handleUpdateName(e) {
    const name = e.target.value.replaceAll("  ", "");

    // Handle alert if name is too short or too long
    if (name.length > 20) return;
    dispatch(animationActions.handleCustomUpdateName(name));
  }

  function handleSetDefaultName() {
    if (animationName === "" || animationNameDefault === "") {
      dispatch(animationActions.handleCustomUpdateName("No Name"));
    }
  }

  useEffect(() => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      dispatch(animationActions.handleClearAnimationAlert());
    }, 500);
  }, [animationName, animationNameDefault]);

  return (
    <div className="absolute top-0 mt-5 ml-5 text-lg text-white left-2">
      <input
        onBlur={handleSetDefaultName}
        onChange={handleUpdateName}
        value={isDefault ? animationNameDefault : animationName}
        className="bg-transparent outline-none"
      />
    </div>
  );
}
