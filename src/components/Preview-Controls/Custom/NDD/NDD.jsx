import AnimationFunction from "./AnimationFunction.jsx";
import KeyFrames from "./KeyFrames/KeyFrames";
import HandleAnimation from "./HandleAnimation.jsx";
import Reset from "./Reset.jsx";
import Duration from "./Duration.jsx";
import nextSvg from "../../../../assets/svgs/next.svg";
import prevSvg from "../../../../assets/svgs/prev.svg";
import ChangeKeyFrame from "./ChangeKeyFrame.jsx";
import KeyFramePlus from "./KeyFrames/KeyFramePlus.jsx";
import KeyFrameTrash from "./KeyFrames/KeyFrameTrash.jsx";

export default function NDD() {
  return (
    <div className="preview-controller-customNDD-container">
      <div className="flex items-center">
        <AnimationFunction />
        <KeyFrameTrash />
        <KeyFramePlus />

        <div className="h-5 mx-[6px] bg-[#222928] rounded-md w-[3px]"></div>
        <ChangeKeyFrame svg={prevSvg} type="prev" className="mr-[1px]" />
        <HandleAnimation />
        <ChangeKeyFrame svg={nextSvg} type="next" className="ml-[1px]" />
        <div className="h-5 mx-[6px] bg-[#222928] rounded-md w-[3px]"></div>

        <Duration />

        <Reset />
      </div>

      <KeyFrames />
    </div>
  );
}
