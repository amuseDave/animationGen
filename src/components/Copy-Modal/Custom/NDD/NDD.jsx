import { useSelector } from "react-redux";
import { hexToRgba } from "../../../../utils/helper";

export default function NDD() {
  const { duration, keyFrames, animationFunction } = useSelector(
    (state) => state.custom
  );
  const animationName = useSelector(
    (state) =>
      state.animations.custom.animationNames[state.animations.custom.curIndex]
  );

  const aName = animationName.name.replaceAll(" ", "-");
  const length = 10 + keyFrames.length * 8;

  return (
    <>
      <div className="modal-nums">
        {Array.from({ length }, (_, idx) => (
          <p key={idx}>{idx}</p>
        ))}
      </div>

      <div className="modal-css">
        <p>{".parent-container { "}</p>
        <p className="ml-3">{"overflow: hidden;"}</p>
        <p>{"}"}</p>

        <p>{".animation-container {"}</p>
        <p className="ml-3">{"width: 200px;"}</p>
        <p className="ml-3">{"height: 200px;"}</p>
        <p className="ml-3">{`animation: ${aName} ${duration}s ${animationFunction} forwards;`}</p>
        <p>{"}"}</p>

        <p>{`@keyframes ${aName} { `}</p>
        {keyFrames.map((kf, idx) => (
          <div className="" key={idx}>
            <p className="ml-3">
              {kf.keyPercentage}% {"{"}
            </p>

            <p className="ml-6">{`opacity: ${kf.opacity / 100};`}</p>

            <p className="ml-6">{`color: ${hexToRgba(
              kf.textColor,
              kf.textOpacity
            )};`}</p>

            <p className="ml-6">{`background-color: ${hexToRgba(
              kf.backgroundColor,
              kf.bgOpacity
            )};`}</p>

            <p className="ml-6">{`transform: translate(${kf.translateX}%, ${kf.translateY}%) rotate(${kf.rotate}deg) scaleX(${kf.scaleX}) scaleY(${kf.scaleY});`}</p>

            <p className="ml-6">{`left: ${kf.left};`}</p>
            <p className="ml-6">{`top: ${kf.top};`}</p>

            <p className="ml-3">{"}"}</p>
          </div>
        ))}
        <p>{"}"}</p>
      </div>
    </>
  );
}
