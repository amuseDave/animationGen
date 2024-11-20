import "./alerts.css";
import AnimationResetCreateAlert from "./Utils/AnimationResetCreateAlert";
import PlayingAnimationAlert from "./Utils/PlayingAnimationAlert";
import { useSelector, shallowEqual } from "react-redux";
import CustomAlerts from "../Alerts/CustomAlerts/CustomAlerts";

export default function Alerts() {
  const { type } = useSelector((state) => {
    return { type: state.ui.type };
  }, shallowEqual);
  return (
    <>
      <AnimationResetCreateAlert />
      <PlayingAnimationAlert />
      {type === "custom" && <CustomAlerts />}
    </>
  );
}
