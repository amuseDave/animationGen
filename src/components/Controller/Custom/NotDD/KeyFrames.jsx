import { useSelector } from "react-redux";
import { Fragment } from "react";
import KeyFrame from "./KeyFrame";

export default function KeyFrames() {
  const keyFramesPers = useSelector((state) => state.custom.keyFramePers);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  return (
    <section className="flex flex-col items-start mt-10">
      {keyFramesPers.map((frame, index) => {
        return (
          <Fragment key={index}>
            <KeyFrame
              index={index}
              key={index}
              active={index === activeKeyFrame}
              percentage={frame}
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
