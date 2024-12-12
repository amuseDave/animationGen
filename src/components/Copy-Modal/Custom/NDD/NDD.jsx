import { useSelector } from "react-redux";
import { hexToRgba } from "../../../../utils/helper";
import { Fragment } from "react";

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

      <div className="w-full modal-css">
        <p className="text-blue-500">
          {".parent-container "}
          <span className="text-green-500">{"{"}</span>
          <br />
          <span className="ml-3 text-blue-400">{"overflow: hidden;"}</span>
          <br />
          <span className="text-green-500">{"}"}</span>
          <br />
          {".animation-container "}
          <span className="text-green-500">{"{"}</span>
          <br />

          <span className="ml-3 text-blue-400">{"width: 200px;"}</span>
          <br />
          <span className="ml-3 text-blue-400">{"height: 200px;"}</span>
          <br />
          <span className="ml-3 text-blue-400">{`animation: ${aName} ${duration}s ${animationFunction} forwards;`}</span>
          <br />
          <span className="text-green-500">{"}"}</span>
          <br />

          <span className="text-red-500">{"@keyframes "}</span>
          <span className="text-orange-400">{aName} </span>
          <span className="text-blue-500">{"{"}</span>
          <br />

          {keyFrames.map((kf, idx) => (
            <Fragment key={idx}>
              <span className="ml-3">{kf.keyPercentage}% </span>
              <span className="text-green-500">{"{"}</span>
              <br />

              <span className="ml-6 text-blue-400">{`opacity: ${
                kf.opacity / 100
              };`}</span>
              <br />

              <span className="ml-6 text-blue-400">{`color: ${hexToRgba(
                kf.textColor,
                kf.textOpacity
              )};`}</span>
              <br />

              <span className="ml-6 text-blue-400">{`background-color: ${hexToRgba(
                kf.backgroundColor,
                kf.bgOpacity
              )};`}</span>
              <br />

              <span className="ml-6 text-blue-400">{`transform: translate(${kf.translateX}%, ${kf.translateY}%) rotate(${kf.rotate}deg) scaleX(${kf.scaleX}) scaleY(${kf.scaleY});`}</span>
              <br />

              <span className="ml-6 text-blue-400">{`left: ${kf.left};`}</span>
              <br />
              <span className="ml-6 text-blue-400">{`top: ${kf.top};`}</span>
              <br />

              <span className="ml-3 text-green-500">{"}"}</span>
              <br />
            </Fragment>
          ))}
          <span className="text-blue-500">{"}"}</span>
        </p>
      </div>
    </>
  );
}
