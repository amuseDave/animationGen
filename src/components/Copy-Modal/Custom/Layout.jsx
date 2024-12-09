import { useSelector } from "react-redux";
import NDD from "./NDD/NDD";
import DD from "./DD/DD";

export default function Layout() {
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);
  return isDragDrop ? <DD /> : <NDD />;
}
