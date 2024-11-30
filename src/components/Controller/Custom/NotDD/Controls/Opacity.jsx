import { useSelector } from "react-redux";

export default function Opacity({ handleOpacity }) {
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const opacity = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].opacity
  );

  return (
    <div className="flex items-center gap-2">
      <p className="text-white">Opacity:</p>{" "}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={opacity}
        onChange={handleOpacity}
      />
    </div>
  );
}
