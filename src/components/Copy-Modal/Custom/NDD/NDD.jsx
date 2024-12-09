import { useSelector } from "react-redux";

export default function NDD() {
  const { duration, keyFrames, animationFunction } = useSelector(
    (state) => state.custom
  );
  const animationName = useSelector(
    (state) =>
      state.animations.custom.animationNames[state.animations.custom.curIndex]
  );

  return (
    <>
      <p>{".parent-container { "}</p>
      <p className="ml-3">{"overflow: hidden;"}</p>
      <p>{"}"}</p>

      <p>{".animation-container {"}</p>
      <p className="ml-3">{"width: 200px;"}</p>
      <p className="ml-3">{"height: 200px;"}</p>
      <p className="ml-3">{`animation: ${animationName.name.replaceAll(
        " ",
        "-"
      )} ${duration}s ${animationFunction} forwards;`}</p>
      <p>{"}"}</p>
    </>
  );
}
