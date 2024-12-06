import AnimationFunction from "./AnimationFunction.jsx";
import KeyFrames from "./KeyFrames/KeyFrames";
import HandleAnimation from "./HandleAnimation.jsx";
import Reset from "./Reset.jsx";
import Duration from "./Duration.jsx";

export default function NDD() {
  return (
    <div className="preview-controller-customNDD-container">
      <div className="flex justify-center">
        <AnimationFunction />

        <HandleAnimation />
        <Duration />
        <Reset />
      </div>

      <div className="flex">
        <KeyFrames />
      </div>
    </div>
  );
}
