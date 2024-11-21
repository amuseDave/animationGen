import "./alerts.css";
import ResetAlert from "./Static/ResetAlert";
import PlayingAnimationAlert from "./Static/PlayingAlert";
import { useSelector, shallowEqual } from "react-redux";
import CustomAlerts from "./Custom/Alerts";
import { AnimatePresence } from "framer-motion";

export default function Alerts() {
  const { type } = useSelector((state) => {
    return { type: state.ui.type };
  }, shallowEqual);
  return (
    <>
      <div className="absolute z-20 right-4 bottom-4">
        <AnimatePresence>
          {type === "custom" && <CustomAlerts key="custom" />}
          <ResetAlert key="reset-alert" />
        </AnimatePresence>
      </div>

      <PlayingAnimationAlert />
    </>
  );
}
