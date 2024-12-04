import { useSelector } from "react-redux";
import AnimationRangeHandlerDD from "./AnimationRangeHandlerDD";
import DisabledInput from "./DisabledInput";
import PlayResetDDBtn from "./PlayResetDDBtn";

export default function PlaybackDD() {
  const isAnimationCreatedDD = useSelector(
    (state) => state.customDD.isAnimationCreatedDD
  );

  return (
    <>
      <div className="preview-dd-playback lc">
        {isAnimationCreatedDD ? <AnimationRangeHandlerDD /> : <DisabledInput />}
        <PlayResetDDBtn />
      </div>
    </>
  );
}
