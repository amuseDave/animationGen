import { useSelector } from "react-redux";
import { Fragment } from "react";

import KeyFrame from "./Static/KeyFrame";

export default function CustomController() {
  const keyFrames = useSelector((state) => state.custom.keyFrames);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  const isAnimationCreated = useSelector(
    (state) => state.custom.isAnimationCreated
  );

  return (
    <>
      {/*Key frames */}
      <section className="flex flex-col items-start mt-10">
        {keyFrames.map((frame, index) => {
          // if (index === keyFrames.length - 1 || index === 0) return "";
          return (
            <Fragment key={index}>
              {index === keyFrames.length - 1 && keyFrames.length > 2 && (
                <button className="mt-1 text-4xl font-bold text-green-500">
                  +
                </button>
              )}

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
    </>
  );
}
