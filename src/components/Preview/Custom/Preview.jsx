import { useSelector } from "react-redux";
import Loader from "../Static/Loader";
import HandleAnimation from "../../Controller/Custom/NotDD/HandleAnimation";

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
  const boxStyles = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: `${curKF.color}`,
    opacity: `${curKF.opacity}`,
    transform: `translate(${curKF.translateX}%, ${curKF.translateY}%) scale(${curKF.scale})`,
    position: "absolute",
    left: `${curKF.left || "unset"}`,
    bottom: `${curKF.bottom || "unset"}`,
    top: `${curKF.top || "unset"}`,
    right: `${curKF.right || "unset"}`,
  };

  function handleAnimation() {
    const valid = keyFrames.every((keyframe) => {
      keyFrames.forEach((kf) => {
        console.log(kf, keyframe);

        return (
          keyframe.position === kf.position &&
          keyframe.color === kf.color &&
          keyframe.opacity === kf.opacity &&
          keyframe.scale === kf.scale &&
          keyframe.translateX === kf.translateX &&
          keyframe.translateY === kf.translateY &&
          keyframe.rotate === kf.rotate &&
          keyframe.left === kf.left &&
          keyframe.right === kf.right
        );
      });
    });
    console.log(valid);
  }

  return (
    <>
      <section
        style={dashedBoxStyles}
        className={`border-2 border-dashed border-zinc-600 absolute cc z-10 ${
          isResizing && "hidden"
        }`}
      >
        <div id="square" style={boxStyles} className={`rounded-xl`}></div>
      </section>
      {isResizing && <Loader />}
      <HandleAnimation handleAnimation={handleAnimation} />
    </>
  );
}
