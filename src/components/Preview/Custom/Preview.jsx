import { useSelector } from "react-redux";
import Loader from "../Static/Loader";
import { hexToRgba } from "../../../utils/helper";

export default function Preview() {
  const isAnimating = useSelector((state) => state.ui.isAnimating);
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
  const boxStyles = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${Math.floor(size) / 7}px`,
    backgroundColor: hexToRgba(curKF.backgroundColor, curKF.bgOpacity),
    color: hexToRgba(curKF.textColor, curKF.textOpacity),
    opacity: curKF.opacity,
    transform: `translate(${curKF.translateX}%, ${curKF.translateY}%) rotate(${curKF.rotate}deg) scaleX(${curKF.scaleX}) scaleY(${curKF.scaleY})`,
    left: curKF.left,
    bottom: curKF.bottom,
    top: curKF.top,
    right: curKF.right,
    position: "absolute",
  };

  // Check validity of animation, and set to isAnimating or alert

  // Create & Play Animation

  return (
    <>
      <section
        style={dashedBoxStyles}
        className={`preview-keyframe-dashed-box ${isResizing && "hidden"}`}
      >
        <div id="square" style={boxStyles} className={`preview-keyframe-box`}>
          Your content
        </div>
      </section>
      {isResizing && <Loader />}
    </>
  );
}
