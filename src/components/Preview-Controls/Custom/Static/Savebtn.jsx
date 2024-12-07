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
      <div className="absolute top-0 left-0 h-[46%] flex items-center ml-2">
        <div className="preview-controller-box-item text-[#eff89f]">
          <Save onClick={handleAddSharing} size={24} strokeWidth={1.4}>
            Savebtn
          </Save>
        </div>
      </div>
    )
  );
}
