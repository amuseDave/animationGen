import "./alerts.css";
import AnimationResetCreateAlert from "../Utils/MainAnimationResetCreateAlert";
import PlayingAnimationAlert from "../Utils/MainPlayingAnimationAlert";

export default function Alerts() {
  return (
    <>
      <AnimationResetCreateAlert />
      <PlayingAnimationAlert />
    </>
  );
}
