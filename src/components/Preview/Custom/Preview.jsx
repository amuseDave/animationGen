import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../Static/Loader";

export default function Preview() {
  const isResizing = useSelector((state) => state.ui.isResizing);
  const zoomLevel = useSelector((state) => state.ui.zoomLevel);
  const position = useSelector((state) => state.custom.position);

  // sd
  const dashedBoxSize = {
    width: `${24 * zoomLevel}dvw`,
    height: `${18 * zoomLevel}dvw`,
  };
  const boxSize = {
    width: `${7 * zoomLevel}dvw`,
    height: `${7 * zoomLevel}dvw`,
  };

  return (
    <>
      <section
        style={dashedBoxSize}
        className={`border-2 cursor-crosshair border-dashed border-zinc-600 absolute cc z-10 ${
          isResizing && "hidden"
        }`}
      >
        <div
          style={boxSize}
          className={`absolute bg-zinc-100 ${position}`}
        ></div>
      </section>
      {isResizing && <Loader />}
    </>
  );
}
