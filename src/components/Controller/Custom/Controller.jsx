import Controls from "./NotDD/Controls";

import Canvas from "./NotDD/Canvas";
import KeyFrames from "./NotDD/KeyFrames/KeyFrames";
import Duration from "./NotDD/Controls/Duration";
import AnimationFunction from "./NotDD/Controls/AnimationFunction";
import Reset from "./NotDD/Controls/Reset";

export default function CustomController() {
  return (
    <>
      <KeyFrames />
      <Controls />
      <Canvas />
      <Duration />
      <AnimationFunction />
      <Reset />
    </>
  );
}
