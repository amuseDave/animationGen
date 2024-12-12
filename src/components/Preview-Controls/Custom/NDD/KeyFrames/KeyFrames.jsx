import { useSelector } from "react-redux";
import KeyFrame from "./KeyFrame";

export default function KeyFrames() {
  const keyFramesPers = useSelector((state) => state.custom.keyFramePers);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  return (
    <>
      <div className="w-full bg-[#080A0A] h-[50%] mt-[1px] z-[9999]">
        <div id="keyframes-parent" className="w-[full] mx-auto h-full relative">
          {keyFramesPers.map((_, index) => {
            return (
              <KeyFrame
                currentIndex={index}
                key={_}
                active={index === activeKeyFrame}
              />
            );
          })}
        </div>
      </div>
      <div className="h-full"></div>
    </>
  );
}
