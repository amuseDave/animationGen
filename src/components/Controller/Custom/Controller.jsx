import CustomStartPositionSelector from "./Static/PositionSelectorContainer";
import { useSelector, shallowEqual } from "react-redux";
import CustomDDBtn from "./Static/DDBtn";
import PlayResetDDBtn from "./PlayResetDDBtn";
import PlayResetBtn from "./PlayResetBtn";
import AnimationRangeHandlerDD from "./AnimationRangeHandlerDD";
import AnimationRangeHandler from "./AnimationRangeHandler";
import DisabledInput from "./Static/DisabledInput";

export default function CustomController() {
  const { isDragDrop, isAnimationCreatedDD, isAnimationCreated } = useSelector(
    (state) => {
      return {
        isDragDrop: state.ui.isDragDrop,
        isAnimationCreatedDD: state.customDD.isAnimationCreatedDD,
        isAnimationCreated: state.custom.isAnimationCreated,
      };
    },
    shallowEqual
  );

  return (
    <>
      <h1 className="pb-2 text-2xl text-center border-b-2 border-b-pink-100">
        Custom Controller
      </h1>

      <CustomStartPositionSelector />
      <CustomDDBtn />

      {/* Animation Play/Pause/Move Controls */}
      <div className="mt-14">
        <div className="flex gap-2 px-3 py-1 border-2 rounded-md shadow-lg bg-pink-900/10 border-zinc-800">
          {isDragDrop && isAnimationCreatedDD && <AnimationRangeHandlerDD />}
          {!isDragDrop && isAnimationCreated && <AnimationRangeHandler />}

          {isDragDrop && !isAnimationCreatedDD && <DisabledInput />}
          {!isDragDrop && !isAnimationCreated && <DisabledInput />}

          {isDragDrop ? <PlayResetDDBtn /> : <PlayResetBtn />}
        </div>
      </div>
    </>
  );
}
