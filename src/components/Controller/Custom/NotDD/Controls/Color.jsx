import { useSelector } from "react-redux";

export default function Color({ handleStyle }) {
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const color = useSelector(
    (state) => state.custom.keyFrames[activeKeyFrame].color
  );

  return (
    <div className="flex items-center gap-2">
      <p className="text-white">Color:</p>{" "}
      <input
        onChange={(e) => {
          handleStyle(e, "set-color");
        }}
        value={color}
        type="color"
      />
    </div>
  );
}
