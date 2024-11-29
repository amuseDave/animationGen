import { useSelector, useDispatch } from "react-redux";
import { animationActions } from "../../../store/animationsSlicer";
export default function AnimationName() {
  const dispatch = useDispatch();
  const animationName = useSelector(
    (state) =>
      state.animations.custom.animations[state.animations.custom.curIndex].name
  );

  function handleUpdateName(e) {
    const name = e.target.value.replaceAll("  ", "");

    // Handle alert if name is too short or too long
    if (name.length > 20) return;

    dispatch(
      animationActions.handleUpdateCustom({
        action: "set-name",
        value: name,
      })
    );
  }

  function handleSetDefaultName() {
    if (animationName === "")
      dispatch(
        animationActions.handleUpdateCustom({
          action: "set-name",
          value: "No Name",
        })
      );
  }

  return (
    <div className="absolute top-0 mt-5 ml-5 text-lg text-white left-2">
      <input
        onBlur={handleSetDefaultName}
        onChange={handleUpdateName}
        value={animationName}
        className="bg-transparent outline-none"
      />
    </div>
  );
}
