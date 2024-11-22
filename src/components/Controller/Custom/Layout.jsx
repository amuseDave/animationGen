import CustomStartPositionSelector from "./Static/PositionSelectorContainer";
import CustomDDBtn from "./Static/DDBtn";
import { useSelector } from "react-redux";
import ControllerDD from "./ControllerDD";
import Controller from "./Controller";

export default function Layout() {
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  return (
    <>
      <CustomStartPositionSelector />

      {isDragDrop ? <ControllerDD /> : <Controller />}

      <CustomDDBtn />
    </>
  );
}
