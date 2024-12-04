import Controls from "./NotDD/Controls";

import Canvas from "./NotDD/Canvas";
import KeyFrames from "./NotDD/KeyFrames/KeyFrames";
import AnimationFunction from "./NotDD/Controls/AnimationFunction";
import Reset from "./NotDD/Controls/Reset";

export default function CustomController() {
  return (
    <>
      <Controls />
      <KeyFrames />
      <Canvas />

      <AnimationFunction />
      <Reset />
    </>
  );
}
