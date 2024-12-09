import { useSelector } from "react-redux";
import NDD from "./NDD";
import DD from "./DD";

export default function Layout() {
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);
  return isDragDrop ? <DD /> : <NDD />;
}
