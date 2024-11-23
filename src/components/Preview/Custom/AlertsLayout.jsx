import AlertsDD from "./AlertsDD";
import { useSelector } from "react-redux";
import Alerts from "./Alerts";

export default function AlertsLayout() {
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  return isDragDrop ? <AlertsDD /> : <Alerts />;
}
