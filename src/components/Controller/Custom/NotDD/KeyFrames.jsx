import { useSelector } from "react-redux";
import { Fragment } from "react";
import KeyFrame from "./KeyFrame";
import KeyFramePlus from "./KeyFramePlus";

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
            {index === 0 && <KeyFramePlus />}
          </Fragment>
        );
      })}
    </section>
  );
}
