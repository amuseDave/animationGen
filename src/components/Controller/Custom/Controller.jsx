import { useSelector, useDispatch } from "react-redux";
import { Fragment, useRef } from "react";

import KeyFrame from "./Static/KeyFrame";
import { customActions } from "../../../store/customSlicer";

export default function CustomController() {
  const dispatch = useDispatch();
  const colorTimer = useRef();
  const opacityTimer = useRef();
  const scaleTimer = useRef();

  const keyFrames = useSelector((state) => state.custom.keyFrames);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const curKF = keyFrames[activeKeyFrame];

  function handleColor(e) {
    if (colorTimer.current) clearTimeout(colorTimer.current);
    const { value } = e.target;
    colorTimer.current = setTimeout(() => {
      console.log(value);

      dispatch(customActions.handleStyles({ action: "set-color", value }));
    }, 100);
  }
  function handleOpacity(e) {
    if (opacityTimer.current) clearTimeout(opacityTimer.current);
    const { value } = e.target;
    opacityTimer.current = setTimeout(() => {
      dispatch(customActions.handleStyles({ action: "set-opacity", value }));
    }, 100);
  }
  function handleScale(e) {
    if (scaleTimer.current) clearTimeout(scaleTimer.current);
    const { value } = e.target;
    scaleTimer.current = setTimeout(() => {
      dispatch(customActions.handleStyles({ action: "set-scale", value }));
    }, 100);
  }

  return (
    <>
      {/*Handle current key frame*/}
      <section className="flex flex-col items-start mt-10">
        {keyFrames.map((frame, index) => {
          // if (index === keyFrames.length - 1 || index === 0) return "";
          return (
            <Fragment key={index}>
              <KeyFrame
                index={index}
                key={index}
                active={index === activeKeyFrame}
                percentage={frame.keyPercentage}
              />
              {index === 0 && (
                <button className="mt-1 text-4xl font-bold text-green-500">
                  +
                </button>
              )}
            </Fragment>
          );
        })}
      </section>

      {/* Style Values Container */}
      <div className="mt-10">
        {/* Color control */}
        <div className="flex items-center gap-2">
          <p className="text-white">Color:</p>{" "}
          <input onChange={handleColor} value={curKF.color} type="color" />
        </div>

        {/* Opacity control */}
        <div className="flex items-center gap-2">
          <p className="text-white">Opacity:</p>{" "}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={curKF.opacity}
            onChange={handleOpacity}
          />
        </div>

        {/* Scale control */}
        <div className="flex items-center gap-2">
          <p className="text-white">Scale</p>
          <input
            onChange={handleScale}
            type="range"
            min={0}
            max={3}
            value={curKF.scale}
            step={0.05}
          />
        </div>
      </div>
    </>
  );
}
