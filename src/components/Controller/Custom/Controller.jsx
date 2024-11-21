import CustomStartPositionSelector from "./Static/PositionSelectorContainer";
import { useSelector, shallowEqual } from "react-redux";
import CustomDDBtn from "./Static/DDBtn";
import PlayResetDDBtn from "./PlayResetDDBtn";
import PlayResetBtn from "./PlayResetBtn";

export default function CustomController() {
  const { isDragDrop } = useSelector((state) => {
    return {
      isDragDrop: state.ui.isDragDrop,
    };
  }, shallowEqual);

  return (
    <>
      <h1 className="pb-2 text-2xl text-center border-b-2 border-b-pink-100">
        Custom Controller
      </h1>

      <CustomStartPositionSelector />
      <CustomDDBtn />

      {isDragDrop ? <PlayResetDDBtn /> : <PlayResetBtn />}
    </>
  );
}
