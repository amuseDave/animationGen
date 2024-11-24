import { useSelector } from "react-redux";
import AnimationRangeHandlerDD from "./DD/AnimationRangeHandlerDD";
import DisabledInput from "./DD/DisabledInput";
import PlayResetDDBtn from "./DD/PlayResetDDBtn";

export default function ControllerDD() {
  const isAnimationCreatedDD = useSelector(
    (state) => state.customDD.isAnimationCreatedDD
  );

  return (
    <>
      <div className="absolute flex gap-2 px-3 py-1 border-2 rounded-md shadow-lg bg-pink-900/10 border-zinc-800 bottom-16 bc">
        {isAnimationCreatedDD ? <AnimationRangeHandlerDD /> : <DisabledInput />}
        <PlayResetDDBtn />
      </div>
    </>
  );
}
