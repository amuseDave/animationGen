import { useSelector, useDispatch } from "react-redux";
import { Fragment, useRef } from "react";

import KeyFrame from "./Static/KeyFrame";
import { customActions } from "../../../store/customSlicer";

export default function CustomController() {
  const dispatch = useDispatch();
  // const colorTimer = useRef();
  // const opacityTimer = useRef();
  // const scaleTimer = useRef();

  const keyFrames = useSelector((state) => state.custom.keyFrames);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  const curKF = keyFrames[activeKeyFrame];

  function handleColor(e) {
    const { value } = e.target;
    dispatch(customActions.handleStyles({ action: "set-color", value }));
    // colorTimer.current = setTimeout(() => {}, 100);
    // if (colorTimer.current) clearTimeout(colorTimer.current);
  }
  function handleOpacity(e) {
    const { value } = e.target;
    dispatch(customActions.handleStyles({ action: "set-opacity", value }));

    // if (opacityTimer.current) clearTimeout(opacityTimer.current);
    // opacityTimer.current = setTimeout(() => {}, 100);
  }
  function handleScale(e) {
    const { value } = e.target;
    dispatch(customActions.handleStyles({ action: "set-scale", value }));
    // if (scaleTimer.current) clearTimeout(scaleTimer.current);
    // scaleTimer.current = setTimeout(() => {

    // }, 100);
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
          <input
            onChange={handleColor}
            defaultValue={curKF.color}
            type="color"
          />
        </div>

        {/* Opacity control */}
        <div className="flex items-center gap-2">
          <p className="text-white">Opacity:</p>{" "}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={curKF.opacity}
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
            defaultValue={curKF.scale}
            step={0.05}
          />
        </div>
      </div>
    </>
  );
}
