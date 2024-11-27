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
      <div className="absolute flex w-[90%] gap-2 px-3 py-1 border-2 rounded-md shadow-lg bg-teal-400/10 border-zinc-800 bottom-16 bc z-20">
        {isAnimationCreatedDD ? <AnimationRangeHandlerDD /> : <DisabledInput />}
        <PlayResetDDBtn />
      </div>
    </>
  );
}
