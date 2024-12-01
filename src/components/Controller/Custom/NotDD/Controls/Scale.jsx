import { useSelector } from "react-redux";

export default function Scale({ handleStyle }) {
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const scale = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].scale
  );

  return (
    <div className="flex items-center gap-2">
      <p className="text-white">Scale</p>
      <input
        onChange={(e) => {
          handleStyle(e, "set-scale");
        }}
        type="range"
        min={0}
        max={3}
        value={scale}
        step={0.05}
      />
    </div>
  );
}
