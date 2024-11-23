import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../Static/Loader";

export default function Preview() {
  const isResizing = useSelector((state) => state.ui.isResizing);
  const zoomLevel = useSelector((state) => state.ui.zoomLevel);

  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const keyFrames = useSelector((state) => state.custom.keyFrames);

  // sd
  const dashedBoxSize = {
    width: `${24 * zoomLevel}dvw`,
    height: `${18 * zoomLevel}dvw`,
  };
  const boxSize = {
    width: `${7 * zoomLevel}dvw`,
    height: `${7 * zoomLevel}dvw`,
  };

  const pos = keyFrames[activeKeyFrame].position;

  return (
    <>
      <section
        style={dashedBoxSize}
        className={`border-2 cursor-crosshair border-dashed border-zinc-600 absolute cc z-10 ${
          isResizing && "hidden"
        }`}
      >
        <div style={boxSize} className={`absolute bg-zinc-100 ${pos}`}></div>
      </section>
      {isResizing && <Loader />}
    </>
  );
}
