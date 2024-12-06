import Savebtn from "./Static/Savebtn";
import DD from "./DD/DD";
import NDD from "./NDD/NDD";

import { useSelector } from "react-redux";
export default function Layout() {
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  return (
    <>
      {isDragDrop ? <DD /> : <NDD />}
      <Savebtn />
    </>
  );
}
