import { useSelector, useDispatch } from "react-redux";

import { customActions } from "../../../../../store/customSlicer";

export default function Color() {
  const dispatch = useDispatch();
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const color = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].color
  );

  function handleColor(e) {
    const { value } = e.target;
    dispatch(customActions.handleStyles({ action: "set-color", value }));
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-white">Color:</p>{" "}
      <input onChange={handleColor} value={color} type="color" />
    </div>
  );
}
