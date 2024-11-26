import { useSelector } from "react-redux";
import { Fragment } from "react";
import KeyFrame from "./KeyFrame";
import KeyFramePlus from "./KeyFramePlus";

export default function KeyFrames() {
  const keyFramesPers = useSelector((state) => state.custom.keyFramePers);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  return (
    <div className="mt-10 select-none">
      <section className="grid grid-cols-3 gap-y-2 gap-x-2 justify-items-center auto-rows-auto">
        {keyFramesPers.map((frame, index) => {
          return (
            <Fragment key={index}>
              <KeyFrame
                index={index}
                key={index}
                active={index === activeKeyFrame}
                percentage={frame}
              />
            </Fragment>
          );
        })}
      </section>
      <KeyFramePlus />
    </div>
  );
}
