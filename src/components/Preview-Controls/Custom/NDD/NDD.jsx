import AnimationFunction from "./AnimationFunction.jsx";
import KeyFrames from "./KeyFrames/KeyFrames";
import HandleAnimation from "./HandleAnimation.jsx";
import Reset from "./Reset.jsx";
import Duration from "./Duration.jsx";

export default function NDD() {
  return (
    <>
      <KeyFrames />
      <AnimationFunction />
      <Reset />
      <HandleAnimation />
      <Duration />
    </>
  );
}
