import { useSelector } from "react-redux";
import { getPositionStyles } from "../../../store/handleCanvas";
import Loader from "../Static/Loader";

export default function Preview() {
  const isResizing = useSelector((state) => state.ui.isResizing);
  const zoomLevel = useSelector((state) => state.ui.zoomLevel);

  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const keyFrames = useSelector((state) => state.custom.keyFrames);

  const curKF = keyFrames[activeKeyFrame];

  const dashedBoxStyles = {
    width: `${24 * zoomLevel}dvw`,
    height: `${18 * zoomLevel}dvw`,
  };

  const size = (window.innerWidth / 100) * 7 * zoomLevel;
  const vanillaPosStyles = getPositionStyles(curKF.position, size);

  const boxStyles = {
    ...vanillaPosStyles,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: `${curKF.color}`,
    opacity: `${curKF.opacity}`,
    transform: `scale(${curKF.scale}) ${vanillaPosStyles.transform || ""}`,
    position: "absolute",
  };

  return (
    <div className="h-[700px]">
      <section
        style={dashedBoxStyles}
        className={`border-2 cursor-crosshair border-dashed border-zinc-600 absolute cc z-10 ${
          isResizing && "hidden"
        }`}
      >
        <div id="square" style={boxStyles} className={`rounded-xl`}></div>
      </section>
      {isResizing && <Loader />}
    </div>
  );
}
