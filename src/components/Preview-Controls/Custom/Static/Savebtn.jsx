import { useDispatch, useSelector } from "react-redux";
import { animationActions } from "../../../../store/animationsSlicer";
import { Save } from "lucide-react";

export default function Savebtn() {
  const dispatch = useDispatch();
  const isShared = useSelector(
    (state) =>
      state.animations.custom.animations[state.animations.custom.curIndex]
        .isShared
  );

  function handleAddSharing() {
    dispatch(animationActions.handleAddSharing());
  }

  return (
    isShared && (
      <Save onClick={handleAddSharing} size={32} className="save-btn">
        Savebtn
      </Save>
    )
  );
}
