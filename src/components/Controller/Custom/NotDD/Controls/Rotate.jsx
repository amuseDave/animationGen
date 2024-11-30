import { useSelector } from "react-redux";

export default function Rotate({ handleRotate }) {
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const rotate = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].rotate
  );

  return (
    <div className="flex items-center gap-2">
      <p className="text-white">Rotate</p>
      <input
        onChange={handleRotate}
        type="range"
        min={0}
        max={720}
        value={rotate}
        step={1}
      />
    </div>
  );
}
