import { useSelector } from "react-redux";
import { Fragment } from "react";
import KeyFrame from "./KeyFrame";

export default function KeyFrames() {
  const keyFrames = useSelector((state) => state.custom.keyFrames);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  console.log("render");

  return (
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
  );
}
