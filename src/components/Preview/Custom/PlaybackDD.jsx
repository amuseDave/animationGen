import { useSelector } from "react-redux";
import AnimationRangeHandlerDD from "../../Controller/Custom/DD/AnimationRangeHandlerDD";
import DisabledInput from "../../Controller/Custom/DD/DisabledInput";
import PlayResetDDBtn from "../../Controller/Custom/DD/PlayResetDDBtn";

export default function PlaybackDD() {
  const isAnimationCreatedDD = useSelector(
    (state) => state.customDD.isAnimationCreatedDD
  );

  return (
    <>
      <div className="preview-dd-playback bc">
        {isAnimationCreatedDD ? <AnimationRangeHandlerDD /> : <DisabledInput />}
        <PlayResetDDBtn />
      </div>
    </>
  );
}
