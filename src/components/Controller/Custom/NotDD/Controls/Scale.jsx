import { useSelector, useDispatch } from "react-redux";
import { customActions } from "../../../../../store/customSlicer";
import { handleValueScaleInputs } from "../../../../../utils/helper";

export default function Scale() {
  const dispatch = useDispatch();
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const scaleX = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].scaleX
  );
  const scaleY = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].scaleY
  );
  function handleScaleChange(e, type) {
    let { value: val } = e.target;
    const value = handleValueScaleInputs(val, 5);
    if (isNaN(value) || value.length > 4) return;

    dispatch(customActions.handleScale({ type, value }));
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <p className="text-white">Scale</p>

      <div className="flex items-center font-bold text-white">
        X:
        <input
          value={scaleX}
          className="w-16 p-1 bg-zinc-900"
          onChange={(e) => {
            handleScaleChange(e, "x");
          }}
        />
        Y:
        <input
          value={scaleY}
          className="w-16 p-1 bg-zinc-900"
          onChange={(e) => {
            handleScaleChange(e, "y");
          }}
        />
      </div>
    </div>
  );
}
